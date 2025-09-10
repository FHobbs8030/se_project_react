import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import App from './components/App.jsx';
import Main from './components/Main.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

export function RequireAuth() {
  const authed = !!localStorage.getItem('jwt');
  return authed ? <Outlet /> : <Navigate to="/signin" replace />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              localStorage.getItem('jwt') ? <Main /> : <Navigate to="/signin" replace />
            }
          />
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
