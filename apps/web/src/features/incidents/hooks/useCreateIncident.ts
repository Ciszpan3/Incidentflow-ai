import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
	incidentKeys,
	incidentsApi,
	type CreateIncidentInput,
} from "../incidents.api";

export function useCreateIncident() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (input: CreateIncidentInput) => incidentsApi.create(input),
		onSuccess: (incident) => {
			queryClient.setQueryData(incidentKeys.detail(incident.id), incident);
			void queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
			void navigate("/incidents/" + incident.id);
		},
	});
}
