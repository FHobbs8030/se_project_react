import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import ItemModal from "./ItemModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import { getMe, signin, signup, signout } from "../utils/authApi.js";
import { getClothingItems, addClothingItem, deleteClothingItem } from "../utils/clothingApi.js";
import { getWeather } from "../utils/weatherApi.js";

function Shell({ outletContext, headerProps }) {
  return (
    <>
      <Header {...headerProps} />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
}

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") setLoginOpen(true);
    if (auth === "register") setRegisterOpen(true);
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoadingUser(true);
      try {
        const me = await getMe();
        if (mounted) setCurrentUser(me);
      } catch {
        if (mounted) setCurrentUser(null);
      } finally {
        if (mounted) setIsLoadingUser(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoadingWeather(true);
      try {
        const wx = await getWeather();
        if (mounted) setWeatherData(wx);
      } catch {
        if (mounted) setWeatherData(null);
      } finally {
        if (mounted) setIsLoadingWeather(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoadingItems(true);
      try {
        const items = await getClothingItems();
        if (mounted) setClothingItems(items || []);
      } catch {
        if (mounted) setClothingItems([]);
      } finally {
        if (mounted) setIsLoadingItems(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = useCallback(async ({ email, password }) => {
    await signin({ email, password });
    const me = await getMe();
    setCurrentUser(me);
    setLoginOpen(false);
    if (searchParams.get("auth")) {
      searchParams.delete("auth");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleRegister = useCallback(async ({ name, email, password }) => {
    await signup({ name, email, password });
    const me = await getMe();
    setCurrentUser(me);
    setRegisterOpen(false);
    if (searchParams.get("auth")) {
      searchParams.delete("auth");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleLogout = useCallback(async () => {
    await signout();
    setCurrentUser(null);
  }, []);

  const handleAddItem = useCallback(async ({ name, weather, imageUrl }) => {
    const created = await addClothingItem({ name, weather, imageUrl });
    setClothingItems((prev) => [created, ...prev]);
    setAddOpen(false);
  }, []);

  const openItem = useCallback((item) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const requestDeleteItem = useCallback(() => {
    if (!selectedItem) return;
    setConfirmDeleteOpen(true);
  }, [selectedItem]);

  const confirmDeleteItem = useCallback(async () => {
    if (!selectedItem) return;
    await deleteClothingItem(selectedItem._id);
    setClothingItems((prev) => prev.filter((it) => it._id !== selectedItem._id));
    setConfirmDeleteOpen(false);
    setSelectedItem(null);
  }, [selectedItem]);

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
    [currentUser, weatherData, clothingItems, isLoadingWeather, isLoadingItems, openItem, requestDeleteItem]
  );

  const headerProps = useMemo(
    () => ({
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
          <Route
            element={<Shell outletContext={outletContext} headerProps={headerProps} />}
          >
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
          onClose={closeItem}
          onConfirmDelete={requestDeleteItem}
          showDelete={Boolean(currentUser)}
        />

        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
          onConfirm={confirmDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
