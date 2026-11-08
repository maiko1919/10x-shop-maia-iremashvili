import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";
import type { AuthUser } from "../types/user";
import { STORAGE_KEYS } from "../utils/storageKeys";

const GUEST: AuthUser = { username: "", isLoggedIn: false };

// მხოლოდ სახელს ვინახავთ — პაროლი არსად ინახება
function loadUser(): AuthUser {
  try {
    const username = localStorage.getItem(STORAGE_KEYS.user);
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
    try {
      if (user.isLoggedIn) {
        localStorage.setItem(STORAGE_KEYS.user, user.username);
      } else {
        localStorage.removeItem(STORAGE_KEYS.user);
      }
    } catch {
      // localStorage მიუწვდომელია — სესია უბრალოდ არ შეინახება
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