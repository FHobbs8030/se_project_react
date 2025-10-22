import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt");
  const location = useLocation();
  if (!token) return <Navigate to="/" replace state={{ from: location }} />;
  return children;
}
