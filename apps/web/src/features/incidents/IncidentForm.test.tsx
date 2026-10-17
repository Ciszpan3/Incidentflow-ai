import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { IncidentForm } from "./IncidentForm";

it("blokuje submit i pokazuje błąd pustego tytułu", async () => {
	const user = userEvent.setup();
	const onSubmit = vi.fn();
	render(<IncidentForm onSubmit={onSubmit} />);

	await user.click(screen.getByRole("button", { name: /create/i }));

	expect(await screen.findByText(/title must contain at least 8 characters/i)).toBeVisible();
	expect(onSubmit).not.toHaveBeenCalled();
});
