from sqlalchemy import Column, String, DateTime, Float, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base

class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    submission_id = Column(String(36), ForeignKey("submissions.id"), unique=True, nullable=False)
    vision_scores = Column(JSON, nullable=False)  # Planogram compliance, shelf emptiness, brand detection, bounding boxes
    text_sentiment_score = Column(Float, default=0.0)  # -1.0 to 1.0
    transcription_text = Column(Text, nullable=True)  # Speech-to-text transcript
    fraud_flags = Column(JSON, nullable=False)  # duplicate_image, gps_spoofed, exif_mismatch
    overall_quality_score = Column(Float, default=90.0)  # 0.0 to 100.0
    status = Column(String(50), default="auto_approved")  # auto_approved, escalated, qc_rejected, qc_approved
    ai_feedback_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    submission = relationship("Submission", back_populates="ai_analysis")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    assignment_id = Column(String(36), ForeignKey("assignments.id"), unique=True, nullable=True)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="USD")
    payment_type = Column(String(50), default="shopper_payout")  # shopper_payout, client_deposit, refund
    status = Column(String(50), default="escrowed")  # escrowed, released, completed, refunded
    payout_method = Column(String(50), default="bank_wire")  # bank_wire, paypal, stripe, crypto_usdt
    transaction_ref = Column(String(100), default=lambda: f"TXN-{uuid.uuid4().hex[:12].upper()}")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="payments")
    assignment = relationship("Assignment", back_populates="payment")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type = Column(String(100), nullable=False)  # user_register, submission_qc, geofence_breach, fraud_flag
    user_id = Column(String(36), nullable=True)
    severity = Column(String(50), default="info")  # info, warning, high, critical
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

