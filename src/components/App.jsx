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

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(prev => (prev === 'F' ? 'C' : 'F'));

  const fallbackWeatherData = {
    temperature: 72,
    type: 'warm',
    isDay: true,
    condition: 'clear',
    location: 'Carson City',
  };

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setIsConfirmModalOpen(false);
    setSelectedItem(null);
  };

  const handleCardClick = item => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = async newItem => {
    try {
      const savedItem = await addClothingItem(newItem);
      setClothingItems([savedItem, ...clothingItems]);
      handleCloseModal();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleDeleteItem = async id => {
    try {
      await deleteClothingItem(id);
      setClothingItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleLogout = () => navigate('/');

  useEffect(() => {
    setIsLoadingWeather(true);
    fetchWeatherData()
      .then(data => {
        setWeatherData(data);
        setWeatherError(null);
      })
      .catch(() => {
        setWeatherError('Unable to load weather');
        setWeatherData(fallbackWeatherData);
      })
      .finally(() => setIsLoadingWeather(false));
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getClothingItems();
        setClothingItems(items);
      } catch (err) {
        console.error('Error loading clothing items:', err);
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
            <Header onAddClick={handleAddClick} />
            <Outlet
              context={{
                weatherData,
                clothingItems,
                onCardClick: handleCardClick,
                onDeleteClick: item => {
                  setItemToDelete(item);
                  setIsConfirmModalOpen(true);
                },
                isLoadingWeather,
                weatherError,
                onAddClick: handleAddClick,
              }}
            />
            <Footer />
          </div>
        </div>

        {selectedItem && isItemModalOpen && (
          <ItemModal
            item={selectedItem}
            onClose={handleCloseModal}
            onConfirmDelete={() => {
              setItemToDelete(selectedItem);
              setIsConfirmModalOpen(true);
            }}
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
            onConfirm={() => {
              const deleteId = itemToDelete?.id;
              if (deleteId) {
                handleDeleteItem(deleteId);
                setIsConfirmModalOpen(false);
              }
            }}
            onCancel={handleCloseModal}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
