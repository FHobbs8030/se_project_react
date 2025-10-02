const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function api(path, { method = "GET", headers = {}, body } = {}) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    credentials: "include",
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const msg = (data && data.message) || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const http = api;
