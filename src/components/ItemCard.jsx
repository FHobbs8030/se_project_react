import React from 'react';
import '../blocks/ItemCard.css';
import '../blocks/Cards.css';

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      <div className="card__image-container">
        <img
          className="card__image"
          src={item.imageUrl}
          alt={item.name || "Clothing item"}
          loading="lazy"
          onClick={() => onCardClick(item)}
        />
      </div>
    </li>
  );
}

export default ItemCard;
