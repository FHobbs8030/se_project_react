import React from 'react';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/Profile.css';

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onLogout,
  onDeleteItem,
  weatherData,
}) {
  // Derive weatherType from weatherData.condition and temperature
  let weatherType = 'warm'; // fallback

  if (weatherData?.condition === 'snow' || weatherData?.temperature < 50) {
    weatherType = 'cold';
  } else if (weatherData?.condition === 'rain' || weatherData?.temperature > 75) {
    weatherType = 'hot';
  }

  return (
    <div className="profile">
      <SideBar onLogout={onLogout} />

      <div className="profile-main">
        <div className="profile-content">
          <div className="profile-header">
            <p className="profile-header__title">Your items</p>
            <button className="profile-header__add-button" onClick={onAddClick}>
              + Add new
            </button>
          </div>

          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            onAddClick={onAddClick}
            onDeleteItem={onDeleteItem}
            weatherType={weatherType}
            showMessage={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
