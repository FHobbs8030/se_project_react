import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import AddItemModal from "./AddItemModal.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    api.getMe().then(setCurrentUser).catch(() => localStorage.removeItem("jwt"));
  }, []);

  useEffect(() => {
    setIsLoadingItems(true);
    api.getItems().then((items) => setClothingItems(items.reverse()))
      .finally(() => setIsLoadingItems(false));
  }, []);

  function handleRegister(data) {
    api.register(data)
      .then(() => handleLogin({ email: data.email, password: data.password }))
      .catch(() => {});
  }

  function handleLogin(data) {
    api.login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return api.getMe();
      })
      .then((me) => {
        setCurrentUser(me);
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
        navigate("/profile", { replace: true });
      })
      .catch(() => {});
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/", { replace: true });
  }

  function handleAddItem({ name, weather, imageUrl }) {
    api.addItem({ name, weather, imageUrl })
      .then((item) => setClothingItems((prev) => [item, ...prev]))
      .finally(() => setIsAddOpen(false));
  }

  function handleCardUpdated(updated) {
    setClothingItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
  }

  function handleCardRemoved(id) {
    setClothingItems((prev) => prev.filter((i) => i._id !== id));
  }

  return (
    <>
      <Header
        isAuth={!!currentUser}
        currentUser={currentUser}
        onAddItemClick={() => setIsAddOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogoutClick={handleLogout}
        locationName={import.meta.env.VITE_LOCATION_NAME || "New York"}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              clothingItems={clothingItems}
              currentUser={currentUser}
              onCardClick={() => {}}
              onCardUpdated={handleCardUpdated}
              onCardRemoved={handleCardRemoved}
              isLoadingItems={isLoadingItems}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                currentUser={currentUser}
                clothingItems={clothingItems.filter((i) => i.owner === currentUser?._id)}
                onCardUpdated={handleCardUpdated}
                onCardRemoved={handleCardRemoved}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <AddItemModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddItem}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleLogin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={handleRegister}
      />
    </>
  );
}
