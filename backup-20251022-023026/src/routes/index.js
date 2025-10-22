import { createBrowserRouter } from "react-router-dom";
import App from "../components/App.jsx";
import Main from "../components/Main.jsx";
import Profile from "../components/Profile.jsx";
import NotFound from "../components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;


