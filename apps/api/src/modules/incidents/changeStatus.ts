import type { IncidentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/db/prisma.js";
import { AppError } from "../../shared/http/errors.js";
import type { AuthContext } from "./incident.service.js";

export async function changeIncidentStatus(
  auth: AuthContext,
  id: string,
  expectedVersion: number,
  status: IncidentStatus,
) {
  return prisma.$transaction(async (tx) => {
    const visible = await tx.incident.findFirst({
      where: { id, organizationId: auth.organizationId },
      select: { id: true },
    });
    if (!visible) throw new AppError(
      404,
      "INCIDENT_NOT_FOUND",
      "Incident not found",
    );
    const updated = await tx.incident.updateMany({
      where: { id, organizationId: auth.organizationId, version: expectedVersion },
      data: { status, version: { increment: 1 } },
    });
    if (updated.count !== 1) throw new AppError(
      409,
      "VERSION_CONFLICT",
      "Refresh the incident",
    );
    await tx.timelineEvent.create({
      data: {
        incidentId: id,
        authorUserId: auth.userId,
        kind: "STATUS_CHANGE",
        body: "Status changed to " + status,
      },
    });
    return tx.incident.findFirstOrThrow({
      where: { id, organizationId: auth.organizationId },
    });
  });
}
