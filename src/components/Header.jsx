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
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);

  return (
    <header className="header">
      <div className="header__outer">
        <div className="header__inner">
          <a className="header__brand" href="/">
            <img
              className="header__logo"
              src="/images/Logo.svg"
              alt="WTWR logo"
              width="89"
              height="40"
            />
          </a>

          <div className="header__meta" aria-label="date and location">
            {formattedDate} {locationName}
          </div>

          <div className="header__spacer" />

          <ToggleSwitch />

          {isAuth ? (
            <div className="header__auth">
              <button
                type="button"
                className="header__btn header__btn_add"
                onClick={onAddItemClick}
              >
                + Add clothes
              </button>
              <div className="header__user">
                <span className="header__username">
                  {currentUser?.name || "User"}
                </span>
                {currentUser?.avatar ? (
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt="User avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar_placeholder" />
                )}
              </div>
              <button
                type="button"
                className="header__btn header__btn_out"
                onClick={onLogoutClick}
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
              >
                Sign up
              </button>
              <button
                type="button"
                className="header__btn"
                onClick={onLoginClick}
              >
                Log in
              </button>
            </div>
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

Header.defaultProps = {
  isAuth: false,
  currentUser: null,
  onAddItemClick: () => {},
  onLoginClick: () => {},
  onRegisterClick: () => {},
  onLogoutClick: () => {},
  locationName: "New York",
};
