import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ outletContext }) {
  return (
    <div className="page">
      <Header
        currentUser={outletContext.currentUser}
        currentTemperatureUnit={outletContext.currentTemperatureUnit}
        setCurrentTemperatureUnit={outletContext.setCurrentTemperatureUnit}
        onAddClick={outletContext.onAddClick}
        onLoginClick={outletContext.onLoginClick}
        onRegisterClick={outletContext.onRegisterClick}
      />

      <main className="content">
        <Outlet context={outletContext} />
      </main>

      <Footer />
    </div>
  );
}
