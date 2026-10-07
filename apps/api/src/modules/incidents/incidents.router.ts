import { Router } from "express";
import type { CreateIncidentInput } from "./incident.schemas.js";
import { createIncidentSchema } from "./incident.schemas.js";
import { validateBody } from "../../shared/http/validate.js";

export const incidentsRouter = Router();

incidentsRouter.post("/", validateBody(createIncidentSchema), (_req, res) => {
  const input = res.locals.input as CreateIncidentInput;
  res.status(201).json({
    id: "00000000-0000-4000-8000-000000000001",
    ...input,
  });
});
