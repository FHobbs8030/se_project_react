import PropTypes from "prop-types";
import "../blocks/ItemCard.css";

export default function ItemCard({
  item,
  onCardClick,
  onDeleteClick,
  showDelete = false,
  needsScaling = false,
}) {
  const name = item?.name || "Item";

  const fileGuess =
    name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") + ".png";
  const fileName = item?.imageName || fileGuess;
  const src = `/images/clothes/${fileName}`;

  function handleError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/clothes/tshirt.png";
  }

  return (
    <article
      className={`card${needsScaling ? " card--scaled" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={name}
      onClick={() => onCardClick?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick?.(item);
        }
      }}
    >
      <div className="card__name-wrapper">
        <span className="card__name">{name}</span>
      </div>

      <div className="card__image-container">
        <img
          className="card__image"
          src={src}
          alt={name}
          loading="lazy"
          onError={handleError}
        />
      </div>

      {showDelete && (
        <button
          type="button"
          className="card__delete"
          aria-label={`Delete ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.(item);
          }}
        >
          ×
        </button>
      )}
    </article>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object,
  onCardClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  showDelete: PropTypes.bool,
  needsScaling: PropTypes.bool,
};
