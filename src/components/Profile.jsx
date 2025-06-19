import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onLogout,
  onDeleteItem,
  weatherData
}) {
  return (
    <div className="profile">
      <SideBar onLogout={onLogout} />

      <div className="profile-main">
        <div className="profile-header">
          <p className="your-items-title">Your items</p>
          <button className="add-new-button" onClick={onAddClick}>
            + Add New
          </button>
        </div>

        <div className="clothing-section">
          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            onAddClick={onAddClick}
            onDeleteItem={onDeleteItem}
            weatherType={weatherData?.type}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
