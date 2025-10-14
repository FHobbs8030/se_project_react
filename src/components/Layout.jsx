import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({
  isAuth,
  currentUser,
  clothingItems,
  onCardClick,
  onDeleteClick,
  isLoadingItems,
  onAddItemClick,
  onLogoutClick,
  locationName,
  tempUnit,
  onTempUnitChange,
}) {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/signup");

  const outletCtx = {
    currentUser,
    clothingItems,
    onCardClick,
    onDeleteClick,
    isLoadingItems,
  };

  return (
    <>
      <Header
        isAuth={isAuth}
        currentUser={currentUser}
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
