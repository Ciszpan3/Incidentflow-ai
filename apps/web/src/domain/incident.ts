import z from "zod";

export const severitySchema = z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]);
export const incidentStatusSchema = z.enum([
  "OPEN",
  "INVESTIGATING",
  "MITIGATED",
  "RESLOVED",
]);

export const incidentSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  severity: severitySchema,
  status: incidentStatusSchema,
  service: z.object({ id: z.uuid(), name: z.string().min(1) }),
  startedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Incident = z.output<typeof incidentSchema>;
export type IncidentCard = Pick<
  Incident,
  "id" | "title" | "severity" | "status"
>;

const test = {
  id: "abc", // specjalnie zły UUID
  title: "Test",
  severity: "SEV1",
  status: "OPEN",
  service: {
    id: "też-nie-uuid", // specjalnie źle
    name: "API",
  },
  startedAt: "2026-10-01T10:00:00Z",
};

const res = incidentSchema.safeParse(test)

console.log(res)
