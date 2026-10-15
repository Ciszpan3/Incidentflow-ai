from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, Request
from app.config import get_settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.settings = get_settings()
    app.state.http = httpx.AsyncClient(
        timeout=httpx.Timeout(20.0, connect=5.0),
    )
    try:
        yield
    finally:
        await app.state.http.aclose()

settings = get_settings()
app = FastAPI(title="IncidentFlow AI service", lifespan=lifespan)

@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}

def http_client(request: Request) -> httpx.AsyncClient:
    return request.app.state.http