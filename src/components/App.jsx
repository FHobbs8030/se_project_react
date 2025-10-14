import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import RequireAuth from "./RequireAuth.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import { WeatherContext } from "../contexts/WeatherContext.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const isAuth = Boolean(currentUser);

  const [tempUnit, setTempUnit] = useState(localStorage.getItem("wtwr:unit") || "F");
  useEffect(() => {
    localStorage.setItem("wtwr:unit", tempUnit);
  }, [tempUnit]);

  const [weatherData, setWeatherData] = useState(null);

  const tempCtx = useMemo(() => ({ tempUnit, setTempUnit }), [tempUnit]);
  const userCtx = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  const weatherCtx = useMemo(
    () => ({ weatherData, setWeatherData, tempUnit }),
    [weatherData, tempUnit]
  );

  const locationName = import.meta.env.VITE_LOCATION_NAME || "New York";

  const base = (import.meta.env.VITE_API_BASE || "http://localhost:3001").replace(/\/$/, "");
  const api = (p) => `${base}${p.startsWith("/") ? p : `/${p}`}`;
  const SIGNIN = api("/signin");
  const SIGNUP = api("/signup");
  const USERS_ME = api("/users/me");

  const [clothingItems] = useState([]);
  const [isLoadingItems] = useState(false);

  const handleCardClick = () => {};
  const handleDeleteClick = () => {};
  const handleAddItemClick = () => {};
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  const handleLogin = async ({ email, password }) => {
    const res = await fetch(SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const { token } = await res.json();
    localStorage.setItem("jwt", token);
    const meRes = await fetch(USERS_ME, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!meRes.ok) throw new Error("Failed to load profile");
    const me = await meRes.json();
    setCurrentUser(me);
  };

  const handleSignup = async ({ name, avatar, email, password }) => {
    const res = await fetch(SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatar, email, password }),
    });
    if (!res.ok) throw new Error("Signup failed");
    await handleLogin({ email, password });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setBooting(false);
      return;
    }
    (async () => {
      try {
        const meRes = await fetch(USERS_ME, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!meRes.ok) throw new Error("Invalid token");
        const me = await meRes.json();
        setCurrentUser(me);
      } catch {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      } finally {
        setBooting(false);
      }
    })();
  }, [USERS_ME]);

  if (booting) return <main className="content">Loading…</main>;

  return (
    <CurrentTemperatureUnitContext.Provider value={tempCtx}>
      <CurrentUserContext.Provider value={userCtx}>
        <WeatherContext.Provider value={weatherCtx}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  isAuth={isAuth}
                  currentUser={currentUser}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onDeleteClick={handleDeleteClick}
                  isLoadingItems={isLoadingItems}
                  onAddItemClick={handleAddItemClick}
                  onLogoutClick={handleLogout}
                  locationName={locationName}
                  tempUnit={tempUnit}
                  onTempUnitChange={setTempUnit}
                />
              }
            >
              <Route index element={<Main />} />
              <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="signup" element={<SignupPage onSignup={handleSignup} />} />
              <Route
                path="profile"
                element={
                  <RequireAuth isAuth={isAuth}>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Main />} />
            </Route>
          </Routes>
        </WeatherContext.Provider>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}
