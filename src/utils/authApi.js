import { api } from "./http.js";
import { setToken, removeToken } from "./token.js";

export function getMe() {
  return api("/users/me");
}

export async function signin({ email, password }) {
  const data = await api("/signin", { method: "POST", body: { email, password } });
  if (data && data.token) setToken(data.token);
  return getMe();
}

export async function signup({ name, email, password }) {
  const data = await api("/signup", { method: "POST", body: { name, email, password } });
  if (data && data.token) setToken(data.token);
  return data;
}

export async function signout() {
  removeToken();
  try {
    await api("/signout", { method: "POST" });
  } catch {
    // backend may not expose /signout; ignore
  }
}
