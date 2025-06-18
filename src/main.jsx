// main.jsx (router entry point)
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./components/App.jsx";
import Main from "./components/Main.jsx";
import Profile from "./components/Profile.jsx";
import NotFound from "./components/NotFound.jsx";
import "./index.css";

// Mock development data
const mockWeatherData = {
  temperature: 68,
  location: "Carson City",
  isDay: true,
};

const mockClothingItems = [
  { id: 1, name: "Hoodie", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Cap", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Sneakers", imageUrl: "https://via.placeholder.com/150" },
];

const handleCardClick = (item) => {
  console.log("Card clicked:", item);
};

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: (
        <App
          weatherData={mockWeatherData}
          clothingItems={mockClothingItems}
          onCardClick={handleCardClick}
        />
      ),
      children: [
        { index: true, element: <Main /> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: import.meta.env.DEV ? "/" : "/se_project_react",
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
