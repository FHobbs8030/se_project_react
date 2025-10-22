import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

export default function Header({
  isAuth,
  onLoginClick,
  onRegisterClick,
  onAddItemClick,
  currentUser,
  locationName
}) {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric"
  }).format(now);

  const initial = (currentUser?.name || "U").charAt(0).toUpperCase();
  const avatarUrl = currentUser?.avatar || "";
  const navigate = useNavigate();
  const openProfile = () => navigate("/profile");

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

          <div className="header__actions">
            <ToggleSwitch />
            {isAuth ? (
              <>
                <button
                  type="button"
                  className="btn btn--link"
                  onClick={onAddItemClick}
                >
                  <span className="plus">+</span>
                  <span>Add clothes</span>
                </button>
                <button
                  type="button"
                  className="header__user"
                  onClick={openProfile}
                  aria-label="Open profile"
                >
                  <span className="header__name">{currentUser?.name || ""}</span>
                  <div className="header__avatar" aria-hidden="true">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={currentUser?.name || "Avatar"} />
                    ) : (
                      initial
                    )}
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn--link"
                  onClick={onRegisterClick}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn--link"
                  onClick={onLoginClick}
                >
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
  isAuth: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onAddItemClick: PropTypes.func,
  currentUser: PropTypes.object,
  locationName: PropTypes.string
};
