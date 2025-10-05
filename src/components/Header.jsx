// src/components/Header.jsx
import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch.jsx";
// src/components/Header.jsx
import "../blocks/ToggleSwitch.css";


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
      <a className="logo" href="/">WTWR</a>

      <div className="header__right">
        <ToggleSwitch /* value + onChange wired to your context */ />

        {isAuthed ? (
          <>
            <button type="button" onClick={onAddItemClick}>+ Add clothes</button>
            <span className="header__user">{currentUser?.name}</span>
            <button type="button" onClick={onLogoutClick}>Log out</button>
          </>
        ) : (
          <>
            <button type="button" onClick={onRegisterClick}>Sign up</button>
            <button type="button" onClick={onLoginClick}>Log in</button>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuthed: PropTypes.bool,
  currentUser: PropTypes.object,
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  onAddItemClick: PropTypes.func,
};

Header.defaultProps = {
  isAuthed: false,
  currentUser: null,
  onLoginClick: () => {},
  onRegisterClick: () => {},
  onLogoutClick: () => {},
  onAddItemClick: () => {},
};
