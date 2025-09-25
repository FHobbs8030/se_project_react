import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';
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
          <img
            className="header__logo"
            src="/images/Logo.svg"
            alt="WTWR Logo"
          />
        </Link>
        <p className="header__date-location">{currentDate}, Carson City</p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-button" onClick={onAddClick}>
          + Add Clothes
        </button>
        <Link to="/profile" className="header__user-info">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            className="header__user-avatar"
            src="/images/Avatar.png"
            alt="User Avatar"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
