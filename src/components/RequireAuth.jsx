import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const authed = !!localStorage.getItem("jwt");
  return authed ? children : <Navigate to="/signin" replace />;
}
