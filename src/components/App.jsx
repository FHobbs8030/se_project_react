import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

import { getMe, signin, signup } from "../utils/authApi.js";
import { getItems, addItem, deleteItem as apiDeleteItem } from "../utils/itemsApi.js";
import { getWeather } from "../utils/weatherApi.js";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [weatherData, setWeatherData] = useState({ tempF: null, isDay: true, icon: "", city: "" });

  const [authError, setAuthError] = useState("");
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "F");

  const fetchProfile = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsAuth(false);
      setCurrentUser(null);
      return;
    }
    try {
      const me = await getMe(token);
      setCurrentUser(me);
      setIsAuth(true);
    } catch {
      removeToken();
      setIsAuth(false);
      setCurrentUser(null);
    }
  }, []);

  const fetchItems = useCallback(async () => {
    setIsLoadingItems(true);
    try {
      const items = await getItems();
      setClothingItems(items);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  const fetchWeather = useCallback(async () => {
    try {
      const w = await getWeather();
      setWeatherData(w);
    } catch {
      // swallow for now
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchItems();
    fetchWeather();
  }, [fetchProfile, fetchItems, fetchWeather]);

  const openLogin = () => { setAuthError(""); setIsLoginOpen(true); };
  const openRegister = () => { setAuthError(""); setIsRegisterOpen(true); };
  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsAddItemOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedItem(null);
    setPendingDeleteId(null);
  };

  const handleSignin = async (form) => {
    setAuthError("");
    try {
      const { token } = await signin(form);
      setToken(token);
      await fetchProfile();
      closeAllModals();
    } catch (e) {
      setAuthError(e?.message || "Login failed");
    }
  };

  const handleSignup = async (form) => {
    setAuthError("");
    try {
      await signup(form);
      const { token } = await signin({ email: form.email, password: form.password });
      setToken(token);
      await fetchProfile();
      closeAllModals();
    } catch (e) {
      setAuthError(e?.message || "Signup failed");
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsAuth(false);
    setCurrentUser(null);
  };

  const openItem = (item) => setSelectedItem(item);
  const requestDeleteItem = (id) => { setPendingDeleteId(id); setIsConfirmDeleteOpen(true); };

  const handleDeleteItem = async () => {
    if (!pendingDeleteId) return;
    const token = getToken();
    await apiDeleteItem(pendingDeleteId, token);
    setClothingItems((prev) => prev.filter((i) => i._id !== pendingDeleteId));
    closeAllModals();
  };

  const handleAddItem = async (form) => {
    const token = getToken();
    const created = await addItem(form, token);
    setClothingItems((prev) => [created, ...prev]);
    setIsAddItemOpen(false);
  };

  const toC = (f) => Math.round((f - 32) * 5 / 9);
  const shownTemp = useMemo(() => {
    if (weatherData.tempF == null) return "";
    return unit === "C" ? `${toC(weatherData.tempF)}°C` : `${Math.round(weatherData.tempF)}°F`;
  }, [weatherData.tempF, unit]);

  const handleToggleUnit = () => {
    const next = unit === "F" ? "C" : "F";
    setUnit(next);
    localStorage.setItem("unit", next);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          isAuth={isAuth}
          currentUser={currentUser}
          onAddItemClick={() => setIsAddItemOpen(true)}
          onLoginClick={openLogin}
          onRegisterClick={openRegister}
          onLogoutClick={handleLogout}
          unit={unit}
          onToggleUnit={handleToggleUnit}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                shownTemp={shownTemp}
                clothingItems={clothingItems}
                isLoadingItems={isLoadingItems}
                onCardClick={openItem}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isAuth}>
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
          <Route path="/logout" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <LoginModal isOpen={isLoginOpen} onClose={closeAllModals} onSubmit={handleSignin} authError={authError} />
        <RegisterModal isOpen={isRegisterOpen} onClose={closeAllModals} onSubmit={handleSignup} authError={authError} />
        <AddItemModal isOpen={isAddItemOpen} onClose={closeAllModals} onAddItem={handleAddItem} />
        <ItemModal
          isOpen={!!selectedItem}
          onClose={closeAllModals}
          card={selectedItem}
          onDelete={() => requestDeleteItem(selectedItem?._id)}
          canDelete={isAuth && selectedItem?.owner?._id === currentUser?._id}
        />
        <ConfirmDeleteModal isOpen={isConfirmDeleteOpen} onClose={closeAllModals} onConfirm={handleDeleteItem} />
      </div>
    </CurrentUserContext.Provider>
  );
}
