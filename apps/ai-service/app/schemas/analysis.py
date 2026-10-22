from datetime import datetime
from uuid import UUID
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

class StrictModel(BaseModel): model_config = ConfigDict(extra="forbid")
class Evidence(StrictModel):
    timestamp: datetime; source: Literal['ALERT', 'NOTE', 'STATUS_CHANGE']
    body: str = Field(min_length=1, max_length=60)
class AnalyzeIncidentRequest(StrictModel):
    incident_id: UUID; 
    title: str = Field(min_length=1, max_length=160)
    # evidence: list[Evidence] = Field(min_length=1, max_length=60)
class IncidentAnalysis(StrictModel):
    summary: str = Field(min_length=1, max_length=800)
    observed_signals: list[str] = Field(min_length=1, max_length=8)
    hypotheses: list[str] = Field(max_length=5)
    missing_information: list[str] = Field(max_length=5)
    recommended_runbook_query: str = Field(max_length=300)
    confidence: float = Field(ge=0, le=1)