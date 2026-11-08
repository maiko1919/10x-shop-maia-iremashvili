import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../components/Container";
import FormField from "../components/ui/FormField";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormValues } from "../types/user";

// ვალიდაციის ყველა წესი ერთ ადგილას — შეცდომის ტექსტები PRD-დან
const loginSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

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

  const formik = useFormik<LoginFormValues>({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values.username.trim());
      navigate(getRedirectPath(location.state), { replace: true });
    },
  });

  return (
    <Container>
      <div className="mx-auto max-w-sm">
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
          ← Back to catalog
        </Link>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-8">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-gray-500">Log in to place your order.</p>

          <form onSubmit={formik.handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <FormField
              id="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="username"
              error={formik.touched.username ? formik.errors.username : undefined}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
              error={formik.touched.password ? formik.errors.password : undefined}
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
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