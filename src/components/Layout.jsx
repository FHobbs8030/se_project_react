import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout({ outletContext }) {
  const {
    currentUser,
    onLoginClick,
    onRegisterClick,
    onAddItemOpen,
    tempUnit,
    onToggleUnit,
  } = outletContext;

  return (
    <div className="page">
      <div className="container">
        <Header
          currentUser={currentUser}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          onAddItemOpen={onAddItemOpen}
          tempUnit={tempUnit}
          onToggleUnit={onToggleUnit}
        />
      </div>
      <main className="container">
        <Outlet context={outletContext} />
      </main>
    </div>
  );
}
