// src/components/App.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import Profile from './Profile.jsx';
import NotFound from './NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ItemModal from './ItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';

import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { WeatherContext } from '../contexts/WeatherContext.js';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext.jsx';

import { getToken, setToken, removeToken } from '../utils/token.js';
import * as authApi from '../utils/authApi.js';
import { getWeather } from '../utils/weather.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const [addItemOpen, setAddItemOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const locationName = import.meta.env.VITE_LOCATION_NAME || 'New York';

  const loadMeAndItems = useCallback(async () => {
    try {
      setIsLoadingItems(true);
      const me = await authApi.getMe();
      setCurrentUser(me);
      const items = await authApi.getItems();
      setClothingItems(Array.isArray(items) ? items : []);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingWeather(true);
        const w = await getWeather();
        setWeatherData(w);
      } finally {
        setIsLoadingWeather(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (getToken()) loadMeAndItems();
  }, [loadMeAndItems]);

  const handleSignin = useCallback(
    async ({ email, password }) => {
      const { token } = await authApi.signin({ email, password });
      setToken(token);
      await loadMeAndItems();
      setLoginOpen(false);
    },
    [loadMeAndItems]
  );

  const handleSignup = useCallback(
    async ({ name, email, password }) => {
      await authApi.signup({ name, email, password });
      const { token } = await authApi.signin({ email, password });
      setToken(token);
      await loadMeAndItems();
      setRegisterOpen(false);
    },
    [loadMeAndItems]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setCurrentUser(null);
  }, []);

  const handleAddItem = useCallback(async values => {
    const created = await authApi.addItem(values);
    setClothingItems(prev => [created, ...prev]);
    setAddItemOpen(false);
  }, []);

  const openItem = useCallback(item => {
    setActiveItem(item);
    setItemOpen(true);
  }, []);

  const requestDeleteItem = useCallback(item => {
    setActiveItem(item);
    setConfirmOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const id = activeItem?._id || activeItem?.id;
    if (!id) return;
    await authApi.deleteItem(id);
    setClothingItems(prev => prev.filter(i => (i._id || i.id) !== id));
    setConfirmOpen(false);
    setItemOpen(false);
    setActiveItem(null);
  }, [activeItem]);

  const tempCtx = useMemo(
    () => ({ currentTemperatureUnit, setCurrentTemperatureUnit }),
    [currentTemperatureUnit]
  );
  const userCtx = useMemo(() => currentUser, [currentUser]);
  const weatherCtx = useMemo(
    () => ({ weatherData, isLoadingWeather }),
    [weatherData, isLoadingWeather]
  );

  return (
    <CurrentTemperatureUnitContext.Provider value={tempCtx}>
      <CurrentUserContext.Provider value={userCtx}>
        <WeatherContext.Provider value={weatherCtx}>
          <Header
            isAuth={!!currentUser}
            currentUser={currentUser}
            onAddItemClick={() => setAddItemOpen(true)}
            onLoginClick={() => setLoginOpen(true)}
            onRegisterClick={() => setRegisterOpen(true)}
            onLogoutClick={handleLogout}
            locationName={locationName}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Outlet
                  context={{
                    currentUser,
                    weatherData,
                    clothingItems,
                    onCardClick: openItem,
                    onDeleteClick: requestDeleteItem,
                    isLoadingWeather,
                    isLoadingItems,
                  }}
                />
              }
            >
              <Route index element={<Main />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute isAuth={!!currentUser}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          <Footer />

          <LoginModal
            isOpen={loginOpen}
            onClose={() => setLoginOpen(false)}
            onSubmit={handleSignin}
          />
          <RegisterModal
            isOpen={registerOpen}
            onClose={() => setRegisterOpen(false)}
            onSubmit={handleSignup}
          />
          <AddItemModal
            isOpen={addItemOpen}
            onClose={() => setAddItemOpen(false)}
            onAddItem={handleAddItem}
          />
          <ItemModal
            isOpen={itemOpen}
            item={activeItem}
            onClose={() => setItemOpen(false)}
            onConfirmDelete={requestDeleteItem}
          />
          <ConfirmDeleteModal
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </WeatherContext.Provider>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}
