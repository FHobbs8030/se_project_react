import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import Profile from "./Profile.jsx";
import Main from "./Main.jsx";
import NotFound from "./NotFound.jsx";
import "../blocks/App.css";

import { fetchWeatherByCoords, filterWeatherData } from "../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../utils/clothingApi";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const fallbackWeatherData = {
    temperature: 72,
    type: "warm",
    isDay: true,
    condition: "clear",
    location: "Carson City",
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
      console.error("Error adding item:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteClothingItem(id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => {
        try {
          const filtered = filterWeatherData(data);
          console.log("🌤 Filtered weather data:", filtered);
          setWeatherData(filtered);
        } catch (e) {
          console.warn("⚠️ Weather data format error, using fallback.");
          setWeatherData(fallbackWeatherData);
        }
      })
      .catch((err) => {
        console.error("❌ Weather fetch failed, using fallback:", err);
        setWeatherData(fallbackWeatherData);
      });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getClothingItems();
        setClothingItems(items);
      } catch (err) {
        console.error("Error loading clothing items:", err);
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
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                    onLogout={handleLogout}
                    onDeleteItem={handleDeleteItem}
                    weatherData={weatherData}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
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
              if (itemToDelete?.id) {
                handleDeleteItem(itemToDelete.id);
                setIsConfirmModalOpen(false);
                setIsItemModalOpen(false);
              } else {
                console.error("No valid ID for deletion.");
              }
            }}
            onCancel={() => setIsConfirmModalOpen(false)}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
