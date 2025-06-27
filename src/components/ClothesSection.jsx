import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/Cards.css';
import '../blocks/ClothesSection.css';

function ClothesSection({
  clothingItems = [],
  onCardClick,
  weatherType,
  title,
  showMessage = true,
}) {
  const filteredItems = clothingItems.filter(
    item => item.weather?.toLowerCase() === weatherType?.toLowerCase()
  );

  return (
    <section className="clothes-section">
      {showMessage && (
        <p className="clothes-section__text">
          {title || `Today is ${weatherType} / You may want to wear:`}
        </p>
      )}
      <div className="main__cards">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))
        ) : (
          <p className="clothes-section__text">
            No matching clothes for this weather.
          </p>
        )}
      </div>
    </section>
  );
}

export default ClothesSection;
