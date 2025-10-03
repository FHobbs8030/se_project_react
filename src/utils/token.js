const KEY = "wtwr_jwt";

function hasStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const probe = "__wtwr_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch (e) {
    return false;
  }
}

export function getToken() {
  if (!hasStorage()) return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  if (!hasStorage()) return;
  try {
    if (token) window.localStorage.setItem(KEY, token);
    else window.localStorage.removeItem(KEY);
  } catch (e) {
    return;
  }
}

export function removeToken() {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(KEY);
  } catch (e) {
    return;
  }
}
