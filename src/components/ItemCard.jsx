import React from "react";
import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div
      className="card"
      onClick={() => {
        console.log("Card clicked!", item.name);
        onCardClick(item);
      }}
    >
      <div className="card__name">{item.name}</div>
      <div className="card__image-container">
        <img
          src={item.imageUrl || item.link}
          alt={item.name}
          className="card__image"
        />
      </div>
    </div>
  );
}

export default ItemCard;
