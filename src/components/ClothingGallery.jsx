import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ClothingGallery = () => {
  console.log('Rendering ClothingGallery');
  const { clothingItems = [], onCardClick, onDeleteClick } = useOutletContext();

  if (clothingItems.length === 0) {
    console.log('No clothing items to show');
  }

  return null;
};

export default ClothingGallery;
