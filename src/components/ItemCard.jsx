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

  const currentUserId = currentUser?._id || currentUser?.id || null;

  const likes = Array.isArray(item.likes)
    ? item.likes.map(like =>
        typeof like === 'string' ? like : like?._id || like?.id || null
      )
    : [];

  const isLiked = currentUserId ? likes.includes(currentUserId) : false;

  const isPending = likePending?.has?.(itemId);

  const handleLikeClick = e => {
    e.stopPropagation();
    if (!onCardLike || isPending || !currentUserId) return;
    onCardLike(itemId, isLiked);
  };

  return (
    <li className="card">
      <div className="card__meta">
        <span className="card__title">{item.name}</span>

        {currentUserId && (
          <button
            type="button"
            className={`card__like ${isLiked ? 'card__like_active' : ''}`}
            aria-pressed={isLiked}
            onClick={handleLikeClick}
            disabled={isPending}
          />
        )}
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
  item: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    likes: PropTypes.array,
  }).isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
  }),
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func,
  likePending: PropTypes.instanceOf(Set),
};
