import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout(props) {
  return (
    <div className="page">
      <Header
        isAuth={props.isAuth}
        currentUser={props.currentUser}
        onAddItemClick={props.onAddItemClick}
        onLoginClick={props.onLoginClick}
        onRegisterClick={props.onRegisterClick}
        onLogoutClick={props.onLogoutClick}
        locationName={props.locationName}
      />
      <main className="content">
        <Outlet context={props.outletContext} />
      </main>
      <Footer />
    </div>
  );
}
