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
          <a className="header__logo" href="/">WTWR</a>
        </div>

        <div className="header__right">
          <ToggleSwitch />
          {isAuthed ? (
            <>
              <button type="button" className="header__button" onClick={onAddItemClick}>
                + Add clothes
              </button>
              <span className="header__name">{currentUser?.name}</span>
              <div className="header__avatar" aria-hidden="true">
                {(currentUser?.name || "U").slice(0, 1)}
              </div>
              <button type="button" className="header__button" onClick={onLogoutClick}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button type="button" className="header__button" onClick={onRegisterClick}>
                Sign up
              </button>
              <button type="button" className="header__button" onClick={onLoginClick}>
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
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
};
