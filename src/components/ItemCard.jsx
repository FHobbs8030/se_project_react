import React from 'react';
import '../blocks/ItemCard.css';

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name || "Clothing item"}
        loading="lazy"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
