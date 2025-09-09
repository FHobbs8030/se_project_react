import { Outlet } from "react-router-dom";
import Header from "./Header"; 

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


