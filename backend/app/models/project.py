from sqlalchemy import Column, String, DateTime, Float, ForeignKey, Text, JSON, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    client_id = Column(String(36), ForeignKey("client_profiles.id"), nullable=False)
    title = Column(String(255), nullable=False)
    raw_brief = Column(Text, nullable=True)
    project_type = Column(String(100), default="retail_audit", nullable=False)  # retail_audit, mystery_shopping, ai_data, field_survey
    status = Column(String(50), default="active", nullable=False)  # draft, active, paused, completed
    payout_per_task = Column(Float, default=25.0, nullable=False)
    target_quota = Column(Integer, default=50)
    completed_quota = Column(Integer, default=0)
    instructions = Column(Text, nullable=True)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    client = relationship("ClientProfile", back_populates="projects")
    locations = relationship("Location", back_populates="project", cascade="all, delete-orphan")
    questionnaires = relationship("Questionnaire", back_populates="project", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="project", cascade="all, delete-orphan")


class Location(Base):
    __tablename__ = "locations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    store_name = Column(String(255), nullable=False)
    branch_code = Column(String(100), nullable=True)
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), default="United Arab Emirates")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geofence_radius_meters = Column(Float, default=150.0)
    status = Column(String(50), default="pending")  # pending, in_progress, completed
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="locations")
    assignments = relationship("Assignment", back_populates="location")


class Questionnaire(Base):
    __tablename__ = "questionnaires"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    title = Column(String(255), default="Audit Inspection Checklist", nullable=True)
    schema_json = Column(JSON, nullable=False)  # List of questions with types, options, validations
    generated_by_ai = Column(String(50), default="true")
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="questionnaires")
