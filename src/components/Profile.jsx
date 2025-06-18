import React from "react";
import { useOutletContext } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";
import "../blocks/Profile.css";

function Profile() {
  const { clothingItems, onCardClick, onAddClick } = useOutletContext();

  return (
    <div className="profile">
      <SideBar onLogout={() => console.log("Log out clicked")} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
}

export default Profile;
