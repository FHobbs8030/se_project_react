import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import "../blocks/Header.css";

export default function Header({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onAddItemClick,
  isLoadingUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isAuthed = Boolean(currentUser);

  return (
    <header className="header">
      <div className="header__brand">wtwr</div>

      <div className="header__actions">
        {isLoadingUser ? (
          <span className="header__status" aria-live="polite">Loading…</span>
        ) : isAuthed ? (
          <>
            <button
              className="header__btn"
              type="button"
              onClick={onAddItemClick}
            >
              + Add clothes
            </button>

            <div className="header__user">
              <Link to="/profile" className="header__link" aria-label="Profile">
                <span className="header__avatar" aria-hidden />
                <span className="header__name">
                  {currentUser?.name || "User"}
                </span>
              </Link>

              <button
                className="header__link"
                type="button"
                onClick={onLogoutClick}
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="header__link"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__btn"
              type="button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
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
