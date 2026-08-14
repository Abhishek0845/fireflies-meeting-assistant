"""
FastAPI application — clean REST API layer.

Design decisions:
- Routes are grouped by resource with consistent naming.
- POST returns 201 Created; DELETE returns 204 No Content (no body).
- All mutations accept JSON request bodies — never query params for data.
  Query params are reserved for filtering/pagination on GET routes.
- Nested routes (/meetings/{id}/action_items) make ownership explicit and
  allow the handler to verify the parent meeting exists in one place.
- Legacy routes (marked deprecated=True) are kept so old clients don't break
  while the frontend migrates to the new endpoints.
- A startup event ensures the default user (id=1) always exists so
  create_meeting never fails with a FK violation on a fresh database.
- A global exception handler catches any unhandled 500 and returns a clean
  JSON response instead of exposing a Python traceback.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List

from database import engine, Base, get_db, SessionLocal
import models
import schemas
import crud

logger = logging.getLogger("fireflies")

# ── App startup / shutdown ─────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Create all tables on startup (idempotent — safe to call every time).
    Ensure the default user (id=1) exists so create_meeting never hits a
    FK violation on a brand-new or wiped database.
    """
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(models.User).filter(models.User.id == 1).first():
            db.add(models.User(name="Abhishek Singh", email="abhirathore845@gmail.com"))
            db.commit()
            logger.info("Default user created.")
    finally:
        db.close()
    yield  # application runs here


app = FastAPI(
    title="Fireflies Clone API",
    description="Meeting notes & transcription platform — clean REST backend.",
    version="2.0.0",
    lifespan=lifespan,
)

# ── CORS ───────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000","https://fireflies-meeting-assistant-ebrb.onrender.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Global error handler ───────────────────────────────────────────────────────
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on %s %s", request.method, request.url)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )


# ══════════════════════════════════════════════════════════════════════════════
# HEALTH
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Fireflies Clone API v2"}


# ══════════════════════════════════════════════════════════════════════════════
# MEETINGS
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/meetings/", response_model=List[schemas.MeetingResponse], tags=["Meetings"])
def list_meetings(
    search: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    List all meetings sorted by date (newest first).
    `search` is matched against meeting title, summary, and participant names.
    """
    return crud.get_meetings(db, skip=skip, limit=limit, search=search)


@app.post(
    "/meetings/",
    response_model=schemas.MeetingResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Meetings"],
)
def create_meeting(meeting: schemas.MeetingCreate, db: Session = Depends(get_db)):
    """
    Create a meeting with all nested data (participants, transcript segments,
    action items) in a single atomic transaction.
    """
    try:
        return crud.create_meeting(db, meeting)
    except Exception as exc:
        logger.exception("create_meeting failed")
        raise HTTPException(status_code=500, detail=f"Could not create meeting: {exc}") from exc


@app.get("/meetings/{meeting_id}", response_model=schemas.MeetingResponse, tags=["Meetings"])
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = crud.get_meeting(db, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    return meeting


@app.patch("/meetings/{meeting_id}", response_model=schemas.MeetingResponse, tags=["Meetings"])
def update_meeting(meeting_id: int, updates: schemas.MeetingUpdate, db: Session = Depends(get_db)):
    """
    Partially update a meeting (PATCH semantics).
    Only fields included in the request body are changed; omitted fields
    retain their current values.
    """
    try:
        meeting = crud.update_meeting(db, meeting_id, updates)
    except Exception as exc:
        logger.exception("update_meeting failed")
        raise HTTPException(status_code=500, detail=f"Could not update meeting: {exc}") from exc

    if not meeting:
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    return meeting


@app.delete(
    "/meetings/{meeting_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Meetings"],
)
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    """
    Delete a meeting and all its children (cascade: participants, segments,
    action items). Returns 204 No Content on success.
    """
    try:
        deleted = crud.delete_meeting(db, meeting_id)
    except Exception as exc:
        logger.exception("delete_meeting failed")
        raise HTTPException(status_code=500, detail=f"Could not delete meeting: {exc}") from exc

    if not deleted:
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")


# ══════════════════════════════════════════════════════════════════════════════
# PARTICIPANTS  (nested under /meetings/{id})
# ══════════════════════════════════════════════════════════════════════════════

@app.post(
    "/meetings/{meeting_id}/participants",
    response_model=schemas.ParticipantResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Participants"],
)
def add_participant(
    meeting_id: int,
    participant: schemas.ParticipantCreate,
    db: Session = Depends(get_db),
):
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    return crud.add_participant(db, meeting_id, participant)


@app.delete(
    "/meetings/{meeting_id}/participants/{participant_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Participants"],
)
def remove_participant(meeting_id: int, participant_id: int, db: Session = Depends(get_db)):
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    if not crud.remove_participant(db, participant_id):
        raise HTTPException(status_code=404, detail=f"Participant {participant_id} not found.")


# ══════════════════════════════════════════════════════════════════════════════
# ACTION ITEMS  (nested under /meetings/{id})
# ══════════════════════════════════════════════════════════════════════════════

@app.post(
    "/meetings/{meeting_id}/action_items",
    response_model=schemas.ActionItemResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Action Items"],
)
def create_action_item(
    meeting_id: int,
    item: schemas.ActionItemCreate,
    db: Session = Depends(get_db),
):
    """Add an action item. Verifies the parent meeting exists first."""
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    try:
        return crud.create_action_item(db, meeting_id, item)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Could not create action item: {exc}") from exc


@app.patch(
    "/meetings/{meeting_id}/action_items/{action_item_id}",
    response_model=schemas.ActionItemResponse,
    tags=["Action Items"],
)
def update_action_item(
    meeting_id: int,
    action_item_id: int,
    updates: schemas.ActionItemUpdate,
    db: Session = Depends(get_db),
):
    """
    Toggle completion, update description, or change assignee.
    All fields are optional — send only what you want to change.
    """
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    item = crud.update_action_item(db, action_item_id, updates)
    if not item:
        raise HTTPException(status_code=404, detail=f"Action item {action_item_id} not found.")
    return item


@app.delete(
    "/meetings/{meeting_id}/action_items/{action_item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Action Items"],
)
def delete_action_item(meeting_id: int, action_item_id: int, db: Session = Depends(get_db)):
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    if not crud.delete_action_item(db, action_item_id):
        raise HTTPException(status_code=404, detail=f"Action item {action_item_id} not found.")


# ══════════════════════════════════════════════════════════════════════════════
# LEGACY ROUTES  (deprecated — kept for backward compatibility)
# The frontend has been updated to use the new routes above, but these ensure
# any old client calls don't hard-break during the transition.
# ══════════════════════════════════════════════════════════════════════════════

@app.put(
    "/meetings/{meeting_id}/title",
    response_model=schemas.MeetingResponse,
    tags=["Legacy"],
    deprecated=True,
)
def edit_meeting_title_legacy(meeting_id: int, title: str, db: Session = Depends(get_db)):
    """Deprecated: use PATCH /meetings/{id} with a JSON body instead."""
    meeting = crud.update_meeting(db, meeting_id, schemas.MeetingUpdate(title=title))
    if not meeting:
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    return meeting


@app.put(
    "/action_items/{action_item_id}",
    response_model=schemas.ActionItemResponse,
    tags=["Legacy"],
    deprecated=True,
)
def toggle_action_item_legacy(action_item_id: int, is_completed: bool, db: Session = Depends(get_db)):
    """Deprecated: use PATCH /meetings/{meeting_id}/action_items/{id} instead."""
    item = crud.update_action_item(db, action_item_id, schemas.ActionItemUpdate(is_completed=is_completed))
    if not item:
        raise HTTPException(status_code=404, detail=f"Action item {action_item_id} not found.")
    return item


@app.post(
    "/action_items/",
    response_model=schemas.ActionItemResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Legacy"],
    deprecated=True,
)
def create_action_item_legacy(meeting_id: int, description: str, db: Session = Depends(get_db)):
    """Deprecated: use POST /meetings/{meeting_id}/action_items instead."""
    if not crud.get_meeting(db, meeting_id):
        raise HTTPException(status_code=404, detail=f"Meeting {meeting_id} not found.")
    return crud.create_action_item(db, meeting_id, schemas.ActionItemCreate(description=description))