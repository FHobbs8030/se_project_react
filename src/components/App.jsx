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
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as Auth from '../utils/authApi.js';
import * as Items from '../utils/itemsApi.js';
import * as Users from '../utils/usersApi.js';
import '../blocks/App.css';
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
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weather, setWeather] = useState(null);

  const loadSession = useCallback(async () => {
    try {
      const me = await Auth.getUser();
      setCurrentUser(me);
    } catch (err) {
      setCurrentUser(null);
    }
  }, []);

  const loadItems = useCallback(async () => {
    try {
      const items = await Items.getItems();
      setClothingItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error(err);
      setClothingItems([]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await loadSession();
        await loadItems();
      } catch (err) {
        console.error(err);
      } finally {
        setIsCheckingAuth(false);
      }
    })();
  }, [loadSession, loadItems]);

  const handleLoginSubmit = useCallback(
    async values => {
      setIsSubmitting(true);
      try {
        await Auth.login(values);
        await loadSession();
        await loadItems();
        setActiveModal(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadSession, loadItems]
  );

  const handleRegisterSubmit = useCallback(
    async values => {
      setIsSubmitting(true);
      try {
        await Auth.register(values);
        await Auth.login({ email: values.email, password: values.password });
        await loadSession();
        await loadItems();
        setActiveModal(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadSession, loadItems]
  );

  const handleAddItemSubmit = useCallback(async values => {
    setIsSubmitting(true);
    try {
      const newItem = await Items.createItem(values);
      setClothingItems(prev => [newItem, ...prev]);
      setActiveModal(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleEditProfileSubmit = useCallback(async values => {
    setIsSubmitting(true);
    try {
      const updatedUser = await Users.updateProfile(values);
      setCurrentUser(updatedUser);
      setActiveModal(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleCardLike = useCallback(
    async card => {
      if (!currentUser) return;
      try {
        const updatedCard = card.isLiked
          ? await Items.removeItemLike(card._id)
          : await Items.addItemLike(card._id);

        setClothingItems(prev =>
          prev.map(item => (item._id === card._id ? updatedCard : item))
        );
      } catch (err) {
        console.error(err);
      }
    },
    [currentUser]
  );

  const outletContext = useMemo(
    () => ({
      currentUser,
      clothingItems,
      onCardClick: setSelectedCard,
      onCardLike: handleCardLike,
      onAddClick: () => setActiveModal('add-item'),
      onEditProfileClick: () => setActiveModal('edit-profile'),
      onLoginClick: () => setActiveModal('login'),
      onRegisterClick: () => setActiveModal('register'),
      onLogoutClick: async () => {
        try {
          await Auth.logout();
          setCurrentUser(null);
        } catch (err) {
          console.error(err);
        }
      },
      weather,
      setWeather,
      currentTemperatureUnit,
      setCurrentTemperatureUnit,
    }),
    [
      currentUser,
      clothingItems,
      weather,
      currentTemperatureUnit,
      handleCardLike,
    ]
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
          currentUser={currentUser}
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
          try {
            await Items.deleteItem(cardToDelete._id);
            setClothingItems(prev =>
              prev.filter(item => item._id !== cardToDelete._id)
            );
          } catch (err) {
            console.error(err);
          } finally {
            setIsConfirmDeleteOpen(false);
            setCardToDelete(null);
          }
        }}
      />

      {activeModal === 'edit-profile' && (
        <EditProfileModal
          isOpen
          onClose={() => setActiveModal(null)}
          onUpdateUser={handleEditProfileSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {activeModal === 'add-item' && (
        <AddItemModal
          isOpen
          onClose={() => setActiveModal(null)}
          onAddItem={handleAddItemSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {activeModal === 'login' && (
        <LoginModal
          isOpen
          onClose={() => setActiveModal(null)}
          onSubmit={handleLoginSubmit}
          onAltClick={() => setActiveModal('register')}
          isSubmitting={isSubmitting}
        />
      )}

      {activeModal === 'register' && (
        <RegisterModal
          isOpen
          onClose={() => setActiveModal(null)}
          onSubmit={handleRegisterSubmit}
          onAltClick={() => setActiveModal('login')}
          isSubmitting={isSubmitting}
        />
      )}
    </CurrentUserContext.Provider>
  );
}
