import { getToken } from "./auth-storage";
import { localApiRequest } from "./local-api";

/** Origin of your API (no trailing slash), e.g. http://localhost:4000 — set in `.env` as VITE_API_URL */
const raw = typeof import.meta.env.VITE_API_URL === "string" ? import.meta.env.VITE_API_URL.trim() : "";
const base = raw.replace(/\/$/, "");
const useLocalApi = import.meta.env.VITE_USE_LOCAL_API !== "false";

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (
    init.body &&
    typeof init.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  const t = getToken();
  if (t) headers.set("Authorization", `Bearer ${t}`);

  /** Razorpay order/verify must hit a real server (secret never in the browser bundle). */
  const isRazorpayPath = path === "/api/payments/razorpay/order" || path === "/api/payments/razorpay/verify";
  if (typeof globalThis.window !== "undefined" && isRazorpayPath && base) {
    const res = await fetch(`${base}${path}`, { ...init, headers });
    const text = await res.text();
    let data: unknown = {};
    if (text) {
      try {
        data = JSON.parse(text) as unknown;
      } catch {
        data = { raw: text };
      }
    }
    if (!res.ok) {
      const msg =
        typeof data === "object" && data && "error" in data
          ? String((data as { error: string }).error)
          : res.statusText;
      throw new ApiError(msg || "Request failed", res.status, data);
    }
    return data as T;
  }

  if (typeof globalThis.window !== "undefined" && useLocalApi && path.startsWith("/api/")) {
    try {
      return (await localApiRequest(path, { ...init, headers })) as T;
    } catch (e) {
      const err = e as { status?: number; message?: string };
      throw new ApiError(err.message || "Local API failed", err.status || 500);
    }
  }

  const res = await fetch(`${base}${path}`, { ...init, headers });
  const text = await res.text();
  let data: unknown = {};
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = { raw: text };
    }
  }
  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "error" in data
        ? String((data as { error: string }).error)
        : res.statusText;
    throw new ApiError(msg || "Request failed", res.status, data);
  }
  return data as T;
}
