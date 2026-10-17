import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./AppLayout";
import {
  DashboardPage,
  IncidentPage,
  IncidentsPage,
  NotFoundPage,
  RunbooksPage,
} from "./pages";
import { LoginForm } from "../features/auth/LoginForm";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/incidents", element: <IncidentsPage /> },
      { path: "/incidents/:incidentId", element: <IncidentPage /> },
      { path: "/runbooks", element: <RunbooksPage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
