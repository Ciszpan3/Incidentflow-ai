import httpx
from typing import Protocol

class ProviderClient(Protocol):
    async def analyse(self, *, system: str, user: str) -> dict[str, object]: ...

class ProviderFailure(Exception):
    def __init__(self, code: str, cause: Exception | None = None) -> None:
        super().__init__(code)
        self.code = code
        self.__cause__ = cause


async def post_json(
    client: httpx.AsyncClient, url: str, payload: dict[str, object],
) -> dict[str, object]:
    try:
        response = await client.post(url, json=payload)
        if response.status_code == 429:
            raise ProviderFailure("PROVIDER_RATE_LIMITED")
        response.raise_for_status()
        data = response.json()
        if not isinstance(data, dict):
            raise ValueError("Provider JSON must be an object")
        return data
    except httpx.TimeoutException as cause:
        raise ProviderFailure("PROVIDER_TIMEOUT", cause) from cause
    except httpx.RequestError as cause:
        raise ProviderFailure("PROVIDER_UNAVAILABLE", cause) from cause
    except (httpx.HTTPStatusError, ValueError) as cause:
        raise ProviderFailure("PROVIDER_INVALID_RESPONSE", cause) from cause