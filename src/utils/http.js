import { getToken } from "./token.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function api(path, { method = "GET", headers = {}, body } = {}) {
  const token = getToken();

  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);

  let data = null;
  try {
    data = await res.json();
  } catch {
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

// Verb helpers (compatible with your clothingApi usage)
api.get  = (path, opts = {}) => api(path, { ...opts, method: "GET" });
api.post = (path, body, opts = {}) => api(path, { ...opts, method: "POST", body });
api.put  = (path, body, opts = {}) => api(path, { ...opts, method: "PUT", body });
api.del  = (path, opts = {}) => api(path, { ...opts, method: "DELETE" });

export const http = api;
