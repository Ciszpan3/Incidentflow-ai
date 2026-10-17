import type {
  IncidentStatus,
  PrismaClient,
  Severity,
} from "../../generated/prisma/client.js";

export type NewIncident = {
  organizationId: string;
  authorUserId: string;
  serviceId: string;
  title: string;
  description: string;
  severity: Severity;
};
export type IncidentRecord = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  service: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
export type IncidentListInput = {
  organizationId: string;
  page: number;
  limit: number;
  status?: IncidentStatus;
};
export type IncidentListResult = {
  items: IncidentRecord[];
  total: number;
};

export type IncidentRepository = {
  createWithInitialTimeline(input: NewIncident): Promise<IncidentRecord>;
  listForOrganization(input: IncidentListInput): Promise<IncidentListResult>;
};
export type ServiceRepository = {
  findVisible(
    id: string,
    organizationId: string,
  ): Promise<{ id: string } | null>;
};

export function createRepositories(prisma: PrismaClient): {
  incidents: IncidentRepository;
  services: ServiceRepository;
} {
  return {
    services: {
      findVisible: (id, organizationId) =>
        prisma.service.findFirst({
          where: { id, organizationId },
          select: { id: true },
        }),
    },
    incidents: {
      createWithInitialTimeline: (input) =>
        prisma.incident.create({
          data: {
            organizationId: input.organizationId,
            serviceId: input.serviceId,
            title: input.title,
            description: input.description,
            severity: input.severity,
            timeline: {
              create: {
                authorUserId: input.authorUserId,
                kind: "INCIDENT_CREATED",
                body: "Incident created",
              },
            },
          },
          select: {
            id: true,
            title: true,
            description: true,
            severity: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            service: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
      listForOrganization: async ({ organizationId, page, limit, status }) => {
        const where = {
          organizationId,
          ...(status ? { status } : {}),
        };

        const [items, total] = await prisma.$transaction([
          prisma.incident.findMany({
            where,
            select: {
              id: true,
              title: true,
              description: true,
              severity: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              service: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
            skip: (page - 1) * limit,
            take: limit,
          }),
          prisma.incident.count({ where }),
        ]);

        return { items, total };
      },
    },
  };
}

export async function findIncidentForOrganization(
  prisma: PrismaClient,
  incidentId: string,
  organizationId: string,
): Promise<unknown> {
  return prisma.incident.findFirst({
    where: { id: incidentId, organizationId },
  });
}
