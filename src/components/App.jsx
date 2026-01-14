import { useEffect, useMemo, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Main from './Main.jsx';
import Profile from './Profile.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ItemModal from './ItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as Auth from '../utils/authApi.js';
import * as Items from '../utils/itemsApi.js';
import * as Users from '../utils/usersApi.js';
import '../blocks/App.css';
import '../blocks/AuthModal.css';
import '../blocks/Cards.css';
import '../blocks/Header.css';
import '../blocks/ProfilePage.css';
import '../blocks/global.css';
import '../blocks/layout.css';
import '../blocks/tokens.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weather, setWeather] = useState(null);

  const loadSession = useCallback(async () => {
    try {
      const me = await Auth.getUser();
      setCurrentUser(me);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  const loadItems = useCallback(async () => {
    try {
      const items = await Items.getItems();
      setClothingItems(Array.isArray(items) ? items : []);
    } catch {
      setClothingItems([]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await loadSession();
        await loadItems();
      } finally {
        setIsCheckingAuth(false);
      }
    })();
  }, [loadSession, loadItems]);

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

  const outletContext = useMemo(
    () => ({
      clothingItems,
      onCardClick: setSelectedCard,
      onEditProfileClick: () => setIsEditProfileOpen(true),
      onAddClick: () => setIsAddItemOpen(true),
      onLogoutClick: async () => {
        await Auth.logout();
        setCurrentUser(null);
        setClothingItems([]);
      },
      weather,
      setWeather,
      currentTemperatureUnit,
      setCurrentTemperatureUnit,
    }),
    [clothingItems, weather, currentTemperatureUnit]
  );

  if (isCheckingAuth) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Layout outletContext={outletContext} />}>
          <Route index element={<Main />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuth={!!currentUser} redirectTo="/">
                <Profile />
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
          onRequestDelete={card => {
            setSelectedCard(null);
            setCardToDelete(card);
            setIsConfirmDeleteOpen(true);
          }}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setCardToDelete(null);
        }}
        onConfirm={async () => {
          if (!cardToDelete) return;
          await Items.deleteItem(cardToDelete._id);
          setClothingItems(prev =>
            prev.filter(i => i._id !== cardToDelete._id)
          );
          setIsConfirmDeleteOpen(false);
          setCardToDelete(null);
        }}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdateUser={handleEditProfileSubmit}
        isSubmitting={isSubmitting}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItemSubmit}
        isSubmitting={isSubmitting}
      />
    </CurrentUserContext.Provider>
  );
}
