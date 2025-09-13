import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './components/App.jsx';
import Main from './components/Main.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import RequireAuth from './components/RequireAuth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
