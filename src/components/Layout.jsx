import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({
  outletContext,
  onAddClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick
}) {
  const locationName =
    outletContext?.weatherData?.name || outletContext?.weatherData?.locationName;

  return (
    <>
      <Header
        isAuth={!!outletContext?.currentUser}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onAddItemClick={onAddClick}
        onLogoutClick={onLogoutClick}
        currentUser={outletContext?.currentUser}
        locationName={locationName}
        tempUnit={outletContext?.tempUnit}
        onToggleUnit={outletContext?.onTempUnitChange}
      />
      <Outlet context={outletContext} />
    </>
  );
}
