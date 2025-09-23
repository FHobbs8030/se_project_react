import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.jsx";
import Main from "./components/Main.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Main /> },
        { path: "signin", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "profile", element: <RequireAuth><Profile /></RequireAuth> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ],
  {
    basename: import.meta.env.DEV ? "/" : "/se_project_react",
    future: { v7_startTransition: true }
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);
