import httpx
import pytest
from app.clients.provider import ProviderFailure, post_json


@pytest.mark.anyio
async def test_timeout_is_mapped() -> None:
    async def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ReadTimeout("timed out", request=request)

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport) as client:
        with pytest.raises(ProviderFailure) as caught:
            await post_json(client, "https://provider.test/analyze", {"title": "CPU"})
    assert caught.value.code == "PROVIDER_TIMEOUT"


@pytest.mark.anyio
async def test_non_object_json_is_rejected() -> None:
    transport = httpx.MockTransport(
        lambda _request: httpx.Response(200, json=["unexpected"]),
    )
    async with httpx.AsyncClient(transport=transport) as client:
        with pytest.raises(ProviderFailure) as caught:
            await post_json(client, "https://provider.test/analyze", {})
    assert caught.value.code == "PROVIDER_INVALID_RESPONSE"


@pytest.mark.anyio
async def test_provider_limit() -> None:
    async def handler(_request: httpx.Request) -> httpx.Response:
        return httpx.Response(429, json={"status": "ok"})

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport) as client:
        with pytest.raises(ProviderFailure) as caught:
            await post_json(client, "https://provider.test/analyze", {"title": "cos"})
    assert caught.value.code == "PROVIDER_RATE_LIMITED"