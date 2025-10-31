import { useState, useEffect, useCallback, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Main from "../components/Main.jsx";
import ProfilePage from "../components/ProfilePage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import LoginModal from "../components/LoginModal.jsx";
import RegisterModal from "../components/RegisterModal.jsx";
import AddItemModal from "../components/AddItemModal.jsx";
import ItemModal from "../components/ItemModal.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import * as itemsApi from "../utils/itemsApi.js";
import * as authApi from "../utils/authApi.js";
import * as weatherApi from "../utils/weatherApi.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState("F");
  const navigate = useNavigate();

  const closeAllModals = useCallback(() => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  }, []);

  const handleLoginClick = useCallback(() => setActiveModal("login"), []);
  const handleRegisterClick = useCallback(() => setActiveModal("register"), []);
  const handleAddClick = useCallback(() => setActiveModal("add"), []);

  const handleCardClick = useCallback((item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  }, []);

  const handleDeleteRequest = useCallback((item) => {
    setCardToDelete(item);
    setActiveModal("confirmDelete");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  }, [navigate]);

  const handleTempUnitChange = useCallback((unit) => {
    setTempUnit(unit);
  }, []);

  const loadWeather = useCallback(async () => {
    setIsLoadingWeather(true);
    try {
      const data = await weatherApi.getWeather();
      setWeatherData(data);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  const loadItems = useCallback(async () => {
    setIsLoadingItems(true);
    try {
      const items = await itemsApi.getItems();
      setClothingItems(items);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    try {
      const user = await authApi.getUser(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
    } catch {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    loadWeather();
    loadItems();
    loadUser();
  }, [loadWeather, loadItems, loadUser]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const { token } = await authApi.login({ email, password });
      localStorage.setItem("jwt", token);
      const user = await authApi.getUser(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeAllModals();
    },
    [closeAllModals]
  );

  const handleRegister = useCallback(
    async ({ name, avatar, email, password }) => {
      await authApi.register({ name, avatar, email, password });
      const { token } = await authApi.login({ email, password });
      localStorage.setItem("jwt", token);
      const user = await authApi.getUser(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeAllModals();
    },
    [closeAllModals]
  );

  const handleAddItem = useCallback(
    async ({ name, imageUrl, weather }) => {
      const token = localStorage.getItem("jwt");
      const newItem = await itemsApi.addItem({ name, imageUrl, weather }, token);
      setClothingItems((prev) => [newItem, ...prev]);
      closeAllModals();
    },
    [closeAllModals]
  );

  const handleDeleteItem = useCallback(
    async (item) => {
      const token = localStorage.getItem("jwt");
      await itemsApi.deleteItem(item._id, token);
      setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
      closeAllModals();
    },
    [closeAllModals]
  );

  const handleCardLike = useCallback(async (item, isLiked) => {
    const token = localStorage.getItem("jwt");
    const updated = isLiked
      ? await itemsApi.unlikeItem(item._id, token)
      : await itemsApi.likeItem(item._id, token);
    setClothingItems((prev) => prev.map((i) => (i._id === item._id ? updated : i)));
  }, []);

  const outletContext = useMemo(
    () => ({
      currentUser,
      weatherData,
      clothingItems,
      isLoggedIn,
      isLoadingItems,
      isLoadingWeather,
      onCardClick: handleCardClick,
      onCardLike: handleCardLike,
      onAddClick: handleAddClick,
      onDeleteClick: handleDeleteRequest,
      tempUnit,
      onTempUnitChange: handleTempUnitChange
    }),
    [
      currentUser,
      weatherData,
      clothingItems,
      isLoggedIn,
      isLoadingItems,
      isLoadingWeather,
      handleCardClick,
      handleCardLike,
      handleAddClick,
      handleDeleteRequest,
      tempUnit,
      handleTempUnitChange
    ]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              outletContext={outletContext}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onAddClick={handleAddClick}
              onLogoutClick={handleLogout}
            />
          }
        >
          <Route index element={<Main />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {activeModal === "login" && (
        <LoginModal
          isOpen
          onClose={closeAllModals}
          onSubmit={handleLogin}
          switchToRegister={handleRegisterClick}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          isOpen
          onClose={closeAllModals}
          onSubmit={handleRegister}
          switchToLogin={handleLoginClick}
        />
      )}
      {activeModal === "add" && (
        <AddItemModal isOpen onClose={closeAllModals} onSubmit={handleAddItem} />
      )}
      {activeModal === "preview" && selectedCard && (
        <ItemModal
          isOpen
          card={selectedCard}
          onClose={closeAllModals}
          onDelete={handleDeleteRequest}
          onLike={handleCardLike}
          currentUser={currentUser}
        />
      )}
      {activeModal === "confirmDelete" && cardToDelete && (
        <ConfirmDeleteModal
          isOpen
          onClose={closeAllModals}
          onConfirm={() => handleDeleteItem(cardToDelete)}
        />
      )}
    </CurrentUserContext.Provider>
  );
}
