"""
CRUD layer — pure database logic, no HTTP concerns.

Design principles applied here:
1. TRANSACTIONS: every write is wrapped in try/except with db.rollback() on failure.
   This guarantees the database never ends up in a partially-written state.
2. FLUSH vs COMMIT: db.flush() sends SQL to the DB engine within the current
   transaction so we get an auto-generated ID, but does NOT commit. A single
   db.commit() at the end makes the entire operation atomic.
3. PATCH SEMANTICS: update functions call model_dump(exclude_unset=True) so only
   fields the client explicitly sent are written — untouched fields keep their
   current values. This is correct PATCH behavior.
4. SEARCH: multi-column search using outerjoin on participants + OR filter, with
   .distinct() to collapse the multiplied rows from the join.
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import models
import schemas


# ── Read Operations ────────────────────────────────────────────────────────────

def get_meeting(db: Session, meeting_id: int) -> Optional[models.Meeting]:
    return db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()


def get_meetings(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
) -> List[models.Meeting]:
    """
    Return meetings sorted by recency (newest first).

    When `search` is provided, we outerjoin participants and apply an OR filter
    across three columns: title, summary, and participant name.
    The outerjoin (not inner join) preserves meetings that have zero participants.
    .distinct() collapses the M×N rows that the join produces for meetings with
    multiple participants matching the same search term.
    """
    query = db.query(models.Meeting)

    if search:
        term = f"%{search}%"
        query = (
            query
            .outerjoin(models.Participant, models.Participant.meeting_id == models.Meeting.id)
            .filter(
                or_(
                    models.Meeting.title.ilike(term),
                    models.Meeting.summary.ilike(term),
                    models.Participant.name.ilike(term),
                )
            )
            .distinct()
        )

    return (
        query
        .order_by(models.Meeting.meeting_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_action_item(db: Session, action_item_id: int) -> Optional[models.ActionItem]:
    return db.query(models.ActionItem).filter(models.ActionItem.id == action_item_id).first()


def get_participant(db: Session, participant_id: int) -> Optional[models.Participant]:
    return db.query(models.Participant).filter(models.Participant.id == participant_id).first()


# ── Meeting Write Operations ───────────────────────────────────────────────────

def create_meeting(db: Session, meeting: schemas.MeetingCreate, user_id: int = 1) -> models.Meeting:
    """
    Create a meeting with all nested resources in a single atomic transaction.

    Pattern:
    1. Add meeting and flush → DB generates the primary key we need for FKs.
    2. Add all related records using that PK.
    3. Single commit → everything lands atomically or nothing does.
    4. On any exception, rollback wipes the dirty session state before re-raising.
    """
    try:
        db_meeting = models.Meeting(
            user_id=user_id,
            title=meeting.title,
            meeting_date=meeting.meeting_date,
            duration_seconds=meeting.duration_seconds,
            audio_url=meeting.audio_url,
            summary=meeting.summary,
        )
        db.add(db_meeting)
        db.flush()  # INSERT meeting, get db_meeting.id — still inside the transaction

        for p in meeting.participants:
            db.add(models.Participant(meeting_id=db_meeting.id, name=p.name))

        for seg in meeting.transcript_segments:
            db.add(models.TranscriptSegment(
                meeting_id=db_meeting.id,
                speaker_name=seg.speaker_name,
                start_time=seg.start_time,
                end_time=seg.end_time,
                text=seg.text,
            ))

        for item in meeting.action_items:
            db.add(models.ActionItem(
                meeting_id=db_meeting.id,
                description=item.description,
                is_completed=item.is_completed,
                assignee=item.assignee,
            ))

        db.commit()
        db.refresh(db_meeting)
        return db_meeting
    except Exception:
        db.rollback()
        raise


def update_meeting(db: Session, meeting_id: int, updates: schemas.MeetingUpdate) -> Optional[models.Meeting]:
    """
    PATCH a meeting: only fields present in the request body are written.
    model_dump(exclude_unset=True) gives a dict of only the fields the client sent,
    so unspecified fields keep their current database values.
    """
    db_meeting = get_meeting(db, meeting_id)
    if not db_meeting:
        return None
    try:
        update_data = updates.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_meeting, field, value)
        db.commit()
        db.refresh(db_meeting)
        return db_meeting
    except Exception:
        db.rollback()
        raise


def delete_meeting(db: Session, meeting_id: int) -> bool:
    """
    Delete a meeting. Because PRAGMA foreign_keys=ON is active and all child
    tables have ON DELETE CASCADE, this single DELETE cascades to participants,
    transcript_segments, action_items, and meeting_topics automatically.
    Returns True if something was deleted, False if not found.
    """
    db_meeting = get_meeting(db, meeting_id)
    if not db_meeting:
        return False
    try:
        db.delete(db_meeting)
        db.commit()
        return True
    except Exception:
        db.rollback()
        raise


# ── Participant Write Operations ───────────────────────────────────────────────

def add_participant(db: Session, meeting_id: int, data: schemas.ParticipantCreate) -> models.Participant:
    try:
        db_p = models.Participant(meeting_id=meeting_id, name=data.name)
        db.add(db_p)
        db.commit()
        db.refresh(db_p)
        return db_p
    except Exception:
        db.rollback()
        raise


def remove_participant(db: Session, participant_id: int) -> bool:
    db_p = get_participant(db, participant_id)
    if not db_p:
        return False
    try:
        db.delete(db_p)
        db.commit()
        return True
    except Exception:
        db.rollback()
        raise


# ── Action Item Write Operations ───────────────────────────────────────────────

def create_action_item(db: Session, meeting_id: int, data: schemas.ActionItemCreate) -> models.ActionItem:
    try:
        db_item = models.ActionItem(
            meeting_id=meeting_id,
            description=data.description,
            is_completed=data.is_completed,
            assignee=data.assignee,
        )
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception:
        db.rollback()
        raise


def update_action_item(
    db: Session, action_item_id: int, updates: schemas.ActionItemUpdate
) -> Optional[models.ActionItem]:
    """PATCH an action item — same exclude_unset pattern as update_meeting."""
    db_item = get_action_item(db, action_item_id)
    if not db_item:
        return None
    try:
        update_data = updates.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_item, field, value)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception:
        db.rollback()
        raise


def delete_action_item(db: Session, action_item_id: int) -> bool:
    db_item = get_action_item(db, action_item_id)
    if not db_item:
        return False
    try:
        db.delete(db_item)
        db.commit()
        return True
    except Exception:
        db.rollback()
        raise