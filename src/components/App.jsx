import { useEffect, useMemo, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Main from './Main.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ItemModal from './ItemModal.jsx';
import * as Auth from '../utils/authApi.js';
import * as Items from '../utils/itemsApi.js';

export default function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weather, setWeather] = useState(null);

  const [likePending, setLikePending] = useState(() => new Set());

  const loadAuthedData = useCallback(async () => {
    const me = await Auth.getUser();
    setCurrentUser(me);
    if (me) {
      const list = await Items.getItems();
      setClothingItems(Array.isArray(list) ? list : []);
    } else {
      setClothingItems([]);
    }
  }, []);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      setIsSubmitting(true);
      try {
        await Auth.login({ email, password });
        try {
          localStorage.removeItem('loggedOut');
        } catch (e) {
          void e;
        }
        await loadAuthedData();
        setIsLoginOpen(false);
        navigate('/', { replace: true });
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadAuthedData, navigate]
  );

  const handleRegister = useCallback(
    async ({ name, email, password, avatarUrl, city }) => {
      setIsSubmitting(true);
      try {
        await Auth.register({ name, email, password, avatarUrl, city });
        await Auth.login({ email, password });
        try {
          localStorage.removeItem('loggedOut');
        } catch (e) {
          void e;
        }
        await loadAuthedData();
        setIsRegisterOpen(false);
        navigate('/', { replace: true });
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadAuthedData, navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      await Auth.logout();
    } catch (e) {
      void e;
    }
    try {
      localStorage.setItem('loggedOut', '1');
    } catch (e) {
      void e;
    }
    setCurrentUser(null);
    setClothingItems([]);
    setSelectedCard(null);
    navigate('/signin', { replace: true });
  }, [navigate]);

  const handleEditProfile = useCallback(() => {
    alert('Editing profile data is not implemented in this sprint.');
  }, []);

  const handleAddItem = useCallback(
    async ({ name, imageUrl, weather: weatherTag }) => {
      setIsSubmitting(true);
      try {
        await Items.createItem({ name, imageUrl, weather: weatherTag });
        const list = await Items.getItems();
        setClothingItems(Array.isArray(list) ? list : []);
        setIsAddItemOpen(false);
      } catch (e) {
        void e;
      } finally {
        setIsSubmitting(false);
      }
    },
    [setIsSubmitting]
  );

  const handleDeleteItem = useCallback(async item => {
    if (!item) return;
    try {
      await Items.deleteItem(item._id || item.id);
      const list = await Items.getItems();
      setClothingItems(Array.isArray(list) ? list : []);
    } catch (e) {
      void e;
    }
  }, []);

  const handleCardLike = useCallback(async (id, likedByMe) => {
    if (!id) return;
    setLikePending(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    try {
      if (likedByMe) {
        await Items.unlikeItem(id);
      } else {
        await Items.likeItem(id);
      }
      const list = await Items.getItems();
      setClothingItems(Array.isArray(list) ? list : []);
    } catch (e) {
      void e;
    } finally {
      setLikePending(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const openRegisterFromLogin = useCallback(() => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }, []);

  const openLoginFromRegister = useCallback(() => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }, []);

  const outletContext = useMemo(
    () => ({
      currentUser,
      clothingItems,
      onCardClick: setSelectedCard,
      onCardLike: handleCardLike,
      weather,
      setWeather,
      currentTemperatureUnit,
      setCurrentTemperatureUnit,
      onLogoutClick: handleLogout,
      onEditProfileClick: handleEditProfile,
      likePending,
    }),
    [
      currentUser,
      clothingItems,
      handleCardLike,
      weather,
      currentTemperatureUnit,
      handleLogout,
      handleEditProfile,
      likePending,
    ]
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const loggedOutFlag = (() => {
          try {
            return localStorage.getItem('loggedOut');
          } catch (e) {
            void e;
            return null;
          }
        })();
        if (loggedOutFlag === '1') {
          setCurrentUser(null);
          setClothingItems([]);
          return;
        }
        await loadAuthedData();
      } catch (e) {
        void e;
        if (alive) {
          setCurrentUser(null);
          setClothingItems([]);
        }
      } finally {
        if (alive) setIsCheckingAuth(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [loadAuthedData]);

  if (isCheckingAuth) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              outletContext={outletContext}
              onAddClick={() => setIsAddItemOpen(true)}
              onLoginClick={() => setIsLoginOpen(true)}
              onRegisterClick={() => setIsRegisterOpen(true)}
              onLogoutClick={handleLogout}
            />
          }
        >
          <Route index element={<Main />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuth={!!currentUser} redirectTo="/signin">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="signin"
            element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Main initialAuthMode="login" />
              )
            }
          />
          <Route
            path="signup"
            element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Main initialAuthMode="register" />
              )
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSubmit={handleLogin}
          onAltClick={openRegisterFromLogin}
          isSubmitting={isSubmitting}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={handleRegister}
          onAltClick={openLoginFromRegister}
          isSubmitting={isSubmitting}
        />
      )}

      {isAddItemOpen && (
        <AddItemModal
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          onSubmit={handleAddItem}
          isSubmitting={isSubmitting}
        />
      )}

      {selectedCard && (
        <ItemModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onDelete={handleDeleteItem}
          canDelete={
            currentUser &&
            (selectedCard.owner === currentUser._id ||
              selectedCard.owner?._id === currentUser._id)
          }
        />
      )}
    </>
  );
}
