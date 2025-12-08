import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({
  outletContext,
  onAddClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  return (
    <div className="page">
      <Header
        currentUser={outletContext?.currentUser || null}
        value={outletContext?.currentTemperatureUnit}
        onToggle={outletContext?.setCurrentTemperatureUnit}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        onAddClick={onAddClick}
      />

      <main className="content">
        <Outlet context={outletContext} />
      </main>

      <Footer />
    </div>
  );
}
