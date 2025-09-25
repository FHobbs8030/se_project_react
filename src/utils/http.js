// src/utils/http.js
const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function api(path, opts = {}) {
  const { body, headers, ...rest } = opts;

  let finalBody = body;
  let finalHeaders = { ...(headers || {}) };

  if (body && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }

  const res = await fetch(buildUrl(path), {
    credentials: "include",
    headers: finalHeaders,
    body: finalBody,
    ...rest,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}
