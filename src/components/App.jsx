import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

import { getMe, signin, signup, signout } from "../utils/authApi.js";
import { getClothingItems, addClothingItem, deleteClothingItem } from "../utils/clothingApi.js";
import { getWeather } from "../utils/weatherApi.js";

import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contextStore/CurrentUserContext";

import "../blocks/App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [error, setError] = useState("");
  const [unit, setUnit] = useState("F");

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useMemo(() => Boolean(currentUser && jwt), [currentUser, jwt]);

  // Restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("jwt");
    if (stored) {
      setJwt(stored);
      getMe(stored)
        .then((me) => setCurrentUser(me))
        .catch(() => {
          localStorage.removeItem("jwt");
          setJwt(null);
          setCurrentUser(null);
        });
    }
  }, []);

  // Weather on load
  useEffect(() => {
    setIsLoadingWeather(true);
    getWeather()
      .then((wx) => setWeatherData(wx))
      .finally(() => setIsLoadingWeather(false));
  }, []);

  // Items (re-fetch when auth changes)
  useEffect(() => {
    getClothingItems()
      .then((items) => setClothingItems(Array.isArray(items) ? items : []))
      .catch(() => {});
  }, [isLoggedIn]);

  async function handleSignin(email, password) {
    setError("");
    try {
      const data = await signin({ email, password });
      if (data?.token) {
        localStorage.setItem("jwt", data.token);
        setJwt(data.token);
        const me = await getMe(data.token);
        setCurrentUser(me);
        const from = location.state?.from?.pathname || "/profile";
        navigate(from, { replace: true });
      }
    } catch {
      setError("Login failed. Check your credentials.");
    }
  }

  async function handleSignup(name, email, password) {
    setError("");
    try {
      await signup({ name, email, password });
      await handleSignin(email, password);
    } catch {
      setError("Sign up failed. Try a different email.");
    }
  }

async function handleLogout() {
  try {
    await signout?.();
  } catch (e) {
    // Non-fatal: backend signout can fail if token already invalid/expired
    console.warn("Signout failed (continuing local logout):", e);
  } finally {
    localStorage.removeItem("jwt");
    setJwt(null);
    setCurrentUser(null);
    navigate("/", { replace: true });
  }
}

  function openAddItem() { setIsAddItemOpen(true); }
  function closeAddItem() { setIsAddItemOpen(false); }

  function openItem(item) { setSelectedItem(item); setIsItemModalOpen(true); }
  function closeItem() { setSelectedItem(null); setIsItemModalOpen(false); }

  function openDelete() { setIsDeleteOpen(true); }
  function closeDelete() { setIsDeleteOpen(false); }

  async function handleAddItem(payload) {
    const created = await addClothingItem(payload, jwt);
    setClothingItems((prev) => [created, ...prev]);
    closeAddItem();
  }

  async function handleDeleteItem(id) {
    await deleteClothingItem(id, jwt);
    setClothingItems((prev) => prev.filter((i) => i._id !== id));
    closeDelete();
    closeItem();
  }

  const temperatureContextValue = useMemo(() => ({ unit, setUnit }), [unit]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={temperatureContextValue}>
        <div className="app">
          <Header
            isLoggedIn={isLoggedIn}
            onLogin={handleSignin}
            onRegister={handleSignup}
            onLogout={handleLogout}
            onAddItem={openAddItem}
            weatherData={weatherData}
            authError={error}
            // If your Header reads weather via useOutletContext(), you can remove weatherData here.
          />

          {/* Public outlet first */}
          <Outlet context={{ weatherData, isLoadingWeather, clothingItems, openItem, openAddItem }} />

          {/* Example of a protected area (wrap specific routes/pages, not the whole app) */}
          {/* 
          <ProtectedRoute redirectTo="/">
            <Profile />
          </ProtectedRoute>
          */}

          <Footer />

          {isItemModalOpen && (
            <ItemModal item={selectedItem} onClose={closeItem} onDelete={openDelete} />
          )}

          {isAddItemOpen && (
            <AddItemModal onClose={closeAddItem} onSubmit={handleAddItem} />
          )}

          {isDeleteOpen && (
            <ConfirmDeleteModal
              onClose={closeDelete}
              onConfirm={() => handleDeleteItem(selectedItem?._id)}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
