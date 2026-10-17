import type { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../shared/http/errors.js";
import { verifySession } from "./session.js";

const cookiesSchema = z.object({ session: z.string().min(1) });

export const requireAuth: RequestHandler = (req, res, next) => {
	const parsed = cookiesSchema.safeParse(req.cookies);
	if (!parsed.success) {
		next(new AppError(401, "UNAUTHENTICATED", "Sign in"));
		return;
	}
	try {
		const claims = verifySession(parsed.data.session);

		res.locals.auth = {
			userId: claims.sub,
			organizationId: claims.organizationId
		}
		next();
	} catch {
		next(new AppError(401, "UNAUTHENTICATED", "Invalid session"));
	}
};