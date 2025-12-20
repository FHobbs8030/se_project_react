import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';

export default function Header({
  currentUser,
  value,
  onToggle,
  onAddClick,
  onLoginClick,
  onRegisterClick,
}) {
  const formattedDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  });

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
              <span className="header__sep">,</span>
              <span className="header__city">Carson City</span>
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

                <Link to="/profile" className="header__user">
                  <span className="header__user-name">{currentUser.name}</span>
                  <span className="header__avatar">
                    <img src={avatarSrc} alt={currentUser.name} />
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
