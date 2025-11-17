import { http } from "./http";

// Lo que realmente devuelve tu backend Nest
export interface AuthApiResponse {
  access_token: string;
}

export const loginApi = async (email: string, password: string) => {
  const res = await http.post<AuthApiResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerApi = async (email: string, password: string) => {
  const res = await http.post<AuthApiResponse>("/auth/register", {
    email,
    password,
  });
  return res.data;
};
