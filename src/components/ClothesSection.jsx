import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/Cards.css';
import '../blocks/ClothesSection.css';

function ClothesSection({
  clothingItems = [],
  onCardClick,
  onDeleteItem,
  title,
  showMessage = true,
  showDelete = false,
}) {
  return (
    <section className="clothes-section">
      {showMessage && <p className="clothes-section__title">{title}</p>}
      <div className="main__cards">
        {clothingItems.length > 0 ? (
          clothingItems.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onDeleteClick={onDeleteItem}
              showDelete={showDelete}
              needsScaling={false}
            />
          ))
        ) : (
          <p>No items to show.</p>
        )}
      </div>
    </section>
  );
}

export default ClothesSection;
