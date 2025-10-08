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
  locationName,
}) {
  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="logo" href="/">
            <img className="logo__img" src="/images/Logo.svg" alt="WTWR logo" />
          </a>
          <span className="header__meta">{`${dateStr}, ${locationName}`}</span>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          {isAuth ? (
            <>
              <button className="header__add" type="button" onClick={onAddItemClick}>
                + Add Clothes
              </button>
              <div className="header__user">
                <span className="header__name">{currentUser?.name}</span>
                {currentUser?.avatar && (
                  <img className="header__avatar" src={currentUser.avatar} alt={currentUser.name} />
                )}
              </div>
              <button className="header__logout" type="button" onClick={onLogoutClick}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="header__cta" type="button" onClick={onRegisterClick}>
                Sign Up
              </button>
              <button className="header__cta" type="button" onClick={onLoginClick}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuth: PropTypes.bool,
  currentUser: PropTypes.object,
  onAddItemClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  locationName: PropTypes.string,
};
