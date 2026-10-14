import { compare } from "bcryptjs";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../shared/db/prisma.js";
import { AppError } from "../../shared/http/errors.js";
import { validateBody } from "../../shared/http/validate.js";
import { env } from "../../shared/config/env.js";
import { signSession } from "./session.js";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});
type LoginInput = z.output<typeof loginSchema>;
export const authRouter = Router();

authRouter.post(
  "/login",
  validateBody(loginSchema),
  async (_req, res, next) => {
    try {
      const input = res.locals.input as LoginInput;
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user || !(await compare(input.password, user.passwordHash))) {
        throw new AppError(401, "INVALID CREDENTIALS", "Invalid credentials");
      }
      const token = signSession({
        sub: user.id,
        organizationId: user.organizationId,
      });
      res.cookie("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 30 * 60 * 1000,
      });
      res.status(204).end();
    } catch (cause) {
      next(cause);
    }
  },
);
