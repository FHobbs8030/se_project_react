import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { getItems, addItem, deleteItem } from "../utils/itemsApi.js";
import { getWeather } from "../utils/weatherApi.js";
import { getUser, login, register } from "../utils/authApi.js";

export default function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [locationName] = useState(import.meta.env.VITE_LOCATION_NAME || "");
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    setIsLoadingItems(true);
    getItems()
      .then((items) => setClothingItems(items))
      .finally(() => setIsLoadingItems(false));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    getUser()
      .then((user) => setCurrentUser(user))
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    const coords = (import.meta.env.VITE_DEFAULT_COORDS || "").split(",");
    const lat = parseFloat(coords[0]);
    const lon = parseFloat(coords[1]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      setIsLoadingWeather(true);
      getWeather({ lat, lon })
        .then((data) => setWeatherData(data))
        .finally(() => setIsLoadingWeather(false));
    }
  }, []);

  function onAddItem(values) {
    return addItem(values).then((item) => {
      setClothingItems((prev) => [item, ...prev]);
      setIsAddOpen(false);
    });
  }

  function onDeleteItem(item) {
    const id = item._id || item.id;
    return deleteItem(id).then(() => {
      setClothingItems((prev) => prev.filter((i) => (i._id || i.id) !== id));
      setPreviewItem(null);
    });
  }

  function onLogin(values) {
    return login(values).then(({ token }) => {
      localStorage.setItem("jwt", token);
      return getUser().then((user) => {
        setCurrentUser(user);
        setIsLoginOpen(false);
        navigate("/");
      });
    });
  }

  function onRegister(values) {
    return register(values).then(() => {
      setIsRegisterOpen(false);
      setIsLoginOpen(true);
    });
  }

  function onLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  }

  function handleCardClick(item) {
    setPreviewItem(item);
  }

  function handleAfterToggle(updatedItem) {
    setClothingItems((prev) =>
      prev.map((i) =>
        (i._id || i.id) === (updatedItem._id || updatedItem.id) ? updatedItem : i
      )
    );
  }

  const outletContext = useMemo(
    () => ({
      weatherData,
      clothingItems,
      onCardClick: handleCardClick,
      isLoadingWeather,
      isLoadingItems
    }),
    [weatherData, clothingItems, isLoadingWeather, isLoadingItems]
  );

  return (
    <>
      <Routes>
        <Route
          element={
            <Layout
              isAuth={!!currentUser}
              currentUser={currentUser}
              onAddItemClick={() => setIsAddOpen(true)}
              onLoginClick={() => setIsLoginOpen(true)}
              onRegisterClick={() => setIsRegisterOpen(true)}
              onLogoutClick={onLogout}
              locationName={locationName}
              outletContext={outletContext}
            />
          }
        >
          <Route index element={<Main />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={!!currentUser}>
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAfterToggle={handleAfterToggle}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSubmit={onLogin}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={onRegister}
        />
      )}
      {isAddOpen && (
        <AddItemModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAddItem={onAddItem}
        />
      )}
      {previewItem && (
        <ItemModal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          card={previewItem}
          onDelete={onDeleteItem}
        />
      )}
    </>
  );
}
