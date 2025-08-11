import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import '../blocks/App.css';
import { fetchWeatherData } from '../utils/weatherApi';
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from '../utils/clothingApi';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const fallbackWeatherData = {
    temperature: 72,
    type: 'warm',
    isDay: true,
    condition: 'clear',
    location: 'Carson City',
  };

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

  useEffect(() => {
    setIsLoadingWeather(true);
    fetchWeatherData()
      .then((data) => {
        setWeatherData(data);
        setWeatherError(null);
      })
      .catch(() => {
        setWeatherData(fallbackWeatherData);
        setWeatherError('Unable to load weather');
      })
      .finally(() => setIsLoadingWeather(false));
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getClothingItems();
        const normalizedItems = items.map((item) => ({
          ...item,
          weather: typeof item.weather === 'string' ? item.weather.toLowerCase() : item.weather,
        }));
        setClothingItems(normalizedItems);
      } catch (err) {
        console.error('❌ Error loading clothing items:', err);
      }
    };
    fetchItems();
  }, []);

  return (
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
  );
}

export default App;
