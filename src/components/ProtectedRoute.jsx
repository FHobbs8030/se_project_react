import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contextStore/CurrentUserContext";

export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const hasToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem("jwt"));

  if (!hasToken || !currentUser) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
