import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { incidentFormSchema, type IncidentFormValues } from "./incidentForm.schema";


type Props = { onSubmit(values: IncidentFormValues): Promise<void> };

export function IncidentForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues: {
      title: "",
      serviceId: "",
      severity: "SEV3",
      description: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Title <input {...register("title")} />
      </label>
      <label>
        Service ID <input {...register("serviceId")} />
      </label>
      <label>
        Severity{" "}
        <select {...register("severity")}>
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>
      </label>
      <label>
        Description <textarea {...register("description")} />
      </label>
      {formState.errors.root && (
        <p role="alert">{formState.errors.root.message}</p>
      )}
      <button disabled={formState.isSubmitting}>Create incident</button>
    </form>
  );
}
