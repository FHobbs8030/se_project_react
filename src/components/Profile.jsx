import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({ clothingItems, onCardClick, onAddClick, onLogout }) {
  return (
    <div className="profile">
      <SideBar onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        keyExtractor={(item) => item.id || `${item.name}-${Math.random()}`}
      />
    </div>
  );
}

export default Profile;
