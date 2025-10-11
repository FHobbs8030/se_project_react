import PropTypes from "prop-types";

export default function ClothingCard({ item, onCardClick }) {
  const name = (item?.name || "").trim();

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <span className="card__badge" aria-hidden="true">{name}</span>
      <img
        className={`card__image card__image--${name.toLowerCase().replace(/\s+/g, "-")}`}
        src={item.imageUrl}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/placeholder.svg";
        }}
      />
    </li>
  );
}

ClothingCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string,
    owner: PropTypes.object,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
