import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import '../blocks/App.css';

import { fetchWeather } from '../utils/weatherApi.js';
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from '../utils/clothingApi.js';
import { getMe } from '../utils/authApi.js';

import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const fallbackWeatherData = useMemo(() => ({ city: 'Carson City' }), []);

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(prev => (prev === 'F' ? 'C' : 'F'));

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setIsConfirmModalOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
  };

  const handleCardClick = item => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = async newItem => {
    try {
      const savedItem = await addClothingItem(newItem);
      setClothingItems(prev => [savedItem, ...prev]);
      handleCloseModal();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const requestDeleteItem = item => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = itemToDelete?._id || itemToDelete?.id;
      if (id) {
        await deleteClothingItem(id);
        setClothingItems(prev =>
          prev.filter(ci => ci._id !== id && ci.id !== id)
        );
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
      } catch {
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
        if (!cancelled) {
          setCity(wx?.name || fallbackWeatherData.city);
          setWeather(wx || null);
        }
      } catch {
        if (!cancelled) {
          setCity(fallbackWeatherData.city);
          setWeather(null);
        }
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

        const nameToFile = {
          't-shirt': '/images/clothes/T-shirt.png',
          't shirt': '/images/clothes/T-shirt.png',
          tshirt: '/images/clothes/T-shirt.png',
          tee: '/images/clothes/T-shirt.png',
          shorts: '/images/clothes/shorts.png',
          sneakers: '/images/clothes/sneakers.png',
          shoes: '/images/clothes/shoes.png',
          cap: '/images/clothes/cap.png',
          'vintage cap': '/images/clothes/Vintage_Cap.png',
          jeans: '/images/clothes/jeans.png',
        };

        const normalizedItems = items.map(item => {
          let raw = item.imageUrl ?? item.link ?? '';

          if (!raw && item.name) {
            const key = String(item.name).toLowerCase().trim();
            raw = nameToFile[key] || '';
          }

          if (raw && /^\/images\/(?!clothes\/)/i.test(raw)) {
            const filename = raw.split('/').pop();
            raw = `/images/clothes/${filename}`;
          }

          const isHttp = /^https?:\/\//i.test(raw);
          let resolved = raw;

          if (!raw) {
            resolved = '';
          } else if (isHttp) {
            resolved = raw;
          } else if (raw.startsWith('/images/')) {
            resolved = raw;
          } else if (raw.startsWith('/')) {
            resolved = API_BASE ? `${API_BASE}${raw}` : raw;
          } else {
            resolved = `/${raw.replace(/^\.?\//, '')}`;
          }

          return {
            ...item,
            imageUrl: resolved || '/placeholder.png',
            weather:
              typeof item.weather === 'string'
                ? item.weather.toLowerCase().trim()
                : item.weather,
          };
        });

        if (!cancelled) {
          console.table(
            normalizedItems.map(i => ({
              name: i.name,
              imageUrl: i.imageUrl,
              weather: i.weather,
            }))
          );
          setClothingItems(normalizedItems);
        }
      } catch (err) {
        console.error('Error loading clothing items:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    window.__ctx = { clothingItems, currentUser };
  }, [clothingItems, currentUser]);

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
                  weather,
                  city,
                  currentTemperatureUnit,
                }}
              />
              <Footer />
            </div>
          </div>

          {isItemModalOpen && selectedItem && !isConfirmModalOpen && (
            <ItemModal
              item={selectedItem}
              onClose={handleCloseModal}
              onConfirmDelete={itm => requestDeleteItem(itm)}
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
