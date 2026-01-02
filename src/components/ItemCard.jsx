import PropTypes from 'prop-types';

export default function ItemCard({ item, onCardClick, isLiked }) {
  const scale =
    item?.scale === 'down' ? 'down' : item?.scale === 'up' ? 'up' : 'normal';

  return (
    <li className="card" data-scale={scale}>
      <button
        className="card__image-button"
        type="button"
        onClick={() => onCardClick(item)}
      >
        <div className="card__surface" />
        <div className="card__image-wrap">
          <img className="card__image" src={item.imageUrl} alt={item.name} />
        </div>
      </button>

      <div className="card__meta">
        <span className="card__title">{item.name}</span>
        <button
          className={`card__like ${isLiked ? 'card__like_active' : ''}`}
          type="button"
        />
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
};
