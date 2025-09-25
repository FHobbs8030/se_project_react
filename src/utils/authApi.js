import { api } from "./http";

export const signup = (payload) => api("/signup", { method: "POST", body: payload });

export const signin = (email, password) =>
  api("/signin", { method: "POST", body: { email, password } });

export const getMe = () => api("/users/me");

export const signout = () => api("/signout", { method: "POST" });
