import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/Profile.css';

function Profile() {
  const { clothingItems, onCardClick, onAddClick, onLogout } = useOutletContext();

  return (
    <div className="profile">
      <SideBar onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
}

export default Profile;
