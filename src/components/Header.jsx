import { useContext } from "react";
import PropTypes from "prop-types";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import "../blocks/Header.css";
export default function Header({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoadingUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isAuthed = Boolean(currentUser);

  return (
    <header className="header">
      <div className="header__brand">wtwr</div>

      <div className="header__actions">
        {isLoadingUser ? (
          <span className="header__status">Loading…</span>
        ) : isAuthed ? (
          <>
            <button className="header__btn" type="button">
              + Add Clothes
            </button>
            <div className="header__user">
              <span className="header__avatar" aria-hidden />
              <span className="header__name">{currentUser?.name || "User"}</span>
              <button className="header__link" type="button" onClick={onLogoutClick}>
                Log out
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="header__link" type="button" onClick={onRegisterClick}>
              Sign up
            </button>
            <button className="header__btn" type="button" onClick={onLoginClick}>
              Log in
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
  isLoadingUser: PropTypes.bool,
};
