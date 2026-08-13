from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, ForeignKey, Enum as SQLEnum, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base


class MeetingStatus(str, enum.Enum):
    processing = "processing"
    completed = "completed"
    failed = "failed"


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    meetings = relationship("Meeting", back_populates="owner", cascade="all, delete-orphan")


class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False, index=True)          # index: search by title
    meeting_date = Column(DateTime(timezone=True), nullable=False, index=True)  # index: sort by recency
    duration_seconds = Column(Integer, nullable=False, default=0)
    audio_url = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    status = Column(SQLEnum(MeetingStatus), default=MeetingStatus.completed, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="meetings")
    participants = relationship("Participant", back_populates="meeting", cascade="all, delete-orphan")
    transcript_segments = relationship(
        "TranscriptSegment",
        back_populates="meeting",
        cascade="all, delete-orphan",
        order_by="TranscriptSegment.start_time",  # always return segments in chronological order
    )
    action_items = relationship("ActionItem", back_populates="meeting", cascade="all, delete-orphan")
    topic_links = relationship("MeetingTopic", back_populates="meeting", cascade="all, delete-orphan")


class Participant(Base):
    __tablename__ = "participants"
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)

    meeting = relationship("Meeting", back_populates="participants")


class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False, index=True)
    speaker_name = Column(String, nullable=False)
    start_time = Column(Float, nullable=False)   # seconds from start of recording
    end_time = Column(Float, nullable=False)     # seconds from start of recording
    text = Column(Text, nullable=False)

    meeting = relationship("Meeting", back_populates="transcript_segments")


class ActionItem(Base):
    __tablename__ = "action_items"
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False, index=True)
    description = Column(Text, nullable=False)
    is_completed = Column(Boolean, default=False, nullable=False)
    assignee = Column(String, nullable=True)

    meeting = relationship("Meeting", back_populates="action_items")


class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    meeting_links = relationship("MeetingTopic", back_populates="topic", cascade="all, delete-orphan")


class MeetingTopic(Base):
    """
    Many-to-many join table between Meeting and Topic.
    Composite primary key prevents duplicate tag assignments.
    """
    __tablename__ = "meeting_topics"
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), primary_key=True)
    topic_id = Column(Integer, ForeignKey("topics.id", ondelete="CASCADE"), primary_key=True)

    meeting = relationship("Meeting", back_populates="topic_links")
    topic = relationship("Topic", back_populates="meeting_links")