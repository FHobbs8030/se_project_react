import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import { getMe } from "../utils/authApi.js";
import { getClothingItems } from "../utils/itemsApi.js";
import { fetchWeather } from "../utils/weatherApi.js";
import { getToken, removeToken } from "../utils/token.js";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setCurrentUser(null);
      setAuthReady(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe(token);
        if (!cancelled) {
          setCurrentUser(me);
          setAuthReady(true);
        }
      } catch {
        removeToken();
        if (!cancelled) {
          setCurrentUser(null);
          setAuthReady(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!authReady) return;
    const token = getToken();
    if (!token) return;
    let cancelled = false;
    setIsLoadingItems(true);
    getClothingItems(token)
      .then((items) => { if (!cancelled) setClothingItems(items); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIsLoadingItems(false); });
    return () => { cancelled = true; };
  }, [authReady]);

  useEffect(() => {
    const coords = (import.meta.env.VITE_DEFAULT_COORDS || "").split(",");
    const lat = Number(coords[0]);
    const lon = Number(coords[1]);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
    if (!apiKey || !apiUrl || Number.isNaN(lat) || Number.isNaN(lon)) return;
    let cancelled = false;
    setIsLoadingWeather(true);
    fetchWeather({ apiUrl, apiKey, lat, lon, units: "imperial" })
      .then((wx) => { if (!cancelled) setWeatherData(wx); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIsLoadingWeather(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    setAuthReady(false);
    setClothingItems([]);
  };

  const handleSignin = async () => { setIsLoginOpen(false); };
  const handleSignup = async () => { setIsRegisterOpen(false); };
  const handleAddItem = async () => { setIsAddItemOpen(false); };

  return (
    <div className="app">
      <Header
        isAuthed={!!currentUser}
        currentUser={currentUser}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogoutClick={handleSignOut}
        onAddItemClick={() => setIsAddItemOpen(true)}
      />

      <Outlet
        context={{
          currentUser,
          authReady,
          clothingItems,
          isLoadingItems,
          setClothingItems,
          weatherData,
          isLoadingWeather,
        }}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={!!currentUser}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleSignin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={handleSignup}
      />
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
