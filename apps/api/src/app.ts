import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import { apiRouter } from "./routes/api.router.js";
import { env } from "./shared/config/env.js";
import { AppError } from "./shared/http/errors.js";
import { errorHandler } from "./shared/http/errorHandler.js";

export const app = express();
app.use((req, res, next) => {
  const header = req.headers["x-request-id"];
  req.requestId = typeof header === "string" ? header : randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
});
app.use(
  pinoHttp<express.Request, express.Response>({
    genReqId: (req) => req.requestId,
  }),
);
app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use("/api/v1", apiRouter);
app.use((_req, _res, next) =>
  next(new AppError(404, "ROUTE_NOT_FOUND", "Route not found")),
);
app.use(errorHandler);
