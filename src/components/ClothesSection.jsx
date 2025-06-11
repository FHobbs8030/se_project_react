import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/ClothesSection.css';

function ClothesSection({ clothingItems, onCardClick, onAddClick, onDeleteItem }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
