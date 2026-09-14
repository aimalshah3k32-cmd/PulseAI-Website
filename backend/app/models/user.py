from sqlalchemy import Column, String, Boolean, DateTime, Float, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    role = Column(String(50), default="shopper", nullable=False)  # super_admin, client, shopper, qc_admin
    avatar_url = Column(String(500), nullable=True)
    is_verified = Column(Boolean, default=True)
    status = Column(String(50), default="active")  # active, suspended, pending_review
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    client_profile = relationship("ClientProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    shopper_profile = relationship("ShopperProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="user")


class ClientProfile(Base):
    __tablename__ = "client_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), unique=True, nullable=False)
    company_name = Column(String(255), nullable=False)
    industry = Column(String(100), default="Retail & Consumer", nullable=True)
    service_needed = Column(String(255), default="Mystery Shopping & CX Evaluation", nullable=True)
    store_count = Column(String(50), default="10-50 stores", nullable=True)
    city = Column(String(100), nullable=True)
    country = Column(String(100), default="Global", nullable=True)
    designation = Column(String(100), nullable=True)
    website_url = Column(String(255), nullable=True)
    billing_address = Column(Text, nullable=True)
    tax_id = Column(String(100), nullable=True)
    total_spent = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="client_profile")
    projects = relationship("Project", back_populates="client", cascade="all, delete-orphan")


class ShopperProfile(Base):
    __tablename__ = "shopper_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), unique=True, nullable=False)
    city = Column(String(100), default="Dubai, UAE", nullable=True)
    country = Column(String(100), default="United Arab Emirates", nullable=True)
    gender = Column(String(50), default="Unspecified", nullable=True)
    dob = Column(String(50), nullable=True)
    payout_method = Column(String(100), default="Direct Bank Transfer / IBAN", nullable=True)
    payout_account_details = Column(String(255), nullable=True)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)
    trust_score = Column(Float, default=95.0)  # 0 to 100
    is_available = Column(Boolean, default=True)
    kyc_status = Column(String(50), default="verified")  # pending, verified, rejected
    kyc_id_type = Column(String(100), default="National ID", nullable=True)
    completed_audits_count = Column(Integer, default=0)
    balance_earned = Column(Float, default=0.0)
    balance_pending = Column(Float, default=0.0)
    balance_withdrawn = Column(Float, default=0.0)
    transport_mode = Column(String(50), default="Car", nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="shopper_profile")
    assignments = relationship("Assignment", back_populates="shopper")

