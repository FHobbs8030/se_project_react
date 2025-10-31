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
        isAuth={!!outletContext?.currentUser}
        onAddItemClick={onAddClick}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        currentUser={outletContext?.currentUser}
        tempUnit={outletContext?.tempUnit}
        onToggleUnit={outletContext?.onToggleUnit}
        locationName={outletContext?.weatherData?.locationName}
      />
      <Outlet context={outletContext} />
    </>
  );
}
