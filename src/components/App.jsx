import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import { getMe, signin, signup, signout } from "../utils/authApi.js";
import { getClothingItems } from "../utils/clothingApi.js";

function Shell({ outletContext, headerProps }) {
  return (
    <>
      <Header {...headerProps} />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tempUnit, setTempUnit] = useState("F");
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe();
        if (!cancelled) setCurrentUser(me);
      } catch (e) {
        if (e?.status !== 401) console.warn("getMe failed", e);
      } finally {
        if (!cancelled) setIsLoadingUser(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      let changed = false;
      const next = new URLSearchParams(searchParams);
      if (searchParams.get("login") === "1") {
        setLoginOpen(true);
        next.delete("login");
        changed = true;
      }
      if (searchParams.get("register") === "1") {
        setRegisterOpen(true);
        next.delete("register");
        changed = true;
      }
      if (changed) setSearchParams(next, { replace: true });
    }
  }, [isLoadingUser, currentUser, searchParams, setSearchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!currentUser) {
        setClothingItems([]);
        return;
      }
      try {
        const items = await getClothingItems();
        if (!cancelled) setClothingItems(items || []);
      } catch (e) {
        console.warn("getClothingItems failed", e);
        if (!cancelled) setClothingItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const coords = (import.meta.env.VITE_DEFAULT_COORDS || "39.1638,-119.767").split(",");
        const [lat, lon] = [parseFloat(coords[0]), parseFloat(coords[1])];
        const url = `${import.meta.env.VITE_WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${
          tempUnit === "C" ? "metric" : "imperial"
        }&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        const res = await fetch(url, { credentials: "omit" });
        const raw = await res.json();
        const rawTemp =
          typeof raw?.main?.temp === "number"
            ? raw.main.temp
            : typeof raw?.temp === "number"
            ? raw.temp
            : null;
        const temp = rawTemp != null ? Math.round(rawTemp) : null;
        const type =
          temp == null
            ? null
            : tempUnit === "C"
            ? temp <= 6
              ? "cold"
              : temp <= 18
              ? "warm"
              : "hot"
            : temp <= 44
            ? "cold"
            : temp <= 64
            ? "warm"
            : "hot";
        if (!cancelled) setWeatherData({ temp, type });
      } catch (e) {
        console.warn("getWeather failed", e);
        if (!cancelled) setWeatherData({ temp: null, type: null });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tempUnit]);

  async function handleLogin({ email, password }) {
    const user = await signin({ email, password });
    setCurrentUser(user);
    setLoginOpen(false);
  }

  async function handleRegister({ name, email, password }) {
    await signup({ name, email, password });
    const user = await signin({ email, password });
    setCurrentUser(user);
    setRegisterOpen(false);
  }

  async function handleLogout() {
    try {
      await signout();
    } catch (e) {
      console.warn("signout failed", e);
    }
    setCurrentUser(null);
    setClothingItems([]);
  }

  const headerProps = {
    onLoginClick: () => setLoginOpen(true),
    onRegisterClick: () => setRegisterOpen(true),
    onLogoutClick: handleLogout,
    isLoadingUser,
  };

  const outletContext = { clothingItems, weatherData };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ unit: tempUnit, setUnit: setTempUnit }}>
        <Routes>
          <Route element={<Shell outletContext={outletContext} headerProps={headerProps} />}>
            <Route path="/" element={<Main />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          onRegister={handleRegister}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
