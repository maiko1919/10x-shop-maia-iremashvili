import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Container from "../components/Container";
import FormField from "../components/ui/FormField";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../hooks/useToast";
import { loadOrders } from "../utils/orders";
import { ordersStorage, profileStorage, reviewsStore } from "../utils/storage";
import type { ProfileValues } from "../types/user";
import type { Theme } from "../context/ThemeContext";

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const THEMES: Theme[] = ["light", "dark"];

function validate(values: ProfileValues): ProfileErrors {
  const errors: ProfileErrors = {};

  if (values.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }
  if (values.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // ტელეფონი არასავალდებულოა, მაგრამ თუ შევსებულია — 9-15 ციფრი
  const phone = values.phone.trim();
  if (phone !== "") {
    const digits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s]+$/.test(phone) || digits.length < 9 || digits.length > 15) {
      errors.phone = "Please enter a valid phone number";
    }
  }

  return errors;
}

function ProfilePage() {
  const { user, logout, updateUsername } = useAuth();
  const { clearCart } = useCart();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [values, setValues] = useState<ProfileValues>(
    () => profileStorage.get() ?? { firstName: user.username, lastName: "", email: "", phone: "" }
  );
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [ordersCount, setOrdersCount] = useState(() => loadOrders().length);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const cleaned: ProfileValues = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    };

    profileStorage.set(cleaned);
    setValues(cleaned);
    updateUsername(cleaned.firstName);
    showToast("Profile saved ✓");
  }

  // კალათა, შეკვეთები და რევიუები იშლება — სესია და თემა რჩება
  function handleClearData() {
    if (!window.confirm("Clear cart, orders and reviews? This cannot be undone.")) return;
    clearCart();
    ordersStorage.remove();
    reviewsStore.remove();
    setOrdersCount(0);
    showToast("Local data cleared");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Container>
      <h1 className="mb-6 text-2xl font-bold">My profile</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold">Personal details</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="firstName"
              label="First name"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <FormField
              id="lastName"
              label="Last name"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              autoComplete="family-name"
            />
          </div>

          <FormField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <FormField
            id="phone"
            label="Phone (optional)"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
          />

          <button
            type="submit"
            className="mt-2 self-start rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Save changes
          </button>
        </form>

        <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user.username}</p>
              <Link to="/orders" className="text-sm text-emerald-700 hover:underline">
                {ordersCount} order(s)
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-gray-700">Theme</h2>
            <div className="flex gap-2">
              {THEMES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option)}
                  aria-pressed={theme === option}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                    theme === option
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option === "light" ? "☀️" : "🌙"} {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleClearData}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Clear local data
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default ProfilePage;