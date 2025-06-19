import React from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';
import Logo from '../images/Logo.svg';
import Avatar from '../images/Avatar.png';
import '../blocks/Header.css';

function Header({ onAddClick }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={Logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">{currentDate}, Carson City</p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {/* Removed nav links */}

        <button className="header__add-button" onClick={onAddClick}>
          + Add Clothes
        </button>

        <Link to="/profile" className="header__user-info">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            src={Avatar}
            alt="User Avatar"
            className="header__user-avatar"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
