import pytest
from pydantic import ValidationError
from app.schemas.analysis import IncidentAnalysis

def valid_analysis() -> dict[str, object]:
 return {
    "summary": "CPU is elevated",
    "observed_signals": ["cpu > 90%"],
    "hypotheses": ["traffic spike"],
    "missing_information": [],
    "recommended_runbook_query": "high CPU",
    "confidence": 0.4,
 }

def test_rejects_bad_confidence() -> None:
    with pytest.raises(ValidationError) as caught:
        IncidentAnalysis.model_validate(valid_analysis() | {"confidence": 5})
    assert any(error["loc"] == ("confidence",) for error in caught.value.errors())

def test_rejects_unknown_field() -> None:
    with pytest.raises(ValidationError):
        IncidentAnalysis.model_validate(valid_analysis() | {"severity": "HIGH"})
