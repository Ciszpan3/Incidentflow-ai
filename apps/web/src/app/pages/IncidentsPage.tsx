import { IncidentForm } from "../../features/incidents/IncidentForm";
import { IncidentsList } from "../../features/incidents/IncidentsList";
// import { type CreateIncidentInput } from "../../features/incidents/incidents.api";
import { useCreateIncident } from "../../features/incidents/hooks/useCreateIncident";

export function IncidentsPage() {
  const query = useCreateIncident()

  return (
    <main className="incidentsPage">
      <h1>Incidents</h1>

      <div className="incidentsGrid">
      <section className="panel">
        <h2>Create incident</h2>
        <IncidentForm onSubmit={async (data) => {
          await query.mutateAsync(data)
        }}/>
        {query.isError && (
          <p className="statusError" role="alert">
            {query.error instanceof Error
            ? query.error.message
            : "Failed to create incident"}
          </p>
        )}
      </section>

      <section className="panel">
        <h2>Incidents list</h2>
        <IncidentsList />
      </section>
      </div>
    </main>
  );
}
