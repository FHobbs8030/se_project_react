// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isAuth, redirectTo = "/signin", children }) {
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  return children ?? <Outlet />;
}
