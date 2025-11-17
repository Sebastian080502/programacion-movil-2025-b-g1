import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { API_BASE_URL } from "../config/env";
import { Preferences } from "@capacitor/preferences";
import { STORAGE_KEYS } from "../config/constants";

export const http = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token
http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = (await Preferences.get({ key: STORAGE_KEYS.TOKEN })).value;

    if (token) {
      // Aseguramos que headers nunca sea undefined
      const headers: AxiosRequestHeaders = (config.headers ||
        {}) as AxiosRequestHeaders;

      headers.Authorization = `Bearer ${token}`;

      config.headers = headers;
    }

    return config;
  }
);
