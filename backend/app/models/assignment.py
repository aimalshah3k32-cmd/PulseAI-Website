from sqlalchemy import Column, String, DateTime, Float, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    location_id = Column(String(36), ForeignKey("locations.id"), nullable=False)
    shopper_id = Column(String(36), ForeignKey("shopper_profiles.id"), nullable=True)
    status = Column(String(50), default="available", nullable=False)  # available, assigned, submitted, approved, rejected, escalated
    payout_amount = Column(Float, default=25.0)
    expires_at = Column(DateTime, nullable=True)
    assigned_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="assignments")
    location = relationship("Location", back_populates="assignments")
    shopper = relationship("ShopperProfile", back_populates="assignments")
    submission = relationship("Submission", back_populates="assignment", uselist=False, cascade="all, delete-orphan")
    payment = relationship("Payment", back_populates="assignment", uselist=False)


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    assignment_id = Column(String(36), ForeignKey("assignments.id"), unique=True, nullable=False)
    answers_data = Column(JSON, nullable=False)  # Map of question ID to response
    submission_lat = Column(Float, nullable=False)
    submission_lng = Column(Float, nullable=False)
    geo_distance_meters = Column(Float, default=0.0)
    is_geofence_valid = Column(Boolean, default=True)
    submitted_at = Column(DateTime, default=datetime.utcnow)

    assignment = relationship("Assignment", back_populates="submission")
    media_proofs = relationship("MediaProof", back_populates="submission", cascade="all, delete-orphan")
    ai_analysis = relationship("AIAnalysis", back_populates="submission", uselist=False, cascade="all, delete-orphan")


class MediaProof(Base):
    __tablename__ = "media_proofs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    submission_id = Column(String(36), ForeignKey("submissions.id"), nullable=False)
    media_type = Column(String(50), nullable=False)  # shelf_image, receipt_image, audio_recording, video_clip
    storage_url = Column(String(500), nullable=False)
    file_hash = Column(String(64), nullable=True)  # SHA256 / MD5 for duplicate fraud check
    exif_timestamp = Column(DateTime, nullable=True)
    exif_gps_lat = Column(Float, nullable=True)
    exif_gps_lng = Column(Float, nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    submission = relationship("Submission", back_populates="media_proofs")

