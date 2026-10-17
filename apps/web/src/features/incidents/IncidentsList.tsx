import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { incidentKeys, incidentsApi } from "./incidents.api";
import {
  incidentStatusSchema,
  type IncidentStatus,
} from "../../domain/incident";

export function IncidentsList() {
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
    <main className="incidentList">

      <div className="filterBar">
      <button className="filterButton" onClick={() => setStatus("OPEN")}>Open</button>

      <button className="filterButton" onClick={() => setStatus("RESOLVED")}>Resolved</button>
      </div>

      {query.isPending && <p className="listState">Loading incidents...</p>}

      {query.isError && <p className="statusError">Failed to load incidents.</p>}

      {query.isSuccess &&
        <div className="incidentItems">{query.data.items.map((incident) => (
          <p className="incidentCard" key={incident.id}>{incident.title}</p>
        ))}</div>}
    </main>
  );
}
