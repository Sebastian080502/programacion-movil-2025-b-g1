import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import { storage } from "../services/storage.service";
import { STORAGE_KEYS } from "../config/constants";
import { decodeJwt } from "../utils/jwt";

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const buildUserFromToken = (token: string): AuthUser | null => {
  const payload = decodeJwt<{ sub?: string; email?: string }>(token);
  if (!payload) return null;

  return {
    id: String(payload.sub ?? ""),
    email: payload.email ?? "",
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Cargar token guardado al iniciar la app
  useEffect(() => {
    (async () => {
      const storedToken = await storage.get(STORAGE_KEYS.TOKEN);
      if (storedToken) {
        setToken(storedToken);
        setUser(buildUserFromToken(storedToken));
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    setToken(res.token);
    setUser(buildUserFromToken(res.token));
  };

  const register = async (email: string, password: string) => {
    const res = await authService.register(email, password);
    setToken(res.token);
    setUser(buildUserFromToken(res.token));
  };

  const logout = async () => {
    await authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
