import { NavLink, Outlet, useParams } from "react-router"
import "./app.css"

export function IncidentPage() {
    const { incidentId } = useParams();
    return <h1>Incident {incidentId ?? "unknown"}</h1>
}

const navigation = [{to: "/dashboard", label: "Overview"},
    {to: "/incidents", label: "Incidents"}, {to: "/runbooks", label: "Runbooks"}
]

export function AppLayout() {
    return <div className="appShell">
        <aside className="sidebar">
            <strong>IncidentFlow</strong>
            <nav aria-label="Main navigation">{navigation.map(item => 
                <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            )}</nav>
        </aside>
        <main className="content"><Outlet /></main>
    </div>
}