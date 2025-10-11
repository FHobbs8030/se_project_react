import PropTypes from 'prop-types';
import ToggleSwitch from './ToggleSwitch.jsx';
import '../blocks/Header.css';

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
  const dateNoComma = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(now);
  const formattedDate = `${dateNoComma},`;

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

          <div className="header__controls">
            <ToggleSwitch />
            {isAuth ? (
              <>
                <button className="header__btn" onClick={onAddItemClick}>
                  Add Clothes
                </button>
                <button className="header__btn" onClick={onLogoutClick}>
                  Logout
                </button>
                {currentUser?.name && (
                  <span className="header__user">{currentUser.name}</span>
                )}
              </>
            ) : (
              <>
                <button className="header__btn" onClick={onRegisterClick}>
                  Sign Up
                </button>
                <button className="header__btn" onClick={onLoginClick}>
                  Log In
                </button>
              </>
            )}
          </div>
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
