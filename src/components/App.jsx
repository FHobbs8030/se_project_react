import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ProfilePage from "./ProfilePage.jsx";
import AddItemModal from "./AddItemModal.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import ItemModal from "./ItemModal.jsx";
import { getItems, addItem, deleteItem, getMe, signin, signup } from "../utils/api.js";

function AppShell({
  isAuth,
  currentUser,
  onAddItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  outletContext,
  modals,
  selectedItem,
  onCloseItem,
  onDeleteItem,
  locationName,
}) {
  return (
    <>
      <Header
        isAuth={isAuth}
        currentUser={currentUser}
        onAddItemClick={onAddItemClick}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        locationName={locationName}
      />
      <Outlet context={outletContext} />
      <Footer />
      <AddItemModal isOpen={modals.addOpen} onClose={modals.closeAdd} onSubmit={modals.submitAdd} />
      <LoginModal isOpen={modals.loginOpen} onClose={modals.closeLogin} onSubmit={modals.submitLogin} />
      <RegisterModal isOpen={modals.registerOpen} onClose={modals.closeRegister} onSubmit={modals.submitRegister} />
      <ItemModal isOpen={!!selectedItem} item={selectedItem} onClose={onCloseItem} onDelete={onDeleteItem} />
    </>
  );
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  const [isAddItemOpen, setAddItemOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const locationName = import.meta.env.VITE_LOCATION_NAME || "New York";

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    getMe(jwt)
      .then((me) => {
        setCurrentUser(me);
        setIsAuth(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsAuth(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    setIsLoadingItems(true);
    getItems(jwt)
      .then((items) => setClothingItems(items))
      .finally(() => setIsLoadingItems(false));
  }, [isAuth]);

  useEffect(() => {
    const url = import.meta.env.VITE_WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather";
    const key = import.meta.env.VITE_WEATHER_API_KEY || "";
    const coords = (import.meta.env.VITE_DEFAULT_COORDS || "39.1638,-119.767").split(",");
    const lat = coords[0]?.trim();
    const lon = coords[1]?.trim();
    if (!key || !lat || !lon) return;
    setIsLoadingWeather(true);
    fetch(`${url}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
      .then((r) => r.json())
      .then((data) => setWeatherData(data))
      .finally(() => setIsLoadingWeather(false));
  }, []);

  function onCardClick(item) {
    setSelectedItem(item);
  }

  async function handleAddItemSubmit(values) {
    const jwt = localStorage.getItem("jwt");
    const created = await addItem(values, jwt);
    setClothingItems((prev) => [created, ...prev]);
    setAddItemOpen(false);
  }

  async function handleDeleteItem(itemId) {
    const jwt = localStorage.getItem("jwt");
    const ok = await deleteItem(itemId, jwt);
    if (ok) setClothingItems((prev) => prev.filter((i) => (i._id || i.id) !== itemId));
    setSelectedItem(null);
  }

  async function handleLogin({ email, password }) {
    const { token } = await signin({ email, password });
    localStorage.setItem("jwt", token);
    const me = await getMe(token);
    setCurrentUser(me);
    setIsAuth(true);
    setLoginOpen(false);
  }

  async function handleRegister({ name, avatar, email, password }) {
    await signup({ name, avatar, email, password });
    const { token } = await signin({ email, password });
    localStorage.setItem("jwt", token);
    const me = await getMe(token);
    setCurrentUser(me);
    setIsAuth(true);
    setRegisterOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsAuth(false);
    setCurrentUser(null);
    setClothingItems([]);
  }

  const outletContext = useMemo(
    () => ({
      weatherData,
      clothingItems,
      onCardClick,
      isLoadingWeather,
      isLoadingItems,
    }),
    [weatherData, clothingItems, isLoadingWeather, isLoadingItems]
  );

  const modals = {
    addOpen: isAddItemOpen,
    closeAdd: () => setAddItemOpen(false),
    submitAdd: handleAddItemSubmit,
    loginOpen: isLoginOpen,
    closeLogin: () => setLoginOpen(false),
    submitLogin: handleLogin,
    registerOpen: isRegisterOpen,
    closeRegister: () => setRegisterOpen(false),
    submitRegister: handleRegister,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell
            isAuth={isAuth}
            currentUser={currentUser}
            onAddItemClick={() => setAddItemOpen(true)}
            onLoginClick={() => setLoginOpen(true)}
            onRegisterClick={() => setRegisterOpen(true)}
            onLogoutClick={handleLogout}
            outletContext={outletContext}
            modals={modals}
            selectedItem={selectedItem}
            onCloseItem={() => setSelectedItem(null)}
            onDeleteItem={handleDeleteItem}
            locationName={locationName}
          />
        }
      >
        <Route index element={<Main />} />
        <Route
          path="profile"
          element={
            <ProfilePage
              clothingItems={clothingItems}
              isLoadingItems={isLoadingItems}
              onCardClick={onCardClick}
              currentUser={currentUser}
            />
          }
        />
      </Route>
    </Routes>
  );
}
