import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import ItemModal from "./ItemModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

import * as authModule from "../utils/authApi.js";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { getWeather } from "../utils/weatherApi.js";

const api = authModule.default || authModule;

export default function App() {
  const locationName = import.meta.env.VITE_LOCATION_NAME || "Carson City";

  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isAddItemOpen, setAddItemOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadMe = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsAuth(false);
        setCurrentUser(null);
        return;
      }
      const me = await api.getMe();
      setCurrentUser(me);
      setIsAuth(true);
    } catch {
      setIsAuth(false);
      setCurrentUser(null);
      removeToken();
    }
  }, []);

  const loadItems = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setClothingItems([]);
      return;
    }
    setIsLoadingItems(true);
    try {
      const data = await api.getItems();
      setClothingItems(Array.isArray(data) ? data : []);
    } catch {
      setClothingItems([]);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  const loadWeather = useCallback(async () => {
    setIsLoadingWeather(true);
    try {
      const w = await getWeather();
      setWeatherData(w);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
    loadItems();
    loadWeather();
  }, [loadMe, loadItems, loadWeather]);

  const openItem = useCallback((item) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);
  const requestDeleteItem = useCallback((item) => {
    setSelectedItem(item);
    setConfirmDeleteOpen(true);
  }, []);

  const handleDeleteItem = useCallback(async () => {
    if (!selectedItem) return;
    try {
      await api.deleteItem(selectedItem._id);
      setClothingItems((prev) => prev.filter((i) => i._id !== selectedItem._id));
    } finally {
      setConfirmDeleteOpen(false);
      setSelectedItem(null);
    }
  }, [selectedItem]);

  const handleAddItem = useCallback(async (values) => {
    const created = await api.addItem(values);
    setClothingItems((prev) => [created, ...prev]);
    setAddItemOpen(false);
  }, []);

  const handleLogin = useCallback(async ({ email, password }) => {
    const { token } = await api.signin({ email, password });
    setToken(token);
    await loadMe();
    setLoginOpen(false);
    await loadItems();
  }, [loadMe, loadItems]);

  const handleRegister = useCallback(async ({ name, email, password }) => {
    await api.signup({ name, email, password });
    const { token } = await api.signin({ email, password });
    setToken(token);
    await loadMe();
    setRegisterOpen(false);
    await loadItems();
  }, [loadMe, loadItems]);

  const handleLogout = useCallback(() => {
    removeToken();
    setIsAuth(false);
    setCurrentUser(null);
    setClothingItems([]);
  }, []);

  const outletContext = useMemo(() => ({
    currentUser,
    weatherData,
    clothingItems,
    onCardClick: openItem,
    onDeleteClick: requestDeleteItem,
    isLoadingWeather,
    isLoadingItems,
  }), [currentUser, weatherData, clothingItems, openItem, requestDeleteItem, isLoadingWeather, isLoadingItems]);

  return (
    <div className="app">
      <Header
        isAuth={isAuth}
        currentUser={currentUser}
        onAddItemClick={() => setAddItemOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
        onLogoutClick={handleLogout}
        locationName={locationName}
      />

      <Routes>
        <Route path="/" element={<Outlet context={outletContext} />}>
          <Route index element={<Main />} />
        </Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Profile
                currentUser={currentUser}
                clothingItems={clothingItems}
                onCardClick={openItem}
                onDeleteClick={requestDeleteItem}
                isLoadingItems={isLoadingItems}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={handleLogin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onSubmit={handleRegister}
      />
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setAddItemOpen(false)}
        onAddItem={handleAddItem}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteItem}
      />
      <ItemModal
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={closeItem}
        onConfirmDelete={requestDeleteItem}
      />
    </div>
  );
}
