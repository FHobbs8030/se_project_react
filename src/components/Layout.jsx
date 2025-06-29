import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // optional

const Layout = ({ weatherData, clothingItems }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet context={{ weatherData, clothingItems }} />
      </main>
    </>
  );
};

export default Layout;
