import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

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

import * as authApi from "../utils/authApi.js";
import * as api from "../utils/api.js";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { getWeather } from "../utils/weather.js";

import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import { WeatherContext } from "../contextStore/WeatherContext.js";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";

export default function App() {
  const [useCelsius, setUseCelsius] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [weather, setWeather] = useState({
    tempF: null,
    tempC: null,
    band: null,
    name: import.meta.env.VITE_LOCATION_NAME || "New York",
  });

  const [itemOpen, setItemOpen] = useState(null);
  const [deletePending, setDeletePending] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);

  const userCtx = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  const weatherCtx = useMemo(
    () => ({ ...weather }),
    [weather]
  );
  const unitCtx = useMemo(() => ({ useCelsius, setUseCelsius }), [useCelsius]);

  const loadMeAndItems = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const me = await authApi.getMe(token);
      setCurrentUser(me);
      setIsAuth(true);
      setIsLoadingItems(true);
      const items = await api.getItems(token);
      setClothingItems(items);
    } catch {
      removeToken();
      setIsAuth(false);
      setCurrentUser(null);
      setClothingItems([]);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    loadMeAndItems();
  }, [loadMeAndItems]);

  useEffect(() => {
    getWeather().then(setWeather).catch(() => {});
  }, []);

  const handleSignin = useCallback(async ({ email, password }) => {
    const { token } = await authApi.signin({ email, password });
    setToken(token);
    await loadMeAndItems();
    setLoginOpen(false);
  }, [loadMeAndItems]);

  const handleSignup = useCallback(async ({ name, email, password }) => {
    await authApi.signup({ name, email, password });
    const { token } = await authApi.signin({ email, password });
    setToken(token);
    await loadMeAndItems();
    setRegisterOpen(false);
  }, [loadMeAndItems]);

  const handleLogout = useCallback(() => {
    removeToken();
    setIsAuth(false);
    setCurrentUser(null);
    setClothingItems([]);
  }, []);

  const handleAddItem = useCallback(async (payload) => {
    const token = getToken();
    const created = await api.addItem(payload, token);
    setClothingItems((prev) => [created, ...prev]);
    setAddItemOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletePending) return;
    const token = getToken();
    await api.deleteItem(deletePending._id, token);
    setClothingItems((prev) => prev.filter((i) => i._id !== deletePending._id));
    setDeletePending(null);
  }, [deletePending]);

  return (
    <CurrentTemperatureUnitContext.Provider value={unitCtx}>
      <WeatherContext.Provider value={weatherCtx}>
        <CurrentUserContext.Provider value={userCtx}>
          <Header
            isAuth={isAuth}
            currentUser={currentUser}
            onAddItemClick={() => setAddItemOpen(true)}
            onLoginClick={() => setLoginOpen(true)}
            onRegisterClick={() => setRegisterOpen(true)}
            onLogoutClick={handleLogout}
            locationName={weather.name}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherBand={weather.band}
                  isLoadingItems={isLoadingItems}
                  onCardClick={(i) => setItemOpen(i)}
                />
              }
            />
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={(i) => setItemOpen(i)}
                    onDeleteClick={(i) => setDeletePending(i)}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />

          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSubmit={handleSignin} />
          <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} onSubmit={handleSignup} />
          <AddItemModal isOpen={addItemOpen} onClose={() => setAddItemOpen(false)} onSubmit={handleAddItem} />

          <ItemModal item={itemOpen} isOpen={!!itemOpen} onClose={() => setItemOpen(null)} />
          <ConfirmDeleteModal
            isOpen={!!deletePending}
            onClose={() => setDeletePending(null)}
            onConfirm={handleConfirmDelete}
          />
        </CurrentUserContext.Provider>
      </WeatherContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}
