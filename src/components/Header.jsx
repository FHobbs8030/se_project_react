import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/Logo.svg";
import Avatar from "../images/Avatar.png";
import "../blocks/Header.css";

function Header({ onAddClick, children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={Logo} alt="Logo" className="header__logo" />
        <p className="header__date-location">{currentDate}, Carson City</p>
      </div>
      <div className="header__right">
  {isHomePage && (
    <div className="header__toggle-wrapper">{children}</div>
  )}

  <nav className="header__nav">
    {!isHomePage && <Link to="/">Home</Link>}
    {!isProfilePage && <Link to="/profile">Profile</Link>}
  </nav>

  <button className="header__button" onClick={onAddClick}>
    + Add Clothes
  </button>

  <div className="header__profile">
    <p className="header__username">Terrence Tegegne</p>
    <img src={Avatar} alt="User avatar" className="header__avatar" />
  </div>
</div>
    </header>
  );
}

export default Header;
