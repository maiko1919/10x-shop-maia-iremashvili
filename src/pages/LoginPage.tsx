import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormValues } from "../types/user";

interface LoginErrors {
  username?: string;
  password?: string;
}

function validate(values: LoginFormValues): LoginErrors {
  const errors: LoginErrors = {};

  if (values.username.trim() === "") {
    errors.username = "Username is required";
  }

  if (values.password === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

// საიდან მოვიდა მომხმარებელი (მაგ. /checkout). თუ არ ვიცით — კატალოგი
function getRedirectPath(state: unknown): string {
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string"
  ) {
    return state.from;
  }
  return "/";
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState<LoginFormValues>({ username: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    login(values.username.trim());
    navigate(getRedirectPath(location.state), { replace: true });
  }

  return (
    <Container>
      <div className="mx-auto max-w-sm">
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
          ← Back to catalog
        </Link>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-8">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-gray-500">Log in to place your order.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                aria-invalid={errors.username ? true : undefined}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 aria-invalid:border-red-500"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                aria-invalid={errors.password ? true : undefined}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 aria-invalid:border-red-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;