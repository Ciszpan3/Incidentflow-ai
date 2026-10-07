import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z.string().trim().min(8).max(160),
  serviceId: z.uuid(),
  severity: z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]),
  description: z.string().trim().min(20).max(5000),
});
export const listIncidentsQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  status: z.enum(["OPEN", "INVESTIGATING", "MITIGATED", "RESOLVED"]).optional(),
});

export const incidentIdParams = z.object({ incidentId: z.uuid() });

export type CreateIncidentInput = z.output<typeof createIncidentSchema>;
export type ListIncidentsQuery = z.output<typeof listIncidentsQuery>;
