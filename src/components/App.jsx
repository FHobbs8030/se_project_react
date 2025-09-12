import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';

import '../blocks/App.css';

import { fetchWeather } from '../utils/weatherApi';
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from '../utils/clothingApi';
import { getMe } from '../utils/authApi';

import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [city, setCity] = useState('');

  const [clothingItems, setClothingItems] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const fallbackWeatherData = useMemo(
    () => ({ city: 'Carson City' }),
    []
  );

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === 'F' ? 'C' : 'F'));

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setIsConfirmModalOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = async (newItem) => {
    try {
      const savedItem = await addClothingItem(newItem);
      setClothingItems((prev) => [savedItem, ...prev]);
      handleCloseModal();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const requestDeleteItem = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = itemToDelete?._id || itemToDelete?.id;
      if (id) {
        await deleteClothingItem(id);
        setClothingItems((prev) => prev.filter((ci) => ci._id !== id && ci.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    } finally {
      setIsConfirmModalOpen(false);
      setIsItemModalOpen(false);
      setSelectedItem(null);
      setItemToDelete(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    window.dispatchEvent(new Event('auth-changed'));
    navigate('/signin', { replace: true });
  };

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setCurrentUser(null);
        return;
      }
      try {
        const me = await getMe();
        setCurrentUser(me);
      } catch (e) {
        console.error('Failed to load current user:', e);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      }
    }
    loadUser();
    const onAuth = () => loadUser();
    window.addEventListener('auth-changed', onAuth);
    return () => window.removeEventListener('auth-changed', onAuth);
  }, []);

  useEffect(() => {
    const onFocus = () => {
      if (localStorage.getItem('jwt')) {
        getMe().then(setCurrentUser).catch(() => {});
      }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const wx = await fetchWeather();
        if (!cancelled) setCity(wx?.name || fallbackWeatherData.city);
      } catch {
        if (!cancelled) setCity(fallbackWeatherData.city);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fallbackWeatherData]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await getClothingItems();
        const normalizedItems = items.map((item) => {
          const raw = item.imageUrl ?? item.link ?? item.image ?? '';
          const absolute =
            typeof raw === 'string' && raw.startsWith('/') && API_BASE
              ? `${API_BASE}${raw}`
              : raw;
          return {
            ...item,
            imageUrl: absolute,
            weather:
              typeof item.weather === 'string' ? item.weather.toLowerCase() : item.weather,
          };
        });
        if (!cancelled) setClothingItems(normalizedItems);
      } catch (err) {
        console.error('Error loading clothing items:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="app">
            <div className="app__content">
              <Header
                onAddClick={handleAddClick}
                onLogout={handleLogout}
                locationText={city}
              />

              <Outlet
                context={{
                  clothingItems,
                  onCardClick: handleCardClick,
                  onDeleteClick: requestDeleteItem,
                  onAddClick: handleAddClick,
                  currentUser,
                }}
              />

              <Footer />
            </div>
          </div>

          {isItemModalOpen && selectedItem && !isConfirmModalOpen && (
            <ItemModal
              item={selectedItem}
              onClose={handleCloseModal}
              onConfirmDelete={(itm) => requestDeleteItem(itm)}
            />
          )}

          {isAddModalOpen && (
            <AddItemModal
              isOpen={isAddModalOpen}
              onCloseModal={handleCloseModal}
              onAddItem={handleAddGarmentSubmit}
            />
          )}

          {isConfirmModalOpen && (
            <ConfirmDeleteModal
              isOpen={isConfirmModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
