import { Link, useNavigate } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch.jsx';
import '../blocks/Header.css';

function Header({ onAddClick, onLogout }) {
  const navigate = useNavigate();
  const authed = !!localStorage.getItem('jwt');
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    onLogout?.();
    navigate('/signin', { replace: true });
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src="/images/Logo.svg" alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">{currentDate}, Carson City</p>
      </div>

      <div className="header__right">
        {authed ? (
          <>
            <ToggleSwitch />
            <button className="header__add-button" onClick={onAddClick}>+ Add Clothes</button>
            <Link to="/profile" className="header__user-info">
              <p className="header__user-name">Terrence Tegegne</p>
              <img src="/images/Avatar.png" alt="User Avatar" className="header__user-avatar" />
            </Link>
            <button className="header__logout-button" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="header__link-button" onClick={() => navigate('/signin')}>Sign in</button>
            <button className="header__link-button" onClick={() => navigate('/signup')}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
