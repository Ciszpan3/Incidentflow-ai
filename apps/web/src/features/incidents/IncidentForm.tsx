import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  incidentFormSchema,
  type IncidentFormValues,
} from "./incidentForm.schema";

type Props = { onSubmit(values: IncidentFormValues): Promise<void> };

export function IncidentForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset, formState } =
    useForm<IncidentFormValues>({
      resolver: zodResolver(incidentFormSchema),
      defaultValues: {
        title: "",
        serviceId: "",
        severity: "SEV3",
        description: "",
      },
    });
  async function submit(values: IncidentFormValues): Promise<void> {
    try {
      await onSubmit(values);
      reset();
    } catch {
      // Błąd wyświetla komponent nadrzędny na podstawie stanu mutacji.
      // Nie resetujemy formularza, żeby użytkownik nie utracił danych.
    }
  }
  return (
    <form className="formStack" onSubmit={handleSubmit(submit)} noValidate>
      <label className="formField">
        Title <input className="formInput" {...register("title")} />
      </label>
      <label className="formField">
        Service ID <input className="formInput" {...register("serviceId")} />
      </label>
      <label className="formField">
        Severity{" "}
        <select className="formSelect" {...register("severity")}>
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>
      </label>
      <label className="formField">
        Description <textarea className="formTextarea" {...register("description")} />
      </label>
      {formState.errors.root && (
        <p className="formError" role="alert">{formState.errors.root.message}</p>
      )}
      {formState.errors.title && (
        <p className="formError" role="alert">{formState.errors.title.message}</p>
      )}
      {formState.errors.serviceId && (
        <p className="formError" role="alert">{formState.errors.serviceId.message}</p>
      )}
      {formState.errors.description && (
        <p className="formError" role="alert">{formState.errors.description.message}</p>
      )}
      <button className="primaryButton" disabled={formState.isSubmitting}>Create incident</button>
    </form>
  );
}
