import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { clothingItems, onCardClick, onAddClick } = useOutletContext();

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    navigate("/");
  };

  return (
    <div className="profile">
      <SideBar onLogout={handleLogout} />

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
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
