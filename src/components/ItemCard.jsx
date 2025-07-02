import React from 'react';
import '../blocks/ItemCard.css';
import '../blocks/Cards.css';

function ItemCard({ item, onCardClick, onDeleteClick, needsScaling }) {
  const imageClassName = `card__image${needsScaling ? ' card__image--scaled' : ''}`;

  return (
    <li className="card">
      <div className="card__name-wrapper">
        <p className="card__name">{item.name}</p>
        {item.isOwned && (
          <button
            className="card__delete-button"
            onClick={() => onDeleteClick(item)}
          >
            ✖
          </button>
        )}
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
