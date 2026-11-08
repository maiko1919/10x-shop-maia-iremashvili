import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme, ThemeContextValue } from "./ThemeContext";
import { STORAGE_KEYS } from "../utils/storageKeys";

// index.html-ის სკრიპტმა თემა უკვე ჩართო — აქედან ვკითხულობთ
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // localStorage მიუწვდომელია — თემა უბრალოდ არ შეინახება
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const value: ThemeContextValue = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;