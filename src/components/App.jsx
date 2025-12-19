import { useEffect, useMemo, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Main from './Main.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ItemModal from './ItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import EditProfileModal from './EditProfileModal.jsx';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weather, setWeather] = useState(null);

  const [likePending, setLikePending] = useState(() => new Set());

  const loadAuthedData = useCallback(async () => {
    try {
      const me = await Auth.getUser();
      setCurrentUser(me);
      const list = await Items.getItems();
      setClothingItems(Array.isArray(list) ? list : []);
    } catch {
      setCurrentUser(null);
      setClothingItems([]);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await loadAuthedData();
      } finally {
        if (alive) setIsCheckingAuth(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [loadAuthedData]);

  const handleCardLike = useCallback(async (id, likedByMe) => {
    if (!id) return;
    setLikePending(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    try {
      if (likedByMe) await Items.unlikeItem(id);
      else await Items.likeItem(id);
      const list = await Items.getItems();
      setClothingItems(Array.isArray(list) ? list : []);
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
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!cardToDelete) return;
    await Items.deleteItem(cardToDelete._id || cardToDelete.id);
    const list = await Items.getItems();
    setClothingItems(Array.isArray(list) ? list : []);
    setIsConfirmDeleteOpen(false);
    setSelectedCard(null);
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
      weather,
      currentTemperatureUnit,
    ]
  );

  if (isCheckingAuth) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout outletContext={outletContext} />}>
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

      {selectedCard && (
        <ItemModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onDelete={handleRequestDelete}
          canDelete={
            currentUser &&
            (selectedCard.owner === currentUser._id ||
              selectedCard.owner?._id === currentUser._id)
          }
        />
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSubmit={handleEditProfileSubmit}
        currentUser={currentUser}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
