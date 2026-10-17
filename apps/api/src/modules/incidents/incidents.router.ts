import { Router } from "express";
import { createIncidentSchema, listIncidentsQuery } from "./incident.schemas.js";
import { validateBody, validateQuery } from "../../shared/http/validate.js";
import { createRepositories } from "./incident.repository.js";
import { prisma } from "../../shared/db/prisma.js";
import { createIncidentService } from "./incident.service.js";
import { createIncidentController, listIncidentsController } from "./incident.controller.js";

const repos = createRepositories(prisma);
const service = createIncidentService(repos);
const createController = createIncidentController(service);
const listController = listIncidentsController(service)

export const incidentsRouter = Router();

incidentsRouter.post("/", validateBody(createIncidentSchema), createController);
incidentsRouter.get("/", validateQuery(listIncidentsQuery), listController)
