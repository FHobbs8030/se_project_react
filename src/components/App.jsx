import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import * as Auth from "../utils/authApi.js";
import * as Items from "../utils/itemsApi.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_COORDS = import.meta.env.VITE_DEFAULT_COORDS;
const LOCATION_NAME = import.meta.env.VITE_LOCATION_NAME ?? "";

export default function App() {
  console.log("[App] render");
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [tempUnit, setTempUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    (async () => {
      try {
        const me = await Auth.getUser();
        setCurrentUser(me);
      } catch (e) {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      }
    })();
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoadingItems(true);
      try {
        const list = await Items.getItems();
        const arr = Array.isArray(list) ? list : list?.data || [];
        setClothingItems(arr);
      } finally {
        setIsLoadingItems(false);
      }
    };
    loadItems();
  }, []);

useEffect(() => {
  (async function loadWeather() {
    console.log("Environment check:", {
      WEATHER_URL,
      hasKey: !!WEATHER_KEY,
      DEFAULT_COORDS,
    });

    if (!WEATHER_URL || !WEATHER_KEY || !DEFAULT_COORDS) {
      console.log("Missing env; aborting weather load");
      setWeatherData(null);
      return;
    }

    setIsLoadingWeather(true);
    try {
      const [lat, lon] = DEFAULT_COORDS.split(",").map((v) => v.trim());
      const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=imperial`;
      console.log("Requesting weather:", url);

      const res = await fetch(url);
      console.log("Weather res status:", res.status);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.log("Weather fetch failed:", res.status, text);
        setWeatherData(null);
        return;
      }

      const data = await res.json();
      if (!Number.isFinite(data?.main?.temp)) {
        console.log("Weather response missing main.temp:", data);
        setWeatherData(null);
        return;
      }

      const withName = { ...data, locationName: LOCATION_NAME };
      setWeatherData(withName);
      console.log("Weather data loaded in App:", withName);
    } catch (e) {
      console.log("Weather fetch error:", e);
      setWeatherData(null);
    } finally {
      setIsLoadingWeather(false);
    }
  })();
}, []);

  const handleAddClick = useCallback(() => setIsAddItemOpen(true), []);
  const handleLoginClick = useCallback(() => setIsLoginOpen(true), []);
  const handleRegisterClick = useCallback(() => setIsRegisterOpen(true), []);
  const onCardClick = useCallback((item) => {
    setActiveItem(item);
    setIsItemOpen(true);
  }, []);

  const handleAddItem = useCallback(async ({ name, imageUrl, weather }) => {
    try {
      const created = await Items.addItem({ name, imageUrl, weather });
      const doc = created?.data || created;
      setClothingItems((prev) => [doc, ...prev]);
      setIsAddItemOpen(false);
    } catch (e) {
      console.error("add item failed", e);
    }
  }, []);

  const handleDeleteItem = useCallback(async (item) => {
    try {
      await Items.deleteItem(item._id || item.id);
      const item_id = item._id || item.id;
      setClothingItems((prev) => prev.filter((it) => (it._id || it.id) !== item_id));
      setIsItemOpen(false);
      setActiveItem(null);
    } catch (e) {
      console.error("delete item failed", e);
    }
  }, []);

  const handleLoginSubmit = useCallback(
    async ({ email, password }) => {
      const { token } = await Auth.login({ email, password });
      localStorage.setItem("jwt", token);
      const me = await Auth.getUser();
      setCurrentUser(me);
      const list = await Items.getItems();
      const arr = Array.isArray(list) ? list : list?.data || [];
      setClothingItems(arr);
      setIsLoginOpen(false);
      navigate("/profile");
    },
    [navigate]
  );

  const handleRegisterSubmit = useCallback(
    async ({ email, password, name, avatar }) => {
      await Auth.register({ email, password, name, avatar });
      const { token } = await Auth.login({ email, password });
      localStorage.setItem("jwt", token);
      const me = await Auth.getUser();
      setCurrentUser(me);
      const list = await Items.getItems();
      const arr = Array.isArray(list) ? list : list?.data || [];
      setClothingItems(arr);
      setIsRegisterOpen(false);
      navigate("/profile");
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    await fetch(`${API_BASE}/signout`, { method: "POST", credentials: "include" }).catch(() => null);
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  }, [navigate]);

  const outletContext = useMemo(
    () => ({
      weatherData,
      clothingItems,
      onCardClick,
      isLoadingWeather,
      isLoadingItems,
      tempUnit,
      setTempUnit,
      currentUser,
      onAddClick: handleAddClick,
      onLogoutClick: handleLogout
    }),
    [
      weatherData,
      clothingItems,
      onCardClick,
      isLoadingWeather,
      isLoadingItems,
      tempUnit,
      currentUser,
      handleAddClick,
      handleLogout
    ]
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              outletContext={outletContext}
              onAddClick={handleAddClick}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onLogoutClick={handleLogout}
            />
          }
        >
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute isAuth={!!currentUser} redirectTo="/" />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSubmit={handleLoginSubmit}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={handleRegisterSubmit}
        />
      )}

      {isAddItemOpen && (
        <AddItemModal
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          onAddItem={handleAddItem}
        />
      )}

      {isItemOpen && activeItem && (
        <ItemModal
          isOpen={isItemOpen}
          item={activeItem}
          onClose={() => {
            setIsItemOpen(false);
            setActiveItem(null);
          }}
          onDelete={handleDeleteItem}
          isOwner={
            currentUser?._id &&
            String(activeItem.owner?._id || activeItem.owner) === String(currentUser._id)
          }
        />
      )}
    </>
  );
}
