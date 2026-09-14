from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class MediaProofCreate(BaseModel):
    media_type: str  # image, audio, video, receipt
    storage_url: str
    file_hash: Optional[str] = None
    exif_timestamp: Optional[datetime] = None

class MediaProofResponse(BaseModel):
    id: str
    media_type: str
    storage_url: str
    is_verified: bool
    exif_timestamp: Optional[datetime] = None

    class Config:
        from_attributes = True

class SubmissionCreate(BaseModel):
    assignment_id: str
    answers_data: Dict[str, Any]
    submission_lat: float
    submission_lng: float
    media_proofs: List[MediaProofCreate]

class AIAnalysisResponse(BaseModel):
    id: str
    submission_id: str
    vision_scores: Dict[str, Any]
    text_sentiment_score: float
    fraud_flags: Dict[str, Any]
    overall_quality_score: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class SubmissionResponse(BaseModel):
    id: str
    assignment_id: str
    answers_data: Dict[str, Any]
    submission_lat: float
    submission_lng: float
    geo_distance_meters: float
    submitted_at: datetime
    media_proofs: List[MediaProofResponse] = []
    ai_analysis: Optional[AIAnalysisResponse] = None

    class Config:
        from_attributes = True

class QCActionRequest(BaseModel):
    action: str  # approve, reject, reassign
    qc_notes: Optional[str] = None
    override_score: Optional[float] = None
