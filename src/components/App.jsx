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

import { getMe } from "../utils/authApi.js";
import { getWeather } from "../utils/weatherApi.js";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../utils/clothingApi.js";
import { removeToken } from "../utils/token.js";

import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import "../blocks/App.css";

function Shell({ outletContext, headerProps }) {
  return (
    <>
      <Header {...headerProps} />
      <main className="page__content">
        <Outlet context={outletContext} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [unit, setUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemOpen, setItemOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe();
        if (!cancelled) setCurrentUser(me);
      } catch (e) {
        if (!cancelled) setCurrentUser(null);
      } finally {
        if (!cancelled) setIsLoadingUser(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoadingWeather(true);
        const w = await getWeather();
        if (!cancelled) setWeatherData(w);
      } finally {
        if (!cancelled) setIsLoadingWeather(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoadingItems(true);
        const items = await getClothingItems();
        if (!cancelled) setClothingItems(items || []);
      } finally {
        if (!cancelled) setIsLoadingItems(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    setCurrentUser(null);
    setSelectedItem(null);
    setItemOpen(false);
    setConfirmOpen(false);
    setAddOpen(false);
  }, []);

  const handleLogin = useCallback((user) => {
    setCurrentUser(user);
    setLoginOpen(false);
  }, []);

  const handleRegister = useCallback((user) => {
    setCurrentUser(user);
    setRegisterOpen(false);
  }, []);

  const handleAddItem = useCallback(async ({ name, weather, imageUrl }) => {
    const created = await addClothingItem({ name, weather, imageUrl });
    setClothingItems((prev) => [created, ...prev]);
    setAddOpen(false);
  }, []);

  const openItem = useCallback((item) => {
    setAddOpen(false);
    setConfirmOpen(false);
    setSelectedItem(item);
    setItemOpen(true);
  }, []);

  const closeItem = useCallback(() => {
    setItemOpen(false);
    setSelectedItem(null);
  }, []);

  const requestDeleteItem = useCallback(
    (itemArg) => {
      const target = itemArg || selectedItem;
      if (!currentUser) {
        setLoginOpen(true);
        return;
      }
      if (!target?._id) return;
      setAddOpen(false);
      setSelectedItem(target);
      setConfirmOpen(true);
    },
    [currentUser, selectedItem]
  );

  const handleDeleteItem = useCallback(async () => {
    if (!selectedItem?._id) {
      setConfirmOpen(false);
      return;
    }
    await deleteClothingItem(selectedItem._id);
    setClothingItems((prev) => prev.filter((i) => i._id !== selectedItem._id));
    setConfirmOpen(false);
    setItemOpen(false);
    setSelectedItem(null);
  }, [selectedItem]);

  useEffect(() => {
    if (isAddOpen) {
      setItemOpen(false);
      setConfirmOpen(false);
      setSelectedItem(null);
    }
  }, [isAddOpen]);

  useEffect(() => {
    if (isItemOpen) {
      setAddOpen(false);
    }
  }, [isItemOpen]);

  useEffect(() => {
    if (!currentUser && isConfirmOpen) setConfirmOpen(false);
  }, [currentUser, isConfirmOpen]);

  useEffect(() => {
    if (!selectedItem && isConfirmOpen) setConfirmOpen(false);
  }, [selectedItem, isConfirmOpen]);

  useEffect(() => {
    if (!isItemOpen && isConfirmOpen) setConfirmOpen(false);
  }, [isItemOpen, isConfirmOpen]);

  const outletContext = useMemo(
    () => ({
      currentUser,
      weatherData,
      clothingItems,
      isLoadingWeather,
      isLoadingItems,
      onCardClick: openItem,
      onDeleteClick: requestDeleteItem,
    }),
    [
      currentUser,
      weatherData,
      clothingItems,
      isLoadingWeather,
      isLoadingItems,
      openItem,
      requestDeleteItem,
    ]
  );

  const headerProps = useMemo(
    () => ({
      onAddItemClick: () => setAddOpen(true),
      onLoginClick: () => setLoginOpen(true),
      onRegisterClick: () => setRegisterOpen(true),
      onLogoutClick: handleLogout,
      isLoadingUser,
    }),
    [handleLogout, isLoadingUser]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ unit, setUnit }}>
        <Routes>
          <Route element={<Shell outletContext={outletContext} headerProps={headerProps} />}>
            <Route index element={<Main />} />
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

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          onRegister={handleRegister}
        />

        <AddItemModal
          isOpen={isAddOpen}
          onClose={() => setAddOpen(false)}
          onAddItem={handleAddItem}
        />

        <ItemModal
          item={selectedItem}
          isOpen={isItemOpen}
          onClose={closeItem}
          onConfirmDelete={requestDeleteItem}
        />

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
