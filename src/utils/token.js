const KEY = "jwt";

export function getToken() {
  return localStorage.getItem(KEY);
}

export function setToken(token) {
  localStorage.setItem(KEY, token);
}

export function removeToken() {
  localStorage.removeItem(KEY);
}
