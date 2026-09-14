from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.core.database import get_db
from app.models.assignment import Assignment, Submission, MediaProof
from app.models.ai_analysis import AIAnalysis, Payment
from app.models.user import ShopperProfile, User
from app.schemas.submission import SubmissionResponse, QCActionRequest

router = APIRouter(prefix="/admin-qc", tags=["Admin & QC Command Center"])

@router.get("/queue")
def get_qc_queue(
    status_filter: Optional[str] = Query(None, description="Filter by status: escalated, auto_approved, rejected"),
    db: Session = Depends(get_db)
):
    """
    Returns submissions queue with AI Vision quality score, fraud status, 
    and store/shopper context for human QC review.
    """
    query = db.query(Submission).join(AIAnalysis)
    if status_filter:
        query = query.filter(AIAnalysis.status == status_filter)
    
    submissions = query.order_by(Submission.submitted_at.desc()).all()
    results = []

    for sub in submissions:
        assignment = sub.assignment
        project = assignment.project if assignment else None
        location = assignment.location if assignment else None
        shopper = assignment.shopper if assignment else None
        shopper_user = shopper.user if shopper else None
        analysis = sub.ai_analysis

        results.append({
            "submission_id": sub.id,
            "assignment_id": sub.assignment_id,
            "project_title": project.title if project else "Retail Audit Sprint",
            "project_type": project.project_type if project else "retail_audit",
            "store_name": location.store_name if location else "Store Location",
            "city": location.city if location else "New York",
            "country": location.country if location else "United States",
            "shopper_name": shopper_user.full_name if shopper_user else "Verified Shopper",
            "shopper_trust_score": shopper.trust_score if shopper else 95.0,
            "submitted_at": sub.submitted_at,
            "geo_distance_meters": sub.geo_distance_meters,
            "overall_quality_score": analysis.overall_quality_score if analysis else 88.0,
            "status": analysis.status if analysis else "auto_approved",
            "fraud_flags": analysis.fraud_flags if analysis else {},
            "vision_scores": analysis.vision_scores if analysis else {},
            "text_sentiment_score": analysis.text_sentiment_score if analysis else 0.0,
            "media_proofs": [
                {"media_type": m.media_type, "storage_url": m.storage_url, "is_verified": m.is_verified}
                for m in sub.media_proofs
            ],
            "answers_data": sub.answers_data
        })

    return results

@router.post("/submissions/{submission_id}/action")
def perform_qc_action(
    submission_id: str,
    action_in: QCActionRequest,
    db: Session = Depends(get_db)
):
    """
    Human QC Reviewer Action:
    - Approve / Reject / Request Re-audit
    - Manual quality score override
    - Triggers escrow payment release or refund
    """
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")

    analysis = sub.ai_analysis
    assignment = sub.assignment

    if action_in.action == "approve":
        if analysis:
            analysis.status = "qc_approved"
            if action_in.override_score is not None:
                analysis.overall_quality_score = action_in.override_score
        if assignment:
            assignment.status = "approved"
            # Release escrow payment
            payment = db.query(Payment).filter(Payment.assignment_id == assignment.id).first()
            if payment and payment.status == "escrowed":
                payment.status = "released"
                if assignment.shopper:
                    assignment.shopper.balance_earned += payment.amount

    elif action_in.action == "reject":
        if analysis:
            analysis.status = "qc_rejected"
        if assignment:
            assignment.status = "rejected"
            # Penalize trust score slightly
            if assignment.shopper:
                assignment.shopper.trust_score = max(0.0, assignment.shopper.trust_score - 5.0)

    db.commit()
    return {
        "status": "success",
        "action_taken": action_in.action,
        "submission_id": submission_id,
        "new_status": analysis.status if analysis else action_in.action
    }

@router.get("/payouts")
def list_escrow_payouts(db: Session = Depends(get_db)):
    """List all escrow and released payments for administrative audit."""
    payments = db.query(Payment).order_by(Payment.created_at.desc()).all()
    results = []
    for p in payments:
        user = p.user
        results.append({
            "payment_id": p.id,
            "transaction_ref": p.transaction_ref,
            "user_name": user.full_name if user else "Shopper",
            "email": user.email if user else "shopper@pulseai.io",
            "amount": p.amount,
            "currency": p.currency,
            "status": p.status,
            "created_at": p.created_at
        })
    return results

@router.post("/payouts/{payment_id}/release")
def release_escrow_payout(payment_id: str, db: Session = Depends(get_db)):
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = "released"
    db.commit()
    return {"status": "released", "payment_id": payment_id, "amount": payment.amount}
