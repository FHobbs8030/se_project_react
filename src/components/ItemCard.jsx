import PropTypes from 'prop-types';
import '../blocks/Card.css';

export default function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
  const id = item?._id || item?.id;
  const name = item?.name || '';
  const type = (item?.name || '').toLowerCase();
  const src = item?.imageUrl || null;
  const likeId = id;
  const canLike = !!likeId;

  return (
    <li
      className="card"
      data-type={type}
      onClick={() => onCardClick && onCardClick(item)}
      role="button"
      tabIndex={0}
    >
      <div className="card__meta">
        <div className="card__title">{name}</div>
        <button
          type="button"
          className={`card__like ${isLiked ? 'is-liked' : ''}`}
          aria-pressed={isLiked}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          disabled={!canLike}
          onClick={e => {
            e.stopPropagation();
            if (!canLike) return;
            onCardLike && onCardLike(likeId, isLiked);
          }}
        />
      </div>
      {src && <img src={src} alt={name} className="card__image" />}
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string,
    owner: PropTypes.string,
    focusY: PropTypes.number,
  }).isRequired,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  isLiked: PropTypes.bool,
};
