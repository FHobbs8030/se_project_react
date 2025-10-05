import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import { signIn, signUp, getMe } from "../utils/authApi.js";
import { getClothingItems } from "../utils/itemsApi.js";
import { fetchWeather } from "../utils/weatherApi.js";
import { getToken, setToken, removeToken } from "../utils/token.js";

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
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    let cancelled = false;
    setIsLoadingItems(true);
    (async () => {
      try {
        const [me, items] = await Promise.all([getMe(token), getClothingItems(token)]);
        if (!cancelled) {
          setCurrentUser(me);
          setClothingItems(items);
          setAuthReady(true);
        }
      } catch {
        removeToken();
        if (!cancelled) {
          setCurrentUser(null);
          setClothingItems([]);
          setAuthReady(false);
        }
      } finally {
        if (!cancelled) setIsLoadingItems(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      .then((wx) => {
        if (!cancelled) setWeatherData(wx);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoadingWeather(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignin = async (creds) => {
    setAuthError("");
    setIsLoadingItems(true);
    try {
      const { token } = await signIn(creds);
      setToken(token);
      setIsLoginOpen(false);
      const [me, items] = await Promise.all([getMe(token), getClothingItems(token)]);
      setCurrentUser(me);
      setClothingItems(items);
      setAuthReady(true);
    } catch (e) {
      setAuthError(e.message || "Login failed");
    } finally {
      setIsLoadingItems(false);
    }
  };

  const handleSignup = async (payload) => {
    setAuthError("");
    try {
      await signUp(payload);
      await handleSignin({ email: payload.email, password: payload.password });
      setIsRegisterOpen(false);
    } catch (e) {
      setAuthError(e.message || "Sign up failed");
    }
  };

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    setClothingItems([]);
    setAuthReady(false);
    setAuthError("");
  };

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
        <Route path="*" element={<NotFound />} />
      </Routes>

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

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          setAuthError("");
        }}
        onSubmit={handleSignin}
        error={authError}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setAuthError("");
        }}
        onSubmit={handleSignup}
      />
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={() => setIsAddItemOpen(false)}
      />
    </div>
  );
}
