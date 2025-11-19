import { loginApi, registerApi, AuthApiResponse } from "../api/auth.api";
import { storage } from "./storage.service";
import { STORAGE_KEYS } from "../config/constants";

export interface AuthResult {
  token: string;
  user: { id: string; email: string } | null;
}

const mapResponse = (res: AuthApiResponse): AuthResult => {
  const token = res.access_token;
  return { token, user: null };
};

export const authService = {
  login: async (email: string, password: string): Promise<AuthResult> => {
    const res = await loginApi(email, password);
    const mapped = mapResponse(res);
    await storage.set(STORAGE_KEYS.TOKEN, mapped.token);
    return mapped;
  },

  register: async (email: string, password: string): Promise<AuthResult> => {
    const res = await registerApi(email, password);
    const mapped = mapResponse(res);
    await storage.set(STORAGE_KEYS.TOKEN, mapped.token);
    return mapped;
  },

  logout: async () => {
    await storage.remove(STORAGE_KEYS.TOKEN);
  },
};
