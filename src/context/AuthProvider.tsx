import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";
import type { AuthUser } from "../types/user";

const STORAGE_KEY = "shop_user";
const GUEST: AuthUser = { username: "", isLoggedIn: false };

// მხოლოდ სახელს ვინახავთ — პაროლი არსად ინახება
function loadUser(): AuthUser {
  try {
    const username = localStorage.getItem(STORAGE_KEY);
    return username ? { username, isLoggedIn: true } : GUEST;
  } catch {
    return GUEST;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(loadUser);

  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem(STORAGE_KEY, user.username);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  function login(username: string) {
    setUser({ username, isLoggedIn: true });
  }

  function logout() {
    setUser(GUEST);
  }

  const value: AuthContextValue = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;