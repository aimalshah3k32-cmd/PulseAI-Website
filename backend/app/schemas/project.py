from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

class LocationBase(BaseModel):
    store_name: str
    address: str
    city: str
    country: str = "United States"
    latitude: float
    longitude: float
    geofence_radius_meters: float = 150.0

class LocationCreate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id: str
    project_id: str
    status: str

    class Config:
        from_attributes = True

class QuestionItem(BaseModel):
    id: str
    type: str  # text, single_choice, multiple_choice, photo, audio, barcode, rating
    title: str
    required: bool = True
    options: Optional[List[str]] = None
    ai_validation_rules: Optional[Dict[str, Any]] = None

class QuestionnaireCreate(BaseModel):
    schema_json: List[QuestionItem]
    generated_by_ai: bool = True

class QuestionnaireResponse(BaseModel):
    id: str
    project_id: str
    schema_json: List[Dict[str, Any]]
    generated_by_ai: str
    version: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    raw_brief: Optional[str] = None
    project_type: str = "retail_audit"
    payout_per_task: float = 25.0
    target_quota: int = 50

class ProjectCreate(ProjectBase):
    locations: Optional[List[LocationCreate]] = None
    questionnaire_schema: Optional[List[QuestionItem]] = None

class AIBriefInput(BaseModel):
    brief_text: str
    industry: Optional[str] = "Retail & CPG"
    target_market: Optional[str] = "Global"

class AIBriefParseResponse(BaseModel):
    suggested_title: str
    project_type: str
    recommended_payout: float
    extracted_locations: List[LocationCreate]
    generated_questions: List[QuestionItem]
    ai_rationale: str

class ProjectResponse(ProjectBase):
    id: str
    client_id: str
    status: str
    completed_quota: int
    created_at: datetime
    locations: Optional[List[LocationResponse]] = None
    questionnaires: Optional[List[QuestionnaireResponse]] = None

    class Config:
        from_attributes = True
