import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuth,
  currentUser,
  onAddItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  unit,
  onToggleUnit,
}) {
  const displayName = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || "/images/avatar-default.png";

  return (
    <header className="header">
      <div className="header__inner">
        <a className="logo" href="/">
          <img className="logo__img" src="/images/Logo.svg" alt="WTWR logo" />
        </a>

        <div className="header__right">
          <div className="header__temp-toggle">
            <span className={`header__unit ${unit === "F" ? "active" : ""}`}>°F</span>
            <ToggleSwitch checked={unit === "C"} onChange={onToggleUnit} />
            <span className={`header__unit ${unit === "C" ? "active" : ""}`}>°C</span>
          </div>

          {isAuth ? (
            <div className="header__authed">
              <button className="button button_primary" onClick={onAddItemClick}>Add clothes</button>
              <div className="header__user">
                <img className="header__avatar" src={avatar} alt={displayName} />
                <span className="header__name">{displayName}</span>
                <button className="button button_link" onClick={onLogoutClick}>Log out</button>
              </div>
            </div>
          ) : (
            <div className="header__guest">
              <button className="button button_link" onClick={onRegisterClick}>Sign Up</button>
              <button className="button button_primary" onClick={onLoginClick}>Log In</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  onAddItemClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  unit: PropTypes.oneOf(["F", "C"]).isRequired,
  onToggleUnit: PropTypes.func.isRequired,
};
