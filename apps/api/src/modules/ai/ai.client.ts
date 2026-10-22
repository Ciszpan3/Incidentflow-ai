import { z } from "zod";
import { AppError } from "../../shared/http/errors.js";

const analysisSchema = z.object({
  summary: z.string(),
  confidence: z.number().min(0).max(1),
});
export type Analysis = z.output<typeof analysisSchema>;
export type AnalyzeIncidentInput = {
  incident_id: string;
  title: string;
};
type Logger = {
  error(data: { cause: unknown; requestId: string }, message: string): void;
};

export class AiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
    private readonly logger: Logger,
  ) {}

  async analyze(
    payload: AnalyzeIncidentInput,
    requestId: string,
  ): Promise<Analysis> {
    try {
      const response = await fetch(this.baseUrl + "/v1/analyze-incident", {
        method: "POST",
        signal: AbortSignal.timeout(20_000),
        headers: {
          "content-type": "application/json",
          "x-service-token": this.token,
          "x-request-id": requestId,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("AI HTTP " + response.status);
      return analysisSchema.parse(await response.json());
    } catch (cause) {
      this.logger.error({ cause, requestId }, "AI request failed");
      throw new AppError(
        503,
        "AI_UNAVAILABLE",
        "AI analysis is temporarily unavailable",
        { cause },
      );
    }
  }
}
