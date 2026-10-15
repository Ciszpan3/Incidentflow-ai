from typing import Protocol

class ProviderClient(Protocol):
    async def analyse(self, *, system: str, user: str) -> dict[str, object]: ...