"""
Pydantic v2 schemas for request validation and response serialization.

Design decisions:
- Separate Base / Create / Update / Response schemas for every resource.
- Field constraints (min_length, max_length, ge) catch bad data at the API boundary
  before it ever touches the database.
- MeetingUpdate and ActionItemUpdate use all-Optional fields — the PATCH handler
  calls model_dump(exclude_unset=True) so only fields the client explicitly sent
  are written to the DB.
- model_validator on TranscriptSegmentBase enforces the business rule that
  end_time must be strictly greater than start_time.
- ConfigDict(from_attributes=True) replaces the Pydantic v1 Config inner class.
"""

from pydantic import BaseModel, Field, model_validator, ConfigDict
from datetime import datetime
from typing import List, Optional


# ── Transcript Segments ────────────────────────────────────────────────────────

class TranscriptSegmentBase(BaseModel):
    speaker_name: str = Field(..., min_length=1, max_length=100, strip_whitespace=True)
    start_time: float = Field(..., ge=0, description="Offset from start of recording in seconds")
    end_time: float = Field(..., gt=0, description="Offset from start of recording in seconds")
    text: str = Field(..., min_length=1, max_length=5000, strip_whitespace=True)

    @model_validator(mode="after")
    def end_must_be_after_start(self) -> "TranscriptSegmentBase":
        if self.end_time <= self.start_time:
            raise ValueError(
                f"end_time ({self.end_time}s) must be greater than start_time ({self.start_time}s)"
            )
        return self


class TranscriptSegmentCreate(TranscriptSegmentBase):
    pass


class TranscriptSegmentResponse(TranscriptSegmentBase):
    id: int
    meeting_id: int
    model_config = ConfigDict(from_attributes=True)


# ── Action Items ───────────────────────────────────────────────────────────────

class ActionItemCreate(BaseModel):
    description: str = Field(..., min_length=1, max_length=1000, strip_whitespace=True)
    is_completed: bool = False
    assignee: Optional[str] = Field(None, max_length=100, strip_whitespace=True)


class ActionItemUpdate(BaseModel):
    """
    All fields are Optional — this is the PATCH schema.
    model_dump(exclude_unset=True) in the CRUD layer means only fields the client
    actually sent will be written, leaving the rest untouched.
    """
    description: Optional[str] = Field(None, min_length=1, max_length=1000, strip_whitespace=True)
    is_completed: Optional[bool] = None
    assignee: Optional[str] = Field(None, max_length=100, strip_whitespace=True)


class ActionItemResponse(BaseModel):
    id: int
    meeting_id: int
    description: str
    is_completed: bool
    assignee: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


# ── Participants ───────────────────────────────────────────────────────────────

class ParticipantCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, strip_whitespace=True)


class ParticipantResponse(BaseModel):
    id: int
    meeting_id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


# ── Meetings ───────────────────────────────────────────────────────────────────

class MeetingCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, strip_whitespace=True)
    meeting_date: datetime
    duration_seconds: int = Field(..., ge=0, description="Total duration in seconds")
    audio_url: Optional[str] = Field(None, max_length=500)
    summary: Optional[str] = Field(None, max_length=10000)
    # Nested creation: create all related records in one API call
    participants: List[ParticipantCreate] = Field(default_factory=list)
    transcript_segments: List[TranscriptSegmentCreate] = Field(default_factory=list)
    action_items: List[ActionItemCreate] = Field(default_factory=list)


class MeetingUpdate(BaseModel):
    """
    PATCH schema — all fields Optional.
    Only fields present in the request body will be updated.
    """
    title: Optional[str] = Field(None, min_length=1, max_length=200, strip_whitespace=True)
    meeting_date: Optional[datetime] = None
    duration_seconds: Optional[int] = Field(None, ge=0)
    summary: Optional[str] = Field(None, max_length=10000)
    audio_url: Optional[str] = Field(None, max_length=500)


class MeetingResponse(BaseModel):
    id: int
    title: str
    meeting_date: datetime
    duration_seconds: int
    audio_url: Optional[str] = None
    summary: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    participants: List[ParticipantResponse] = []
    transcript_segments: List[TranscriptSegmentResponse] = []
    action_items: List[ActionItemResponse] = []
    model_config = ConfigDict(from_attributes=True)


# ── Generic Responses ──────────────────────────────────────────────────────────

class MessageResponse(BaseModel):
    """Standard envelope for operations that don't return a resource."""
    message: str