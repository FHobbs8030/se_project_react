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
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState("F");

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    (async () => {
      try {
        const me = await Auth.getUser();
        setCurrentUser(me);
      } catch {
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
    const loadWeather = async () => {
      if (!WEATHER_URL || !WEATHER_KEY || !DEFAULT_COORDS) return;
      setIsLoadingWeather(true);
      try {
        const [lat, lon] = DEFAULT_COORDS.split(",").map((v) => v.trim());
        const res = await fetch(
          `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=imperial`
        );
        const data = await res.json();
        setWeatherData({ ...data, locationName: LOCATION_NAME });
      } catch {
        setWeatherData(null);
      } finally {
        setIsLoadingWeather(false);
      }
    };
    loadWeather();
  }, []);

  const onCardClick = (item) => {
    setActiveItem(item);
    setIsItemOpen(true);
  };

  const handleDeleteItem = async (item) => {
    await Items.deleteItem(item._id || item.id);
    const list = await Items.getItems();
    const arr = Array.isArray(list) ? list : list?.data || [];
    setClothingItems(arr);
    setIsItemOpen(false);
    setActiveItem(null);
  };

  const handleAddItem = async ({ name, imageUrl, weather = "warm" }) => {
    await Items.addItem({ name, imageUrl, weather });
    const list = await Items.getItems();
    const arr = Array.isArray(list) ? list : list?.data || [];
    setClothingItems(arr);
    setIsAddItemOpen(false);
  };

  const handleLoginClick = useCallback(() => setIsLoginOpen(true), []);
  const handleRegisterClick = useCallback(() => setIsRegisterOpen(true), []);
  const handleAddClick = useCallback(() => setIsAddItemOpen(true), []);

  const handleLoginSubmit = async ({ email, password }) => {
    const { token } = await Auth.login({ email, password });
    localStorage.setItem("jwt", token);
    const me = await Auth.getUser();
    setCurrentUser(me);
    const list = await Items.getItems();
    const arr = Array.isArray(list) ? list : list?.data || [];
    setClothingItems(arr);
    setIsLoginOpen(false);
    navigate("/profile");
  };

  const handleRegisterSubmit = async ({ name, email, password }) => {
    await Auth.register({ name, email, password });
    const { token } = await Auth.login({ email, password });
    localStorage.setItem("jwt", token);
    const me = await Auth.getUser();
    setCurrentUser(me);
    const list = await Items.getItems();
    const arr = Array.isArray(list) ? list : list?.data || [];
    setClothingItems(arr);
    setIsRegisterOpen(false);
    navigate("/profile");
  };

  const handleLogout = useCallback(async () => {
    await fetch(`${API_BASE}/signout`, { method: "POST", credentials: "include" }).catch(
      () => null
    );
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setClothingItems([]);
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
      onLogoutClick: handleLogout,
      onEditProfileClick: () => null
    }),
    [
      weatherData,
      clothingItems,
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
