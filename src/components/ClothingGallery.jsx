import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ClothingGallery = () => {
  const { clothingItems, onCardClick, onDeleteClick } = useOutletContext();

  return (
    <div>
      <h2>Clothing Items</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {clothingItems.map(item => (
          <li
            key={item._id}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => onCardClick(item)}
          >
            <img src={item.imageUrl} alt={item.name} width={100} />
            <p>{item.name} - {item.weather}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening modal on delete button click
                onDeleteClick(item);
              }}
              style={{ marginTop: '0.5rem' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClothingGallery;
