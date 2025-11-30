import { httpPost } from "./http";

// La forma en que responde tu backend Nest (ajusta si cambia)
export interface AuthApiResponse {
  access_token: string;
}

// Login (email, password) -> AuthApiResponse
export const loginApi = (
  email: string,
  password: string
): Promise<AuthApiResponse> => {
  return httpPost<AuthApiResponse>("/auth/login", { email, password });
};

// Register (email, password) -> AuthApiResponse
export const registerApi = (
  email: string,
  password: string
): Promise<AuthApiResponse> => {
  return httpPost<AuthApiResponse>("/auth/register", { email, password });
};

// --- OPCIONALES: para que no fallen ForgotPassword y ResetPassword ---

export const requestPasswordResetApi = (email: string): Promise<void> => {
  // Ajusta la ruta si tu backend usa otra
  return httpPost<void>("/auth/request-reset", { email });
};

export const resetPasswordApi = async (
  email: string,
  code: string,
  newPassword: string
): Promise<void> => {
  return await httpPost<void>("/auth/reset-password", {
    email,
    code,
    newPassword,
  });
};

