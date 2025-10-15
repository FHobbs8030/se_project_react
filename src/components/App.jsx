import { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import ProfilePage from "./ProfilePage.jsx";
import NotFound from "./NotFound.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import RequireAuth from "./RequireAuth.jsx";
import { USERS_ME } from "../api";
import { normalizeUser } from "../utils/normalizeUser";
import { getItems, likeItem, unlikeItem, deleteItem } from "../utils/itemsApi";
import { getWeather } from "../utils/weatherApi";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const [currentUser, setCurrentUser] = useState(null);
  const [tempUnit, setTempUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token || currentUser) return;
    fetch(USERS_ME, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        const u = normalizeUser(data);
        if (u._id) setCurrentUser(u);
      })
      .catch(() => {});
  }, [currentUser]);

  const isAuthed =
    (!!currentUser && !!currentUser._id) || !!localStorage.getItem("jwt");

  const locationName = import.meta.env.VITE_LOCATION_NAME || "New York";

  useEffect(() => {
    setIsLoadingWeather(true);
    getWeather({
      coords: import.meta.env.VITE_DEFAULT_COORDS,
      city: locationName,
      units: tempUnit === "F" ? "imperial" : "metric",
    })
      .then(setWeatherData)
      .catch(() => setWeatherData(null))
      .finally(() => setIsLoadingWeather(false));
  }, [tempUnit, locationName]);

  const withIsLiked = useCallback(
    (arr) =>
      arr.map((it) => ({
        ...it,
        isLiked: !!(currentUser?._id && it.likes?.some((x) => x === currentUser._id)),
      })),
    [currentUser?._id]
  );

  useEffect(() => {
    setIsLoadingItems(true);
    getItems()
      .then((items) => setClothingItems(withIsLiked(items)))
      .catch(() => setClothingItems([]))
      .finally(() => setIsLoadingItems(false));
  }, [isAuthed, withIsLiked]);

  const onAddItemClick = () => {};
  const onLogoutClick = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };
  const onTempUnitChange = (v) => setTempUnit(v);

  const onCardClick = useCallback(() => {}, []);
  const onLike = useCallback(
    async (item) => {
      const fn = item?.isLiked ? unlikeItem : likeItem;
      const res = await fn(item._id);
      const updated = res.data || res;
      setClothingItems((prev) =>
        withIsLiked(prev.map((it) => (it._id === item._id ? { ...it, ...(updated || {}) } : it)))
      );
    },
    [withIsLiked]
  );
  const onDelete = useCallback(async (item) => {
    await deleteItem(item._id);
    setClothingItems((prev) => prev.filter((it) => it._id !== item._id));
  }, []);

  const layoutProps = useMemo(
    () => ({
      isAuth: isAuthed,
      currentUser,
      setCurrentUser,
      onAddItemClick,
      onLogoutClick,
      locationName,
      tempUnit,
      onTempUnitChange,
      weatherData,
      clothingItems,
      onCardClick,
      onLike,
      onDelete,
      isLoadingWeather,
      isLoadingItems,
    }),
    [
      isAuthed,
      currentUser,
      locationName,
      tempUnit,
      weatherData,
      clothingItems,
      onCardClick,
      onLike,
      onDelete,
      isLoadingWeather,
      isLoadingItems,
    ]
  );

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout {...layoutProps} />}>
          <Route index element={<Main />} />
          <Route
            path="profile"
            element={
              <RequireAuth isAuthed={isAuthed}>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="login" element={<LoginModal />} />
          <Route path="signup" element={<RegisterModal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/signup" element={<RegisterModal />} />
        </Routes>
      )}
    </>
  );
}
