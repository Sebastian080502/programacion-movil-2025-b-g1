import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";
import { Capacitor } from "@capacitor/core";
import { Http } from "@capacitor-community/http";
import { API_BASE_URL } from "../config/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const isNative = Capacitor.isNativePlatform();

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

//  helper para convertir los headers de Axios a un objeto plano string/string
function normalizeHeaders(
  headers: AxiosRequestConfig["headers"]
): Record<string, string> {
  if (!headers) return {};

  // AxiosHeaders -> convertir a objeto
  if (headers instanceof AxiosHeaders) {
  const obj: Record<string, string> = {};
  headers.forEach((value: unknown, key: string) => {
    obj[key] = String(value);
  });
  return obj;
}


  // Si ya es un objeto
  if (typeof headers === "object") {
    const result: Record<string, string> = {};
    Object.entries(headers).forEach(([key, value]) => {
      if (value != null) {
        result[key] = String(value);
      }
    });
    return result;
  }

  return {};
}

async function nativeRequest<T>(
  method: HttpMethod,
  path: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const url = buildUrl(path);

  const extraHeaders = normalizeHeaders(config.headers);

  const res = await Http.request({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });

  // Http.request siempre retorna res.data como body
  return res.data as T;
}

async function webRequest<T>(
  method: HttpMethod,
  path: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const url = buildUrl(path);

  switch (method) {
    case "GET":
      return (await axios.get<T>(url, config)).data;
    case "POST":
      return (await axios.post<T>(url, data, config)).data;
    case "PUT":
      return (await axios.put<T>(url, data, config)).data;
    case "PATCH":
      return (await axios.patch<T>(url, data, config)).data;
    case "DELETE":
      return (await axios.delete<T>(url, config)).data;
  }
}

export function httpGet<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
) {
  return isNative
    ? nativeRequest<T>("GET", path, undefined, config)
    : webRequest<T>("GET", path, undefined, config);
}

export function httpPost<T = unknown>(
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return isNative
    ? nativeRequest<T>("POST", path, data, config)
    : webRequest<T>("POST", path, data, config);
}

export function httpPut<T = unknown>(
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return isNative
    ? nativeRequest<T>("PUT", path, data, config)
    : webRequest<T>("PUT", path, data, config);
}

export function httpPatch<T = unknown>(
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return isNative
    ? nativeRequest<T>("PATCH", path, data, config)
    : webRequest<T>("PATCH", path, data, config);
}

export function httpDelete<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
) {
  return isNative
    ? nativeRequest<T>("DELETE", path, undefined, config)
    : webRequest<T>("DELETE", path, undefined, config);
}
