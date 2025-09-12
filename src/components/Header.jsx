import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';
import '../blocks/Header.css';

function Header({ onAddClick, onLogout, locationText }) {
  const currentUser = useContext(CurrentUserContext);
  const isAuthed = !!currentUser;
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  const displayName =
    currentUser?.fullName ||
    currentUser?.name ||
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(' ') ||
    'User';

  const avatarSrc =
    currentUser?.avatar ||
    currentUser?.avatarUrl ||
    currentUser?.picture ||
    currentUser?.profile?.avatar ||
    '/images/default-avatar.png';

  const initial = (displayName?.trim?.()[0] || 'U').toUpperCase();
  const fallbackSvg =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
         <rect width="100%" height="100%" rx="20" fill="#111"/>
         <text x="50%" y="54%" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial">${initial}</text>
       </svg>`
    );

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src="/images/Logo.svg" alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}
          {locationText ? `, ${locationText}` : ''}
        </p>
      </div>

      <div className="header__right">
        {isAuthed ? (
          <>
            <ToggleSwitch />
            <button className="header__add-button" onClick={onAddClick}>+ Add Clothes</button>
            <Link to="/profile" className="header__user-info">
              <p className="header__user-name">{displayName}</p>
              <img
                src={avatarSrc}
                alt={`${displayName} avatar`}
                className="header__user-avatar"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackSvg;
                }}
              />
            </Link>
            <button className="header__logout-button" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link className="header__link-button" to="/signin">Sign in</Link>
            <Link className="header__link-button" to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
