const base = (import.meta.env.VITE_API_BASE || "http://localhost:3001").replace(/\/$/, "");
export const SIGNIN = `${base}/signin`;
export const SIGNUP = `${base}/signup`;
export const USERS_ME = `${base}/users/me`;
