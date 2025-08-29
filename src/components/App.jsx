// src/components/App.jsx
import React, { useState, useEffect } from 'react';
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

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const navigate = useNavigate();

  // ---- User ----
  const [currentUser, setCurrentUser] = useState(null);

  // ---- Weather ----
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // ---- Clothes ----
  const [clothingItems, setClothingItems] = useState([]);

  // ---- Modals ----
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // ---- UI ----
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  // Fallback if weather fails
  const fallbackWeatherData = {
    temperature: 72,
    condition: 'Clear',
    isDay: true,
    timestamp: null,
    sunrise: null,
    sunset: null,
    city: 'Carson City',
  };

  // Toggle F/C
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
      console.error('❌ Error adding item:', err);
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
      console.error('❌ Error deleting item:', err);
    } finally {
      setIsConfirmModalOpen(false);
      setIsItemModalOpen(false);
      setSelectedItem(null);
      setItemToDelete(null);
    }
  };

  const handleLogout = () => navigate('/');

  // ---- Effects ----

  // Load current user (for ownership checks in ItemModal/Profile)
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token || !API_BASE) return;

    fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setCurrentUser)
      .catch((err) => {
        console.error('❌ Failed to load current user:', err);
      });
  }, []);

  // Load weather (already normalized by getWeather)
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
          console.error('❌ Weather fetch failed:', err);
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
  }, []);

  // Load clothing items
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await getClothingItems();
        const normalizedItems = items.map((item) => ({
          ...item,
          weather: typeof item.weather === 'string' ? item.weather.toLowerCase() : item.weather,
        }));
        if (!cancelled) setClothingItems(normalizedItems);
      } catch (err) {
        console.error('❌ Error loading clothing items:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Render ----
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
