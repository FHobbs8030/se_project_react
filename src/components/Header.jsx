import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuth,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onAddItemClick,
  currentUser,
  locationName
}) {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric"
  }).format(now);

  return (
    <header className="header">
      <div className="header__outer">
        <div className="header__inner">
          <a className="header__brand" href="/">
            <img className="header__logo" src="/images/Logo.svg" alt="WTWR logo" width="89" height="40" />
          </a>

          <div className="header__meta">
            {formattedDate}, {locationName}
          </div>

          <div className="header__actions">
            <ToggleSwitch />
            {isAuth ? (
              <>
                <button type="button" className="btn btn--ghost" onClick={onAddItemClick}>+ Add clothes</button>
                <div className="header__user">
                  <div className="header__avatar" aria-hidden="true">{currentUser?.name?.[0] || "U"}</div>
                  <span className="header__name">{currentUser?.name || ""}</span>
                </div>
                <button type="button" className="btn btn--ghost" onClick={onLogoutClick}>Log Out</button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn--link" onClick={onRegisterClick}>Sign Up</button>
                <button type="button" className="btn btn--link" onClick={onLoginClick}>Log In</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func,
  onAddItemClick: PropTypes.func,
  currentUser: PropTypes.object,
  locationName: PropTypes.string
};
