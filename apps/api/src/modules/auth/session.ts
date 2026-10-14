import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../shared/config/env.js";

const claimsSchema = z.object({
	sub: z.uuid(),
	organizationId: z.uuid(),
});
export type SessionClaims = z.output<typeof claimsSchema>;

export function signSession(claims: SessionClaims): string {
	return jwt.sign(claims, env.SESSION_SECRET, { expiresIn: "30m" });
}
export function verifySession(token: string): SessionClaims {
	return claimsSchema.parse(jwt.verify(token, env.SESSION_SECRET));
}