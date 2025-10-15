import { useContext, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

export default function Layout({
  isAuth,
  currentUser,
  setCurrentUser,
  onAddItemClick,
  onLogoutClick,
  locationName,
  tempUnit,
  onTempUnitChange,
  weatherData,
  clothingItems,
  onCardClick,
  onLike,
  onDelete,
  isLoadingWeather,
  isLoadingItems,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const userCtx = useContext(CurrentUserContext) || {};

  const outletCtx = useMemo(
    () => ({
      currentUser: userCtx.currentUser ?? currentUser,
      setCurrentUser: userCtx.setCurrentUser ?? setCurrentUser,
      weatherData,
      clothingItems,
      onCardClick,
      onLike,
      onDelete,
      isLoadingWeather,
      isLoadingItems,
    }),
    [
      userCtx.currentUser,
      userCtx.setCurrentUser,
      currentUser,
      setCurrentUser,
      weatherData,
      clothingItems,
      onCardClick,
      onLike,
      onDelete,
      isLoadingWeather,
      isLoadingItems,
    ]
  );

  const handleLoginClick = () =>
    navigate("/login", { state: { background: location } });
  const handleRegisterClick = () =>
    navigate("/signup", { state: { background: location } });

  return (
    <>
      <Header
        isAuth={isAuth}
        currentUser={outletCtx.currentUser}
        onAddItemClick={onAddItemClick}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={onLogoutClick}
        locationName={locationName}
        tempUnit={tempUnit}
        onTempUnitChange={onTempUnitChange}
      />
      <Outlet context={outletCtx} />
    </>
  );
}
