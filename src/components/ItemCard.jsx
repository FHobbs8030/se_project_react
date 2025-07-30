import React from 'react';
import '../blocks/ItemCard.css';

function ItemCard({ item, onCardClick, needsScaling }) {
  const imageClassName = `card__image${needsScaling ? ' card__image--scaled' : ''}`;

  console.log("Item image:", item.imageUrl);

  return (
    <li className="card">
      <div className="card__name-wrapper">
        <p className="card__name">{item.name}</p>
      </div>
      <div className="card__image-container">
        <img
          className={imageClassName}
          src={item.imageUrl}
          alt={item.name || 'Clothing item'}
          loading="lazy"
          onClick={() => onCardClick(item)}
        />
      </div>
    </li>
  );
}

export default ItemCard;
