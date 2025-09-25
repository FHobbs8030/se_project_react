import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick, needsScaling }) {
  const raw = item?.imageUrl || "";

  // 1) Strip absolute backend URL so proxy can work
  let path = raw.replace(/^https?:\/\/localhost:3001/i, "");

  // 2) If the DB stored just a filename like "tshirt.png", make it a full path
  if (path && !path.startsWith("/")) {
    path = `/images/clothes/${path}`;
  }

  // 3) Map common mismatches to actual filenames you have
  const map = {
    "tshirt.png": "/images/clothes/T-shirt.png",
    "tee.png": "/images/clothes/T-shirt.png",
    "sweatshirt.png": "/images/clothes/hoodie.png", // change target to what you actually have
    "hoodie.png": "/images/clothes/Hoodie.png",     // adjust if you add Hoodie.png
    // add more mappings as needed
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
