import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../ui/Icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "shop_theme";

// index.html-ის სკრიპტმა თემა უკვე ჩართო — აქედან ვკითხულობთ
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // თუ localStorage მიუწვდომელია, თემა უბრალოდ არ შეინახება
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ThemeToggle;