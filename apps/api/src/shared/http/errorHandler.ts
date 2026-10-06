import type { ErrorRequestHandler } from "express";
import { AppError } from "./errors.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
    const known = error instanceof AppError;
    const status = known ? error.status : 500;
    res.status(status).json({ error: {
        code: known ? error.code : "INTERNAL_ERROR",
        message: known ? error.message : "Unexpected server error",
        details: known ? error.details : undefined,
        requestId: req.requestId
    } })
}