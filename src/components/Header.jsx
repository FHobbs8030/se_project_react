import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuth,
  currentUser,
  onAddItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  locationName,
}) {
  const { useCelsius, setUseCelsius } = useContext(CurrentTemperatureUnitContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Link className="logo" to="/">
            <img className="logo__img" src="/images/Logo.svg" alt="WTWR logo" width={89} height={40} />
          </Link>
          <span className="header__dateloc">{dateStr} {locationName}</span>
        </div>

        <div className="header__meta">
          <ToggleSwitch checked={useCelsius} onChange={setUseCelsius} />
          {isAuth ? (
            <>
              <button type="button" onClick={onAddItemClick}>Add Clothes</button>
              <Link to="/profile" className="header__user">
                <img src={currentUser?.avatar || "/images/avatar-default.png"} alt={currentUser?.name || "User"} />
                <span>{currentUser?.name || "Me"}</span>
              </Link>
              <button type="button" onClick={onLogoutClick}>Log Out</button>
            </>
          ) : (
            <>
              <button type="button" onClick={onRegisterClick}>Sign Up</button>
              <button type="button" onClick={onLoginClick}>Log In</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
