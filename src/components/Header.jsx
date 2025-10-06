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
  const dateStr = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date());

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="logo" href="/">
            <img className="logo__img" src="/images/Logo.svg" alt="WTWR" />
          </a>
          <div className="header__meta">{dateStr}, {locationName}</div>
        </div>

        <div className="header__right">
          <ToggleSwitch />
          {isAuth ? (
            <>
              <button className="header__action" onClick={onAddItemClick}>+ Add clothes</button>
              <div className="header__user">
                <span className="header__name">{currentUser?.name || "User"}</span>
                {currentUser?.avatar && <img className="header__avatar" src={currentUser.avatar} alt="Avatar" />}
              </div>
              <button className="header__action" onClick={onLogoutClick}>Log Out</button>
            </>
          ) : (
            <>
              <button className="header__action" onClick={onRegisterClick}>Sign Up</button>
              <button className="header__action" onClick={onLoginClick}>Log In</button>
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
