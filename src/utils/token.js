const KEY = "jwt";
export const setToken = (t) => localStorage.setItem(KEY, t);
export const getToken = () => localStorage.getItem(KEY);
export const removeToken = () => localStorage.removeItem(KEY);
