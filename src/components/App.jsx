import { useState, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import AddItemModal from './AddItemModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';

import '../blocks/App.css';

import { getWeather } from '../utils/weatherApi';
import { getClothingItems, addClothingItem, deleteClothingItem } from '../utils/clothingApi';
import { getMe } from '../utils/authApi';

import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmDeleting, setConfirmDeleting] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [tempUnit, setTempUnit] = useState('F');

  useEffect(() => {
    const t = localStorage.getItem('jwt');
    if (t) {
      getMe()
        .then(setCurrentUser)
        .catch(() => {
          localStorage.removeItem('jwt');
          setCurrentUser(null);
        });
    } else {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setIsLoadingWeather(true);
        const data = await getWeather();
        if (!ignore) setWeatherData(data);
      } finally {
        if (!ignore) setIsLoadingWeather(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const items = await getClothingItems();
        if (!ignore) setClothingItems(Array.isArray(items) ? items : []);
      } catch (e) {
        console.error(e);
        if (!ignore) setClothingItems([]);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  const tempCtx = useMemo(
    () => ({ currentTemperatureUnit: tempUnit, handleToggleSwitchChange: setTempUnit }),
    [tempUnit],
  );

  const handleAddItemModal = () => setIsAddItemModalOpen(true);

  const handleCloseAllModals = () => {
    setIsItemModalOpen(false);
    setIsAddItemModalOpen(false);
    setIsConfirmModalOpen(false);
    setSelectedCard(null);
    setItemToDelete(null);
    setConfirmDeleting(false);
  };

  const handleAddItemSubmit = async (item) => {
    const created = await addClothingItem(item);
    setClothingItems((prev) => [created, ...prev]);
    handleCloseAllModals();
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const id = itemToDelete?._id || itemToDelete?.id;
    if (!id) return;
    setConfirmDeleting(true);
    const prev = clothingItems;
    setClothingItems((p) => p.filter((ci) => String(ci._id || ci.id) !== String(id)));
    try {
      await deleteClothingItem(id);
      setIsConfirmModalOpen(false);
      setIsItemModalOpen(false);
      setItemToDelete(null);
    } catch (e) {
      setClothingItems(prev);
    } finally {
      setConfirmDeleting(false);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={tempCtx}>
        <div className="app">
          <Header
            onAddItem={handleAddItemModal}
            weatherData={weatherData}
            isLoadingWeather={isLoadingWeather}
          />

          <Outlet
            context={{
              clothingItems,
              setClothingItems,
              onCardClick: (card) => {
                setSelectedCard(card);
                setIsItemModalOpen(true);
              },
              onDeleteClick: handleDeleteClick,
            }}
          />

          <Footer />

          <ItemModal
            isOpen={isItemModalOpen}
            card={selectedCard}
            onClose={handleCloseAllModals}
            onDelete={handleDeleteClick}
          />

          <AddItemModal
            isOpen={isAddItemModalOpen}
            onClose={handleCloseAllModals}
            onAddItem={handleAddItemSubmit}
          />

          <ConfirmDeleteModal
            isOpen={isConfirmModalOpen}
            onClose={handleCloseAllModals}
            onConfirm={handleConfirmDelete}
            loading={confirmDeleting}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
