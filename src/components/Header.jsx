// src/components/Header.jsx
import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuthed,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onAddItemClick,
}) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="logo" href="/">WTWR</a>
          <ToggleSwitch />
        </div>

        <div className="header__right">
          {isAuthed ? (
            <>
              <button className="header__btn" onClick={onAddItemClick}>
                + Add clothes
              </button>
              <span className="header__user">
                {currentUser?.name || "User"}
              </span>
              <button className="header__auth-btn" onClick={onLogoutClick}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button className="header__auth-btn" onClick={onRegisterClick}>
                Sign up
              </button>
              <button className="header__auth-btn" onClick={onLoginClick}>
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
  isAuthed: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
};
