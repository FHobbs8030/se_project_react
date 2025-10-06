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
}) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="logo" href="/">
            <img className="logo__img" src="/images/Logo.svg" alt="WTWR logo" />
          </a>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          {isAuth ? (
            <>
              <button
                type="button"
                className="header__action"
                onClick={onAddItemClick}
              >
                + Add clothes
              </button>
              <span className="header__user">{currentUser?.name}</span>
              {currentUser?.avatar && (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt={`${currentUser?.name || "User"} avatar`}
                  width={40}
                  height={40}
                />
              )}
              <button
                type="button"
                className="header__action"
                onClick={onLogoutClick}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__action"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
              <button
                type="button"
                className="header__action"
                onClick={onLoginClick}
              >
                Log in
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
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onAddItemClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
};
