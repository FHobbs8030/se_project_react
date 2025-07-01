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
  const scaleItems = ['Polo Shirt', 'Pants', 'Shoes', 'Ball Caps'];

  const filteredItems = clothingItems.filter(
    item => item.weather?.toLowerCase() === weatherType?.toLowerCase()
  );

  return (
    <section className="clothes-section">
      <div className="main__cards">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              needsScaling={scaleItems.includes(item.name)}
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