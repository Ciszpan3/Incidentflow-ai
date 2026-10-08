import type { RequestHandler } from "express";
import type { CreateIncidentInput } from "./incident.schemas.js";
import type {
	AuthContext, IncidentService,
} from "./incident.service.js";
import { AppError } from "../../shared/http/errors.js";

type Locals = { auth?: AuthContext; input?: CreateIncidentInput };

export function createIncidentController(
	service: IncidentService,
): RequestHandler {
	return async (_req, res) => {
		const { auth, input } = res.locals as Locals;
		if (!auth) throw new AppError(401, "UNAUTHENTICATED", "Sign in required");
		if (!input) throw new AppError(
			500, "VALIDATION_MISSING", "Route misconfigured",
		);
		const incident = await service.create(auth, input);
		res.status(201).json(incident);
	};
}
