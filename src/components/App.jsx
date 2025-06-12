import React, { useState, useEffect } from 'react';
import { getClothingItems, addClothingItem, deleteClothingItem } from '../utils/clothingApi';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import '../blocks/App.css';
import { fetchWeatherByCoords } from '../utils/weatherApi';
import AddItemModal from './AddItemModal';
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
      setClothingItems((prevItems) => prevItems.filter((item) => item.id !== id && item._id !== id));
      setIsItemModalOpen(false);
      setIsConfirmModalOpen(false);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => setWeatherData(data))
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
    <CurrentTemperatureUnitContext.Provider value={{ isCelsius, setIsCelsius }}>
      <div className="page">
        <div className="app">
          <div className="app__content">
            <Header onAddClick={handleAddClick}>
              <ToggleSwitch />
            </Header>
            <Main
              weatherData={weatherData}
              clothingItems={clothingItems}
              onCardClick={handleCardClick}
              isCelsius={isCelsius}
              onDeleteItem={(item) => {
                setItemToDelete(item);
                setIsConfirmModalOpen(true);
              }}
            />
            <Footer />
          </div>

          {selectedItem && isItemModalOpen && (
            <ItemModal
              item={selectedItem}
              onClose={handleCloseModal}
              onDelete={() => {
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
              onConfirm={() => handleDeleteItem(itemToDelete._id || itemToDelete.id)}
              onCancel={() => setIsConfirmModalOpen(false)}
            />
          )}
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
