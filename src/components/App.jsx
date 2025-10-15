import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main.jsx";
import Layout from "./Layout.jsx";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import RequireAuth from "./RequireAuth.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import { WeatherContext } from "../contexts/WeatherContext.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const isAuth = Boolean(currentUser);

  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem("wtwr:unit") || "F"
  );
  useEffect(() => {
    localStorage.setItem("wtwr:unit", tempUnit);
  }, [tempUnit]);

  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems] = useState([]);       // setter unused (for now)
  const [isLoadingItems] = useState(false);   // setter unused (for now)

  const userCtx = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser]
  );
  const weatherCtx = useMemo(
    () => ({ weatherData, setWeatherData, tempUnit }),
    [weatherData, tempUnit]
  );
  const tempCtx = useMemo(() => ({ tempUnit, setTempUnit }), [tempUnit]);

  const locationName = import.meta.env.VITE_LOCATION_NAME || "New York";

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
                  onCardClick={() => {}}
                  onDeleteClick={() => {}}
                  isLoadingItems={isLoadingItems}
                  onAddItemClick={() => {}}
                  onLogoutClick={() => {
                    localStorage.removeItem("jwt");
                    setCurrentUser(null);
                  }}
                  locationName={locationName}
                  tempUnit={tempUnit}
                  onTempUnitChange={setTempUnit}
                />
              }
            >
              <Route index element={<Main />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </WeatherContext.Provider>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}
