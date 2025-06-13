import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import AddItemModal from './AddItemModal';
import Profile from './Profile.jsx';
import '../blocks/App.css';
import { fetchWeatherByCoords, filterWeatherData } from '../utils/weatherApi';
import { getClothingItems, addClothingItem, deleteClothingItem } from '../utils/clothingApi';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fallbackWeatherData = {
    temperature: null,
    isDay: true,
    location: 'Unknown',
  };

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setSelectedItem(null);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = async (newItem) => {
    try {
      const savedItem = await addClothingItem(newItem);
      setClothingItems([savedItem, ...clothingItems]);
      handleCloseModal();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteClothingItem(id);
      setClothingItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch((err) => {
        console.error('Weather fetch error:', err);
        setWeatherData(fallbackWeatherData);
      });
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
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider value={{ isCelsius, setIsCelsius }}>
        <div className="page">
          <div className="app">
            <div className="app__content">
              <Header onAddClick={handleAddClick}>
                <ToggleSwitch />
              </Header>

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      isCelsius={isCelsius}
                    />
                  }
                />
                <Route path="/profile" element={<Profile />} />
              </Routes>

              <Footer />
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
                  if (itemToDelete?.id) {
                    handleDeleteItem(itemToDelete.id);
                    setIsConfirmModalOpen(false);
                    setIsItemModalOpen(false);
                  } else {
                    console.error('No valid ID for deletion.');
                  }
                }}
                onCancel={() => setIsConfirmModalOpen(false)}
              />
            )}
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
