import PropTypes from 'prop-types';
import '../blocks/ItemCard.css';

export default function ItemCard({
  item,
  currentUser,
  onCardClick,
  onCardLike,
  likePending,
}) {
  const itemId = item._id || item.id;
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = currentUser ? likes.includes(currentUser._id) : false;
  const isPending = likePending?.has?.(itemId);

  const handleLikeClick = e => {
    e.stopPropagation();
    if (!onCardLike || isPending) return;
    onCardLike(itemId, isLiked);
  };

  return (
    <li className="card">
      <div className="card__meta">
        <span className="card__title">{item.name}</span>
        <button
          type="button"
          className={`card__like ${isLiked ? 'card__like_active' : ''}`}
          aria-pressed={isLiked}
          onClick={handleLikeClick}
          disabled={isPending}
        />
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func,
  likePending: PropTypes.instanceOf(Set),
};
