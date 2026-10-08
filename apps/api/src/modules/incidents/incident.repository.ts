import type { PrismaClient, Severity } from "../../generated/prisma/client.js";

export type NewIncident = {
	organizationId: string; authorUserId: string; serviceId: string;
	title: string; description: string; severity: Severity;
};
export type IncidentRepository = {
	createWithInitialTimeline(input: NewIncident): Promise<{ id: string }>;
};
export type ServiceRepository = {
	findVisible(id: string, organizationId: string): Promise<{ id: string } | null>;
};

export function createRepositories(prisma: PrismaClient): {
	incidents: IncidentRepository; services: ServiceRepository;
} {
	return {
		services: { findVisible: (id, organizationId) =>
			prisma.service.findFirst({ where: { id, organizationId }, select: { id: true }
			}) },
		incidents: { createWithInitialTimeline: (input) =>
			prisma.incident.create({ data: {
				organizationId: input.organizationId, serviceId: input.serviceId,
				title: input.title, description: input.description, severity: input.severity,
				timeline: { create: { authorUserId: input.authorUserId,
					kind: "INCIDENT_CREATED", body: "Incident created" } },
			}, select: { id: true } }) },
	};
}