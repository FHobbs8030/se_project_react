import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({
  outletContext,
  onAddClick,
  onLoginClick,
  onRegisterClick
}) {
  return (
    <>
      <Header
        isAuth={!!outletContext?.currentUser}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onAddItemClick={onAddClick}
        onAddItemOpen={onAddClick}
        currentUser={outletContext?.currentUser}
        locationName={outletContext?.weatherData?.locationName}
        tempUnit={outletContext?.tempUnit}
        onToggleUnit={outletContext?.setTempUnit}
      />
      <Outlet context={outletContext} />
    </>
  );
}
