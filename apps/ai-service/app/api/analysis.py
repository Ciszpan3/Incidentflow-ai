from typing import Annotated, Protocol
from hmac import compare_digest
from fastapi import APIRouter, Depends, Header, HTTPException
from app.config import get_settings
from app.schemas.analysis import AnalyzeIncidentRequest, IncidentAnalysis


class AnalysisService(Protocol):
	async def analyze(
		self, payload: AnalyzeIncidentRequest,
	) -> IncidentAnalysis: ...


def get_analysis_service() -> AnalysisService:
	raise RuntimeError("Configure provider adapter in app startup")


async def require_service_token(
	x_service_token: Annotated[str | None, Header()] = None,
) -> None:
	expected = get_settings().service_token.get_secret_value()
	if x_service_token is None or not compare_digest(x_service_token, expected):
		raise HTTPException(status_code=401, detail="Invalid service token")


router = APIRouter(prefix="/v1")


@router.post("/analyze-incident")
async def analyze_incident(
	payload: AnalyzeIncidentRequest,
	_auth: None = Depends(require_service_token),
	service: AnalysisService = Depends(get_analysis_service),
) -> IncidentAnalysis:
	return await service.analyze(payload)