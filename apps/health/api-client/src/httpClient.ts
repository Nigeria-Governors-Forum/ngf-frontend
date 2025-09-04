const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json();
}

export const httpClient = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("GET", path, undefined, headers),

  post: <T>(path: string, body: unknown, headers?: Record<string, string>) =>
    request<T>("POST", path, body, headers),

  put: <T>(path: string, body: unknown, headers?: Record<string, string>) =>
    request<T>("PUT", path, body, headers),

  patch: <T>(path: string, body: unknown, headers?: Record<string, string>) =>
    request<T>("PATCH", path, body, headers),

  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("DELETE", path, undefined, headers),
};
