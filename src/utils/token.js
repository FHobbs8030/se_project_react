export const getToken = () => localStorage.getItem("jwt");
export const setToken = (t) => localStorage.setItem("jwt", t);
export const removeToken = () => localStorage.removeItem("jwt");

