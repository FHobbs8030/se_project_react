import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuth,
  currentUser,
  onAddItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  locationName
}) {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(now);

  const displayName = currentUser?.name || "Terrence";
  const avatarSrc = currentUser?.avatar || "/images/avatar-default.png";

  return (
    <header className="header">
      <div className="header__outer">
        <div className="header__inner">
          <div className="header__brand">
            <a href="/" className="header__brandLink">
              <img
                className="header__logo"
                src="/images/Logo.svg"
                alt="WTWR logo"
                width="89"
                height="40"
              />
            </a>
            <div className="header__meta">{date}, {locationName}</div>
          </div>

          <div className="header__right">
            <ToggleSwitch />
            {isAuth ? (
              <>
                <button type="button" className="header__btn" onClick={onAddItemClick}>
                  + Add clothes
                </button>
                <div className="header__user">
                  <span className="header__name">{displayName}</span>
                  <img
                    className="header__avatar"
                    src={avatarSrc}
                    alt={`${displayName} avatar`}
                    width="40"
                    height="40"
                  />
                </div>
                <button type="button" className="header__btn header__btn_logout" onClick={onLogoutClick}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button type="button" className="header__btn" onClick={onRegisterClick}>
                  Sign Up
                </button>
                <button type="button" className="header__btn" onClick={onLoginClick}>
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
