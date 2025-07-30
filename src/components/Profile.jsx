import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/Profile.css';

function Profile({ onLogout }) {
  const {
    weatherData,
    clothingItems,
    onCardClick,
    onAddClick,
    onDeleteClick,
  } = useOutletContext();

  console.log("Clothing Items in Profile:", clothingItems);

  // Optional: log inside ClothesSection via callback prop to track rendering
  const logItems = (items) => {
    console.log('ClothesSection will render these items:', items);
    return null;
  };

  return (
    <div className="profile">
      <SideBar onLogout={onLogout} />
      <div className="profile-main">
        <div className="profile-content">
          <div className="profile-header">
            <p className="profile-header__title">Your items</p>
            <button
              className="profile-header__add-button"
              onClick={onAddClick}
            >
              + Add new
            </button>
          </div>

          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            onAddClick={onAddClick}
            onDeleteItem={onDeleteClick}
            showDelete={true}
          />
          {/* This is just for debugging and won't render anything visible */}
          {logItems(clothingItems)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
