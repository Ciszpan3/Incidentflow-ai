import { z } from "zod";
const errorEnvelope = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().optional(),
  }),
});

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly requestId?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

export async function requestJson<TSchema extends z.ZodType>(
  path: string,
  schema: TSchema,
  init: RequestInit = {},
): Promise<z.output<TSchema>> {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + path, {
      ...init,
      credentials: "include",
      headers: { "content-type": "application/json", ...init.headers },
    });
    const body: unknown = await response.json();
    if (!response.ok) {
      const parsed = errorEnvelope.safeParse(body);
      throw new ApiError(
        response.status,
        parsed.data?.error.code ?? "HTTP_ERROR",
        parsed.data?.error.message ?? "Request failed",
        parsed.data?.error.requestId,
      );
    }
    return schema.parse(body);
  } catch (cause) {
    if (cause instanceof ApiError || cause instanceof z.ZodError) throw cause;
    throw new ApiError(
      0,
      "NETWORK_ERROR",
      "Network request failed",
      undefined,
      {
        cause,
      },
    );
  }
}
