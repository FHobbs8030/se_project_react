import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuth, isLoggedIn, redirectTo = "/", children }) {
  const ok = !!(typeof isAuth === "boolean" ? isAuth : isLoggedIn);
  if (!ok) return <Navigate to={redirectTo} replace />;
  return children ?? <Outlet />;
}
