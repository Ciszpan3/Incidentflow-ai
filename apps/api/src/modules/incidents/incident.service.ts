import type {
  CreateIncidentInput,
  ListIncidentsQuery,
} from "./incident.schemas.js";
import type {
  IncidentRepository,
  ServiceRepository,
} from "./incident.repository.js";
import { AppError } from "../../shared/http/errors.js";

export type AuthContext = { userId: string; organizationId: string };
type Dependencies = {
  incidents: IncidentRepository;
  services: ServiceRepository;
};

export function createIncidentService(deps: Dependencies) {
  return {
    async create(auth: AuthContext, input: CreateIncidentInput) {
      const service = await deps.services.findVisible(
        input.serviceId,
        auth.organizationId,
      );
      if (!service) {
        throw new AppError(404, "SERVICE_NOT_FOUND", "Unknown service");
      }
      return deps.incidents.createWithInitialTimeline({
        organizationId: auth.organizationId,
        authorUserId: auth.userId,
        serviceId: service.id,
        title: input.title,
        description: input.description,
        severity: input.severity,
      });
    },
    async list(auth: AuthContext, query: ListIncidentsQuery) {
      const result = await deps.incidents.listForOrganization({
        organizationId: auth.organizationId,
        page: query.page,
        limit: query.limit,
        status: query.status,
      });

      return {
        items: result.items,
        meta: {
          page: query.page,
          limit: query.limit,
          total: result.total,
          totalPages: Math.ceil(result.total / query.limit),
        },
      };
    },
  };
}
export type IncidentService = ReturnType<typeof createIncidentService>;
