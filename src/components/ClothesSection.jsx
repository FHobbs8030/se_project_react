import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/ClothesSection.css';

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onDeleteItem,
}) {
  return (
    <section className="clothes-section">
      {!clothingItems ? (
        <p>Loading your clothes...</p>
      ) : clothingItems.length === 0 ? (
        <p>You haven't added any items yet.</p>
      ) : (
        <div className="clothes-grid">
          {clothingItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ClothesSection;
