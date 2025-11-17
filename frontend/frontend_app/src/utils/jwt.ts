export interface DefaultJwtPayload {
  sub?: string;
  email?: string;
  [key: string]: any;
}

export const decodeJwt = <T = DefaultJwtPayload>(token: string): T | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decoded = atob(payload);
    return JSON.parse(decoded) as T;
  } catch (e) {
    console.error("Error decoding JWT", e);
    return null;
  }
};
