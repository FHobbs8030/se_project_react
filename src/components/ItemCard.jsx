import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick, needsScaling }) {
  const raw = item?.imageUrl || "";
  let path = raw.replace(/^https?:\/\/localhost:3001/i, "");
  if (path && !path.startsWith("/")) path = `/images/clothes/${path}`;

  const map = {
    "tshirt.png": "/images/clothes/T-shirt.png",
    "tee.png": "/images/clothes/T-shirt.png",
    "sweatshirt.png": "/images/clothes/hoodie.png",
    "hoodie.png": "/images/clothes/Hoodie.png",
  };

  const normalized = map[path?.split("/").pop()?.toLowerCase()] || path;
  const src = normalized || "/images/clothes/default.png";
  const className = `card__image${needsScaling ? " card__image--scaled" : ""}`;

  const handleError = (e) => {
    if (!e.currentTarget.dataset.fallback) {
      e.currentTarget.dataset.fallback = "1";
      e.currentTarget.src = "/images/clothes/default.png";
    }
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <div className="card__name-wrapper">
        <span className="card__name">{item?.name || "Item"}</span>
      </div>
      <div className="card__image-container">
        <img
          className={className}
          src={src}
          alt={item?.name || "Item"}
          onError={handleError}
          loading="lazy"
        />
      </div>
    </li>
  );
}

export default ItemCard;
