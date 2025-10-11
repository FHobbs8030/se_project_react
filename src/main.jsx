// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.jsx";
import Main from "./components/Main.jsx";
import Profile from "./components/Profile.jsx";
import NotFound from "./components/NotFound.jsx";
// If you have a ProtectedRoute component, uncomment the next line:
// import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Main /> },
        // If using ProtectedRoute, wrap Profile like:
        // { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
