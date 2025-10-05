import { checkResponse } from "./apiUtils";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signUp = (payload) =>
  fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(checkResponse);

export const signIn = ({ email, password }) =>
  fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export const getMe = (token) =>
  fetch(`${API_BASE}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const signup = signUp;
export const signin = signIn;
