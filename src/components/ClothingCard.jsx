// src/components/ClothingCard.jsx
import PropTypes from "prop-types";

export default function ClothingCard({ item, onClick, showDelete = false, onDelete }) {
  const fallback = "/images/clothes/placeholder.png";

  const handleError = (e) => {
    // swap to fallback only once to avoid loops
    if (!e.currentTarget.dataset.fallbackApplied) {
      e.currentTarget.src = fallback;
      e.currentTarget.dataset.fallbackApplied = "1";
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKey}
    >
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name || "Clothing item"}
        draggable="false"
        onError={handleError}
      />
      <span className="card__title">{item.name}</span>

      {showDelete && (
        <button
          className="card__delete"
          type="button"
          aria-label={`Delete ${item.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(item);
          }}
        >
          Delete
        </button>
      )}
    </article>
  );
}

ClothingCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    weather: PropTypes.oneOf(["hot", "warm", "cold"]),
    owner: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  onClick: PropTypes.func,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};
