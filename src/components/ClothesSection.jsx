import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/Cards.css';
import '../blocks/ClothesSection.css';

function ClothesSection({
  clothingItems = [],
  onCardClick,
  onDeleteItem,
  weatherType,
  title,
  showMessage = true,
  showDelete = false,
}) {
  const scaleItems = ['Polo Shirt', 'Pants', 'Shoes', 'Ball Caps'];

  const filteredItems = clothingItems.filter(
    item => item.weather?.toLowerCase() === weatherType?.toLowerCase()
  );

  return (
    <section className="clothes-section">
      {showMessage && (
        <p className="clothes-section__title">{title}</p>
      )}
      <div className="main__cards">
        {filteredItems.length > 0 &&
          filteredItems.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onDeleteClick={onDeleteItem}
              needsScaling={scaleItems.includes(item.name)}
              showDelete={showDelete}
            />
          ))}
      </div>
    </section>
  );
}

export default ClothesSection;
