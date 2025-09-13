import "../blocks/ItemCard.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function resolveItemSrc(item) {
  const raw =
    item?.imageUrl ??
    item?.link ??
    item?.image ??
    item?.photoUrl ??
    "";

  if (!raw) return "/placeholder.png";

  const isAbsolute = /^https?:\/\//i.test(raw);
  const startsWithSlash = raw.startsWith("/");
  if (!isAbsolute && !startsWithSlash) {
    return `/${raw.replace(/^\.?\//, "")}`;
  }
  if (startsWithSlash && API_BASE) {
    return `${API_BASE}${raw}`;
  }
  return raw;
}

export default function ItemCard({ item, onCardClick, needsScaling = false }) {
  const src = resolveItemSrc(item);
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
