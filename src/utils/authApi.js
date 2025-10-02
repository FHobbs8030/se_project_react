import { api } from "./http.js";

export function getMe() {
  return api("/users/me");
}

export async function signin({ email, password }) {
  await api("/signin", { method: "POST", body: { email, password } });
  return getMe();
}

export function signup({ name, email, password }) {
  return api("/signup", { method: "POST", body: { name, email, password } });
}

export function signout() {
  return api("/signout", { method: "POST" });
}
