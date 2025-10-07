import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuth, redirectTo = "/" }) {
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

