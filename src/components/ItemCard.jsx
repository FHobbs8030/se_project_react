// src/components/ItemCard.jsx
import "../blocks/ItemCard.css";

export default function ItemCard({ item, onCardClick, needsScaling = false }) {
  const src = item?.imageUrl || "/placeholder.png";
  const imgClass = `card__image${needsScaling ? " card__image--scaled" : ""}`;

  const handleError = (e) => {
    if (!e.currentTarget.dataset.fallback) {
      e.currentTarget.dataset.fallback = "1";
      e.currentTarget.src = "/placeholder.png";
    }
  };

  return (
    <li className="card" onClick={() => onCardClick?.(item)}>
      <div className="card__name-wrapper">
        <span className="card__name">{item?.name || "Item"}</span>
      </div>

      <div className="card__image-container">
        <img
          className={imgClass}
          src={src}
          alt={item?.name || "Item"}
          onError={handleError}
          loading="lazy"
        />
      </div>
    </li>
  );
}
