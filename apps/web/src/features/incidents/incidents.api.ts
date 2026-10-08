import { z } from "zod";
import {
  incidentSchema,
  type IncidentStatus,
  type Severity,
} from "../../domain/incident";
import { requestJson } from "../../shared/api/client";

const listSchema = z.object({
  items: z.array(incidentSchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type IncidentFilters = {
  page: number;
  status?: IncidentStatus;
  severity?: Severity;
};
export type CreateIncidentInput = {
  title: string;
  serviceId: string;
  severity: Severity;
  description: string;
};

export const incidentKeys = {
  all: ["incidents"] as const,
  lists: () => [...incidentKeys.all, "list"] as const,
  list: (filters: IncidentFilters) =>
    [...incidentKeys.lists(), filters] as const,
  detail: (id: string) => [...incidentKeys.all, "detail", id] as const,
};

export const incidentsApi = {
  list(filters: IncidentFilters) {
    const params = new URLSearchParams({ page: String(filters.page) });
    if (filters.status) params.set("status", filters.status);
    if (filters.severity) params.set("severity", filters.severity);
    return requestJson("/incidents?" + params.toString(), listSchema);
  },
  create(input: CreateIncidentInput) {
    return requestJson("/incidents", incidentSchema, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};
