// src/components/App.jsx
import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';

import '../blocks/App.css';

import { getWeather } from '../utils/weatherApi';
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from '../utils/clothingApi';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const fallbackWeatherData = useMemo(
    () => ({
      temperature: 72,
      condition: 'Clear',
      isDay: true,
      timestamp: null,
      sunrise: null,
      sunset: null,
      city: 'Carson City',
    }),
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

  const handleLogout = () => navigate('/');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token || !API_BASE) return;

    fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setCurrentUser)
      .catch((err) => {
        console.error('Failed to load current user:', err);
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoadingWeather(true);
      try {
        const normalized = await getWeather();
        if (!cancelled) {
          setWeatherData(normalized);
          setWeatherError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setWeatherData(fallbackWeatherData);
          setWeatherError('Unable to load weather');
        }
      } finally {
        if (!cancelled) setIsLoadingWeather(false);
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
              <Header onAddClick={handleAddClick} onLogout={handleLogout} />

              <Outlet
                context={{
                  weatherData,
                  clothingItems,
                  onCardClick: handleCardClick,
                  onDeleteClick: requestDeleteItem,
                  isLoadingWeather,
                  weatherError,
                  onAddClick: handleAddClick,
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
              showDelete
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
