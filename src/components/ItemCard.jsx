import React from 'react';
import '../blocks/ItemCard.css';

function ItemCard({ item, onCardClick, needsScaling }) {
  const imageClassName = `card__image${needsScaling ? ' card__image--scaled' : ''}`;

  const src = item?.imageUrl || '/placeholder.png';

  const handleError = (e) => {
    if (!e.currentTarget.dataset.fallback) {
      e.currentTarget.dataset.fallback = '1';
      e.currentTarget.src = '/placeholder.png';
    }
  };

  return (
    <li className="card">
      <div className="card__name-wrapper">
        <p className="card__name">{item?.name ?? 'Clothing item'}</p>
      </div>
      <div className="card__image-container">
        <img
          className={imageClassName}
          src={src}
          alt={item?.name || 'Clothing item'}
          loading="lazy"
          onError={handleError}
          onClick={() => onCardClick(item)}
        />
      </div>
    </li>
  );
}

export default ItemCard;
