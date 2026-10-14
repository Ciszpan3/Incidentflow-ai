import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/db/prisma.js";
import type { ListIncidentsQuery } from "./incident.schemas.js";
import type { AuthContext } from "./incident.service.js";

export async function listIncidents(
	auth: AuthContext, query: ListIncidentsQuery,
) {
	const where: Prisma.IncidentWhereInput = {
		organizationId: auth.organizationId,
		...(query.status ? { status: query.status } : {}),
	};
	const orderBy = [
		{ updatedAt: "desc" as const }, { id: "desc" as const },
	];
	const [items, total] = await prisma.$transaction([
		prisma.incident.findMany({
			where, orderBy, skip: (query.page - 1) * query.limit,
			take: query.limit, include: { service: true },
		}),
		prisma.incident.count({ where }),
	]);
	return { items, meta: {
		page: query.page, limit: query.limit, total,
		totalPages: Math.ceil(total / query.limit),
	} };
}
