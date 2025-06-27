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
  console.log('🧥 ClothesSection weatherType:', weatherType);
  console.log('👕 ClothesSection clothingItems:', clothingItems);

  const filteredItems = clothingItems.filter(
    item => item.weather?.toLowerCase() === weatherType?.toLowerCase()
  );

  console.log('🎯 Filtered Items:', filteredItems);

  return (
    <section className="clothes-section">
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
