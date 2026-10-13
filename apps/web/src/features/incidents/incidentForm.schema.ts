import { z } from "zod";

export const incidentFormSchema = z.object({
  title: z.string().trim().min(8, "Title is required").max(160),
  serviceId: z.uuid(),
  severity: z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]),
  description: z.string().trim().min(20).max(5000),
});

export type IncidentFormValues = z.output<typeof incidentFormSchema>