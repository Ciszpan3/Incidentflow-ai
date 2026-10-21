from typing import Annotated, Literal
from pydantic import BaseModel, Field

class ServiceHealthArgs(BaseModel):
    service_id: str

class RecentAlertsArgs(BaseModel):
    service_id: str
    limit: int = Field(default=10, ge=1, le=20)

class ServiceHealthCall(BaseModel):
    name: Literal["get_service_health"]
    arguments: ServiceHealthArgs

class RecentAlertsCall(BaseModel):
    name: Literal["get_recent_alerts"]
    arguments: RecentAlertsArgs

ToolCall = Annotated[ServiceHealthCall | RecentAlertsCall, Field(discriminator="name")]
