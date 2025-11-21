// src/components/Header.jsx
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';
export default function Header({
  currentUser: currentUserProp,
  value,
  onToggle,
  onLoginClick,
  onRegisterClick,
  onAddClick,
}) {
  const { pathname } = useLocation();
  const outlet = useOutletContext() || {};
  const currentUser = currentUserProp ?? outlet.currentUser ?? null;

  const formattedDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  });

  const weatherCity =
    outlet?.weather?.city ??
    outlet?.weather?.name ??
    outlet?.weatherData?.city ??
    outlet?.weatherData?.name ??
    '';

  const guestCity = import.meta.env.VITE_LOCATION_NAME || 'New York';

  const userCity =
    (typeof currentUser?.city === 'string' && currentUser.city) ||
    (typeof currentUser?.location === 'string' && currentUser.location) ||
    currentUser?.location?.city ||
    currentUser?.address?.city ||
    '';

  const showGuestCity =
    !currentUser && (pathname === '/signin' || pathname === '/signup');

  const displayCity =
    userCity || weatherCity || (showGuestCity ? guestCity : guestCity);

  const avatarSrc =
    currentUser?.avatar || currentUser?.avatarUrl || '/images/Avatar.png';

  return (
    <header className="header">
      <div className="header__outer">
        <div className="header__inner">
          <div className="header__left">
            <Link className="header__brand" to="/" aria-label="WTWR home">
              <img
                className="header__logo"
                src="/images/Logo.svg"
                alt="WTWR"
                width="89"
                height="40"
              />
            </Link>
            <div className="header__meta">
              <span className="header__date">{formattedDate}</span>
              {displayCity ? <span className="header__sep">,</span> : null}
              {displayCity ? (
                <span className="header__city">{displayCity}</span>
              ) : null}
            </div>
          </div>

          <div className="header__actions">
            <ToggleSwitch value={value} onToggle={onToggle} />
            {currentUser ? (
              <>
                <button
                  type="button"
                  className="header__add-btn"
                  onClick={onAddClick}
                >
                  + Add clothes
                </button>

                <Link
                  to="/profile"
                  className="header__user"
                  aria-label="Open profile"
                >
                  <span className="header__user-name">
                    {currentUser.name || 'User'}
                  </span>
                  <span className="header__avatar">
                    <img src={avatarSrc} alt={currentUser?.name || 'User'} />
                  </span>
                </Link>
              </>
            ) : (
              <div className="header__auth">
                <button
                  type="button"
                  className="header__btn header__btn--white"
                  onClick={onRegisterClick}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="header__btn header__btn--white"
                  onClick={onLoginClick}
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
