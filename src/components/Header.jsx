import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { WeatherContext } from "../contextStore/WeatherContext.js";
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
  const { tempF, tempC } = useContext(WeatherContext);
  const { useCelsius, setUseCelsius } = useContext(CurrentTemperatureUnitContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  const temp = useCelsius ? `${tempC ?? "–"}°C` : `${tempF ?? "–"}°F`;

  return (
    <header className="header">
      <div
        className="header__inner"
        style={{ maxWidth: 1360, margin: "0 auto", height: 40, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Link className="logo" to="/">
          <img className="logo__img" src="/images/Logo.svg" alt="WTWR logo" />
        </Link>

        <nav className="header__nav" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <NavLink to="/" className="header__link">Home</NavLink>
          {isAuth && <NavLink to="/profile" className="header__link">Profile</NavLink>}
        </nav>

        <div className="header__meta" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span>{dateStr}</span>
          <span>{locationName}</span>
          <span>{temp}</span>

          <ToggleSwitch checked={useCelsius} onChange={setUseCelsius} />

          {isAuth ? (
            <>
              <button type="button" onClick={onAddItemClick}>Add Clothes</button>
              <Link to="/profile" className="header__user" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src={currentUser?.avatar || "/images/avatar-default.png"}
                  alt={currentUser?.name || "User"}
                  style={{ width: 28, height: 28, borderRadius: "50%" }}
                />
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
