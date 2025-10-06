import { apiBase } from "./utils.js";

export const signup = async ({ name, email, password }) => {
  const res = await fetch(`${apiBase}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Signup failed");
  }
  return res.json();
};

export const signin = async ({ email, password }) => {
  const res = await fetch(`${apiBase}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Login failed");
  }
  return res.json();
};

export const getMe = async (token) => {
  const res = await fetch(`${apiBase}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};
