import PropTypes from 'prop-types';
import '../blocks/ItemCard.css';

export default function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
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
          className={`card__like ${isLiked ? 'is-liked' : ''}`}
          type="button"
          onClick={e => {
            e.stopPropagation();
            onCardLike(item._id, isLiked);
          }}
        />
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
};
