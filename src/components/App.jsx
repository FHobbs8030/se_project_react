import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import ProfilePage from "./ProfilePage.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import AddItemModal from "./AddItemModal.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL || "";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
const DEFAULT_COORDS = (import.meta.env.VITE_DEFAULT_COORDS || "40.7128,-74.0060").split(",");

function AppInner() {
  const [currentUser, setCurrentUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [tempUnit, setTempUnit] = useState("F");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    setIsLoadingWeather(true);
    (async () => {
      try {
        const [lat, lon] = DEFAULT_COORDS;
        const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setWeatherData(data);
        }
      } finally {
        setIsLoadingWeather(false);
      }
    })();

    setIsLoadingItems(true);
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/items`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data?.data || [];
          setClothingItems(list);
        } else {
          setClothingItems([]);
        }
      } finally {
        setIsLoadingItems(false);
      }
    })();

    if (token && !currentUser) {
      setCurrentUser((u) => u ?? { name: "Fred Hobbs", email: "fred@example.com", avatar: "" });
    }
  }, [currentUser]);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleRegisterOpen = () => setIsRegisterOpen(true);
  const handleRegisterClose = () => setIsRegisterOpen(false);
  const handleAddItemOpen = () => setIsAddItemOpen(true);
  const handleAddItemClose = () => setIsAddItemOpen(false);

  const refreshItems = async (token) => {
    setIsLoadingItems(true);
    try {
      const res = await fetch(`${API_BASE}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data || [];
        setClothingItems(list);
      } else {
        setClothingItems([]);
      }
    } finally {
      setIsLoadingItems(false);
    }
  };

  const handleLoginSubmit = async (values) => {
    localStorage.setItem("jwt", "dummy");
    setCurrentUser({
      name: values?.name || "Fred Hobbs",
      email: values?.email || "fred@example.com",
      avatar: "",
    });
    await refreshItems("dummy");
    setIsLoginOpen(false);
    navigate("/profile");
  };

  const handleRegisterSubmit = async (values) => {
    localStorage.setItem("jwt", "dummy");
    setCurrentUser({
      name: values?.name || "New User",
      email: values?.email || "user@example.com",
      avatar: "",
    });
    await refreshItems("dummy");
    setIsRegisterOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setClothingItems([]);
    navigate("/");
  };

  const handleEditProfileClick = () => {};
  const onCardClick = () => {};
  const onToggleUnit = (next) => setTempUnit(next === "C" ? "C" : "F");

  const outletContext = {
    weatherData,
    clothingItems,
    onCardClick,
    isLoadingWeather,
    isLoadingItems,
    currentUser,
    tempUnit,
    onToggleUnit,
    onLoginClick: handleLoginOpen,
    onRegisterClick: handleRegisterOpen,
    onAddItemOpen: handleAddItemOpen,
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout outletContext={outletContext} />}>
          <Route index element={<Main />} />
          <Route
            path="profile"
            element={
              <ProfilePage
                currentUser={currentUser}
                onLogoutClick={handleLogout}
                onEditProfileClick={handleEditProfileClick}
              />
            }
          />
        </Route>
      </Routes>

      {isLoginOpen && (
        <LoginModal isOpen={isLoginOpen} onClose={handleLoginClose} onSubmit={handleLoginSubmit} />
      )}
      {isRegisterOpen && (
        <RegisterModal isOpen={isRegisterOpen} onClose={handleRegisterClose} onSubmit={handleRegisterSubmit} />
      )}
      {isAddItemOpen && <AddItemModal isOpen={isAddItemOpen} onClose={handleAddItemClose} />}
    </>
  );
}

export default function App() {
  return <AppInner />;
}
