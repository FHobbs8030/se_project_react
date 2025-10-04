import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import { getToken } from "../utils/token.js";

export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const hasToken = Boolean(getToken());

  if (!hasToken || !currentUser) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
