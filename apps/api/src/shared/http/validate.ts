import type { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "./errors.js";

export function validateBody<TSchema extends z.ZodType>(
  schema: TSchema,
): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      next(
        new AppError(422, "VALIDATION_ERROR", "Check request fields", {
          fields: z.flattenError(parsed.error).fieldErrors,
        }),
      );
      return;
    }
    res.locals.input = parsed.data as z.output<TSchema>;
    next();
  };
}
