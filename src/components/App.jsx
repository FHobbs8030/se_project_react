import { useEffect, useMemo, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Main from './Main.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ItemModal from './ItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import * as Auth from '../utils/authApi.js';
import * as Items from '../utils/itemsApi.js';
import * as Users from '../utils/usersApi.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [cardToDelete, setCardToDelete] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weather, setWeather] = useState(null);

  const [likePending, setLikePending] = useState(() => new Set());

  const loadAuthedData = useCallback(async () => {
    try {
      const me = await Auth.getUser();
      const items = await Items.getItems();
      setCurrentUser(me);
      setClothingItems(Array.isArray(items) ? items : []);
    } catch {
      setCurrentUser(null);
      setClothingItems([]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadAuthedData();
      setIsCheckingAuth(false);
    })();
  }, [loadAuthedData]);

  const handleLoginSubmit = useCallback(
    async values => {
      setIsSubmitting(true);
      try {
        await Auth.login(values);
        await loadAuthedData();
        setIsLoginOpen(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadAuthedData]
  );

  const handleRegisterSubmit = useCallback(
    async values => {
      setIsSubmitting(true);
      try {
        await Auth.register(values);
        await Auth.login({ email: values.email, password: values.password });
        await loadAuthedData();
        setIsRegisterOpen(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadAuthedData]
  );

  const handleLogout = useCallback(async () => {
    await Auth.logout();
    setCurrentUser(null);
    setClothingItems([]);
  }, []);

  const handleAddItemSubmit = useCallback(async values => {
    setIsSubmitting(true);
    try {
      const newItem = await Items.createItem(values);
      setClothingItems(prev => [newItem, ...prev]);
      setIsAddItemOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleCardLike = useCallback(async (id, likedByMe) => {
    if (!id) return;
    setLikePending(prev => new Set(prev).add(id));
    try {
      const updated = likedByMe
        ? await Items.unlikeItem(id)
        : await Items.likeItem(id);

      setClothingItems(prev =>
        prev.map(item => (item._id === updated._id ? updated : item))
      );
    } finally {
      setLikePending(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const handleEditProfileSubmit = useCallback(async values => {
    setIsSubmitting(true);
    try {
      const updatedUser = await Users.updateProfile(values);
      setCurrentUser(updatedUser);
      setIsEditProfileOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleRequestDelete = useCallback(card => {
    setSelectedCard(null);
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!cardToDelete) return;
    await Items.deleteItem(cardToDelete._id);
    setClothingItems(prev => prev.filter(i => i._id !== cardToDelete._id));
    setIsConfirmDeleteOpen(false);
    setCardToDelete(null);
  }, [cardToDelete]);

  const outletContext = useMemo(
    () => ({
      currentUser,
      clothingItems,
      onCardClick: setSelectedCard,
      onCardLike: handleCardLike,
      likePending,
      onEditProfileClick: () => setIsEditProfileOpen(true),
      onAddClick: () => setIsAddItemOpen(true),
      onLogoutClick: handleLogout,
      onLoginClick: () => setIsLoginOpen(true),
      onRegisterClick: () => setIsRegisterOpen(true),
      weather,
      setWeather,
      currentTemperatureUnit,
      setCurrentTemperatureUnit,
    }),
    [
      currentUser,
      clothingItems,
      handleCardLike,
      likePending,
      handleLogout,
      weather,
      currentTemperatureUnit,
    ]
  );

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
              <ProtectedRoute isAuth={!!currentUser} redirectTo="/">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {selectedCard && !isConfirmDeleteOpen && (
        <ItemModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onRequestDelete={handleRequestDelete}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setCardToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSubmit={handleEditProfileSubmit}
        currentUser={currentUser}
        isSubmitting={isSubmitting}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItemSubmit}
        isSubmitting={isSubmitting}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleLoginSubmit}
        onAltClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        isSubmitting={isSubmitting}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={handleRegisterSubmit}
        onAltClick={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
