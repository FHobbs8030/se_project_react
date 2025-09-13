import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const authed = !!localStorage.getItem('jwt');
  return authed ? <Outlet /> : <Navigate to="/signin" replace />;
}
