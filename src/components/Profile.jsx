import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/Profile.css';

function Profile({ onLogout, onDeleteItem }) {
  const {
    weatherData,
    clothingItems,
    onCardClick,
    onAddClick, // ✅ destructure it here
  } = useOutletContext();

  let weatherType = 'warm';
  const temp = weatherData?.temperature;

  if (temp < 60) {
    weatherType = 'cold';
  } else if (temp >= 60 && temp <= 75) {
    weatherType = 'warm';
  } else {
    weatherType = 'hot';
  }

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
            onDeleteItem={onDeleteItem}
            weatherType={weatherType}
            showMessage={true}
            title={`Filtered clothing for ${weatherType} weather`}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
