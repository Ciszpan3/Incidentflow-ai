import { Router } from "express";
import { createIncidentSchema } from "./incident.schemas.js";
import { validateBody } from "../../shared/http/validate.js";
import { createRepositories } from "./incident.repository.js";
import { prisma } from "../../shared/db/prisma.js";
import { createIncidentService } from "./incident.service.js";
import { createIncidentController } from "./incident.controller.js";

const repos = createRepositories(prisma);
const service = createIncidentService(repos);
const controller = createIncidentController(service);

export const incidentsRouter = Router();

incidentsRouter.post("/", validateBody(createIncidentSchema), controller);
