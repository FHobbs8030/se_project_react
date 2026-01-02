import PropTypes from 'prop-types';
import '../blocks/ClothingCard.css';

export default function ClothingCard({
  item,
  onCardClick,
  onAfterToggle,
  currentUser,
}) {
  const name = (item?.name || '').trim();

  const currentUserId = currentUser?._id || currentUser?.id || null;

  const liked =
    Array.isArray(item.likes) && currentUserId
      ? item.likes.some(like => String(like) === String(currentUserId))
      : false;

  function handleToggle(e) {
    e.stopPropagation();
    if (onAfterToggle) {
      onAfterToggle({ ...item, liked: !liked });
    }
  }

  function handleClick() {
    if (onCardClick) {
      onCardClick(item);
    }
  }

  return (
    <li className="card" onClick={handleClick}>
      <div className="card__meta">
        <span className="card__name">{name}</span>
        <button
          type="button"
          className={`card__like-btn ${liked ? 'card__like-btn_liked' : ''}`}
          onClick={handleToggle}
        />
      </div>

      <img
        src={item?.imageUrl || item?.link || ''}
        alt={name}
        className="card__image"
      />
    </li>
  );
}

ClothingCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    likes: PropTypes.array,
  }).isRequired,

  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
  }),

  onCardClick: PropTypes.func.isRequired,
  onAfterToggle: PropTypes.func,
};
