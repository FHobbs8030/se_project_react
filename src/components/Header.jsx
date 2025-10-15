import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

function initials(name) {
  if (!name) return "";
  const parts = String(name).trim().split(/\s+/);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

export default function Header({
  isAuth,
  currentUser,
  onAddItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  locationName,
  tempUnit,
  onTempUnitChange,
}) {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  const name = currentUser?.name || "";
  const avatar = currentUser?.avatar || "";

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

          <div className="header__meta">
            {formattedDate}, {locationName}
          </div>

          <div className="header__spacer" />

          <ToggleSwitch value={tempUnit} onChange={onTempUnitChange} />

          {isAuth ? (
            <>
              <button className="header__add" type="button" onClick={onAddItemClick}>
                + Add clothes
              </button>
              <div className="header__user">
                {avatar ? (
                  <img className="header__avatar" src={avatar} alt={name || "User"} />
                ) : (
                  <div className="header__avatar header__avatar_initials">
                    {initials(name)}
                  </div>
                )}
                <span className="header__name">{name}</span>
              </div>
              <button className="header__logout" type="button" onClick={onLogoutClick}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="header__login" type="button" onClick={onLoginClick}>
                Log In
              </button>
              <button className="header__register" type="button" onClick={onRegisterClick}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
