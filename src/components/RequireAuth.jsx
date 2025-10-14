import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ isAuth, children }) {
  const location = useLocation();
  if (!isAuth) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
