import { z } from "zod";

export const incidentFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Title must contain at least 8 characters")
    .max(160, "Title cannot exceed 160 characters"),
  serviceId: z.uuid("Service ID must be a valid UUID"),
  severity: z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]),
  description: z
    .string()
    .trim()
    .min(20, "Description must contain at least 20 characters")
    .max(5000, "Description cannot exceed 5000 characters"),
});

export type IncidentFormValues = z.output<typeof incidentFormSchema>