export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
export const API_ENV = import.meta.env.VITE_API_ENV || (API_BASE_URL ? "sandbox" : "mock");
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "menopause-0.1.0";

export function shouldUseMockApi() {
  return API_ENV === "mock" || !API_BASE_URL;
}

export async function request(path, { method = "GET", body, locale = "zh-HK", token, deviceId, platform = "mobile-web", headers = {} } = {}) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is required for sandbox or production requests.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || import.meta.env.VITE_API_TOKEN || "demo-token"}`,
      "X-LivaNudge-Locale": locale,
      "X-LivaNudge-App-Version": APP_VERSION,
      ...(deviceId ? { "X-LivaNudge-Device-Id": deviceId } : {}),
      ...(platform ? { "X-LivaNudge-Platform": platform } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message || `Request failed: ${response.status}`);
  }
  return payload?.data ?? payload;
}
