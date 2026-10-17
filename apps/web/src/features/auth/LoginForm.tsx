import { z } from "zod";
import { requestVoid } from "../../shared/api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});
type LoginInput = z.output<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function login(values: LoginInput): Promise<void> {
    try {
      await requestVoid("/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      navigate("/incidents", {
        replace: true,
      });
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit(login)}>
      <h1>Login Form</h1>
      <label className="formField">
        Email <input className="formInput" {...register("email")} />
      </label>
      <label className="formField">
        Password <input className="formInput" type="password" {...register("password")} />
      </label>
      {formState.errors.email && (
        <p className="formError" role="alert">{formState.errors.email.message}</p>
      )}
      {formState.errors.password && (
        <p className="formError" role="alert">{formState.errors.password.message}</p>
      )}
      {formState.errors.root && (
        <p className="formError" role="alert">{formState.errors.root.message}</p>
      )}
      <button className="primaryButton" disabled={formState.isSubmitting} type="submit">
        {formState.isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
