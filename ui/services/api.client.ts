const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown,
  headers?: Record<string, string>,
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, message);
  }

  const data: T = res.status === 204 ? (undefined as T) : await res.json();
  return { data, status: res.status, ok: true };
}

export const apiClient = {
  get:    <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, "GET", undefined, headers),
  post:   <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, "POST", body, headers),
  put:    <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, "PUT", body, headers),
  patch:  <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, "PATCH", body, headers),
  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, "DELETE", undefined, headers),
};
