import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({
  outletContext,
  onAddClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  return (
    <>
      <Header
        onAddClick={onAddClick}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        currentUser={outletContext?.currentUser}
        tempUnit={outletContext?.tempUnit}
        setTempUnit={outletContext?.setTempUnit}
        locationName={outletContext?.weatherData?.locationName}
      />
      <Outlet context={outletContext} />
    </>
  );
}
