import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("HTTP boundary", () => {
  it("returns health with request id", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
    expect(response.headers["x-request-id"]).toBeTypeOf("string");
  });

  it("uses the stable not-found envelope", async () => {
    const response = await request(app).get("/missing");
    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("ROUTE_NOT_FOUND");
  });

  it("Incidents get", async () => {
    const response = await request(app).get("/api/v1/incidents");
    expect(response.status).toBe(401);
  });
});
