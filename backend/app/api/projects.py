from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import json

from app.core.database import get_db
from app.models.project import Project, Location, Questionnaire
from app.models.user import ClientProfile
from app.schemas.project import (
    ProjectCreate, 
    ProjectResponse, 
    AIBriefInput, 
    AIBriefParseResponse,
    QuestionnaireCreate,
    QuestionnaireResponse
)
from app.services.ai_brief_parser import parse_natural_language_brief

router = APIRouter(prefix="/projects", tags=["Client Projects"])

@router.post("/parse-brief", response_model=AIBriefParseResponse)
def parse_brief(brief_in: AIBriefInput):
    """
    AI Endpoint: Parses natural language or audio transcript brief into 
    structured branch locations, quotas, and JSON questionnaire schema.
    """
    if not brief_in.brief_text or len(brief_in.brief_text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Please provide a descriptive project brief")
    
    return parse_natural_language_brief(
        brief_text=brief_in.brief_text,
        industry=brief_in.industry or "Retail & CPG",
        target_market=brief_in.target_market or "Global"
    )

@router.get("", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects

@router.post("", response_model=ProjectResponse)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    # Fallback to first client profile or create mock client profile
    client_prof = db.query(ClientProfile).first()
    if not client_prof:
        raise HTTPException(status_code=400, detail="No client profile found. Please register a client first.")

    new_project = Project(
        id=str(uuid.uuid4()),
        client_id=client_prof.id,
        title=project_in.title,
        raw_brief=project_in.raw_brief,
        project_type=project_in.project_type,
        payout_per_task=project_in.payout_per_task,
        target_quota=project_in.target_quota or 50,
        completed_quota=0,
        status="active"
    )
    db.add(new_project)
    db.flush()

    # Add locations if provided
    if project_in.locations:
        for loc in project_in.locations:
            new_loc = Location(
                id=str(uuid.uuid4()),
                project_id=new_project.id,
                store_name=loc.store_name,
                address=loc.address,
                city=loc.city,
                country=loc.country,
                latitude=loc.latitude,
                longitude=loc.longitude,
                geofence_radius_meters=loc.geofence_radius_meters,
                status="pending"
            )
            db.add(new_loc)

    # Add questionnaire if provided
    if project_in.questionnaire_schema:
        schema_data = [q.model_dump() for q in project_in.questionnaire_schema]
        new_q = Questionnaire(
            id=str(uuid.uuid4()),
            project_id=new_project.id,
            schema_json=schema_data,
            generated_by_ai="true",
            version=1
        )
        db.add(new_q)

    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
