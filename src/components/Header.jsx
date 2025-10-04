import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import "../blocks/Header.css";

export default function Header({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onAddItemClick,
  isLoadingUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { unit, setUnit } = useContext(CurrentTemperatureUnitContext);
  const isAuthed = Boolean(currentUser);
  const initials =
    (currentUser?.name || "")
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__brand">WTWR</Link>
      </div>

      <div className="header__right">
        <div className="header__unit" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            aria-pressed={unit === "F"}
            onClick={() => setUnit("F")}
            className={unit === "F" ? "unit unit--active" : "unit"}
            title="Show Fahrenheit"
          >
            °F
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            aria-pressed={unit === "C"}
            onClick={() => setUnit("C")}
            className={unit === "C" ? "unit unit--active" : "unit"}
            title="Show Celsius"
          >
            °C
          </button>
        </div>

        {isAuthed ? (
          <div className="header__auth">
            <button type="button" className="header__btn" onClick={onAddItemClick}>
              Add clothes
            </button>
            <Link to="/profile" className="header__profile">
              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt={currentUser.name || "Profile"}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="header__avatar header__avatar--fallback" aria-hidden="true">
                  {initials}
                </div>
              )}
              <span className="header__name">{currentUser?.name || "Profile"}</span>
            </Link>
            <button
              type="button"
              className="header__btn header__btn--logout"
              onClick={onLogoutClick}
              disabled={isLoadingUser}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="header__auth">
            <button
              type="button"
              className="header__btn"
              onClick={onRegisterClick}
              disabled={isLoadingUser}
            >
              Sign up
            </button>
            <button
              type="button"
              className="header__btn"
              onClick={onLoginClick}
              disabled={isLoadingUser}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool,
};
