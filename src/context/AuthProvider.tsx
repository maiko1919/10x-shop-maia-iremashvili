import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";
import type { AuthUser } from "../types/user";

const GUEST: AuthUser = { username: "", isLoggedIn: false };

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(GUEST);

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