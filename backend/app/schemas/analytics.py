from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class MetricSummary(BaseModel):
    total_projects: int
    active_audits: int
    completed_submissions: int
    verified_shoppers: int
    average_compliance_score: float
    auto_approval_rate: float
    fraud_prevented_count: int

class RegionalCoverage(BaseModel):
    city: str
    country: str
    total_audits: int
    compliance_score: float
    lat: float
    lng: float

class ComplianceTrend(BaseModel):
    date: str
    planogram_compliance: float
    stock_availability: float
    cleanliness_score: float

class SentimentDistribution(BaseModel):
    positive: int
    neutral: int
    negative: int

class ExecutiveReport(BaseModel):
    project_id: str
    project_title: str
    overall_compliance_pct: float
    total_locations_audited: int
    ai_synthesized_insights: List[str]
    critical_alerts: List[str]
    top_performing_regions: List[str]
    underperforming_stores: List[Dict[str, Any]]
