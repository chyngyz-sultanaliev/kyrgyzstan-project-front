export interface FetchApiOptions extends RequestInit {
  token?: string;
}

export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL не задан");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers && !(options.headers instanceof Headers)
      ? (options.headers as Record<string, string>)
      : {}),
  };

  // токен: передан явно или берется из localStorage (только на клиенте)
  const token =
    options.token ??
    (typeof window !== "undefined"
      ? localStorage.getItem("token") ?? undefined
      : undefined);
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка запроса ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
