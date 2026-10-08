import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { incidentKeys, incidentsApi } from "./incidents.api";
import {
  incidentStatusSchema,
  type IncidentStatus,
} from "../../domain/incident";

export function IncidentsPage() {
  const [params, setParams] = useSearchParams();

  const rawPage = Number(params.get("page") ?? "1");

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const filters = {
    status: incidentStatusSchema
      .catch("OPEN")
      .parse(params.get("status") ?? "OPEN"),
    page,
  };

  function setStatus(status: IncidentStatus): void {
    setParams({ status, page: "1" });
  }

  const query = useQuery({
    queryKey: incidentKeys.list(filters),
    queryFn: () => incidentsApi.list(filters),
  });

  return (
    <main>
      <h1>Incidents</h1>

      <button onClick={() => setStatus("OPEN")}>Open</button>

      <button onClick={() => setStatus("RESOLVED")}>Resolved</button>

      {query.isPending && <p>Loading incidents...</p>}

      {query.isError && <p>Failed to load incidents.</p>}

      {query.isSuccess &&
        query.data.items.map((incident) => (
          <p key={incident.id}>{incident.title}</p>
        ))}
    </main>
  );
}
