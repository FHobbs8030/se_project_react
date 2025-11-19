import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({
  outletContext,
  onAddClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  return (
    <div className="app-frame">
      <Header
        currentUser={outletContext?.currentUser || null}
        value={outletContext?.currentTemperatureUnit}
        onToggle={outletContext?.setCurrentTemperatureUnit}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        onAddClick={onAddClick}
      />
      <main>
        <Outlet context={outletContext} />
      </main>
    </div>
  );
}

