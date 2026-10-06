import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./AppLayout";
import {
  DashboardPage,
  IncidentPage,
  IncidentsPage,
  NotFoundPage,
  RunbooksPage,
} from "./pages";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/incidents", element: <IncidentsPage /> },
      { path: "/incidents/:incidentId", element: <IncidentPage /> },
      { path: "/runbooks", element: <RunbooksPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
