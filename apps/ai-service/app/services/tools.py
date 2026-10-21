from typing import Protocol
from app.schemas.tools import ToolCall


class ToolExecutor(Protocol):
	async def execute(self, *, name: str, organization_id: str,
		arguments: dict[str, object]) -> dict[str, object]: ...


class ModelResponse(Protocol):
	tool_calls: list[ToolCall]
	final: str


class ToolModel(Protocol):
	async def next(self, messages: list[object]) -> ModelResponse: ...


async def execute_tool(
	call: ToolCall, organization_id: str, executor: ToolExecutor,
) -> dict[str, object]:
	return await executor.execute(
		name=call.name, organization_id=organization_id,
		arguments=call.arguments.model_dump(),
	)


async def run_tool_loop(
	model: ToolModel, messages: list[object],
	executor: ToolExecutor, organization_id: str,
) -> str:
	for _ in range(3):
		response = await model.next(messages)
		if not response.tool_calls:
			return response.final
		for call in response.tool_calls:
			messages.append(await execute_tool(call, organization_id, executor))
	raise RuntimeError("Tool call limit exceeded")