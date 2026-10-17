import type { RequestHandler } from "express";
import type {
  CreateIncidentInput,
  ListIncidentsQuery,
} from "./incident.schemas.js";
import type { AuthContext, IncidentService } from "./incident.service.js";
import { AppError } from "../../shared/http/errors.js";

// type Locals = { auth?: AuthContext; input?: CreateIncidentInput };
type CreateLocals = {
  auth?: AuthContext;
  input?: CreateIncidentInput;
};

type ListLocals = {
  auth?: AuthContext;
  query?: ListIncidentsQuery;
};

export function createIncidentController(
  service: IncidentService,
): RequestHandler {
  return async (_req, res) => {
    const { auth, input } = res.locals as CreateLocals;
    if (!auth) throw new AppError(401, "UNAUTHENTICATED", "Sign in required");
    if (!input)
      throw new AppError(500, "VALIDATION_MISSING", "Route misconfigured");
    const incident = await service.create(auth, input);
    res.status(201).json(incident);
  };
}

export function listIncidentsController(
  service: IncidentService,
): RequestHandler {
  return async (_req, res) => {
    const { auth, query } = res.locals as ListLocals;

    if (!auth) {
      throw new AppError(401, "UNAUTHENTICATED", "Sign in required");
    }

    if (!query) {
      throw new AppError(500, "VALIDATION_MISSING", "Route misconfigured");
    }

    const result = await service.list(auth, query);
    res.status(200).json(result);
  };
}
