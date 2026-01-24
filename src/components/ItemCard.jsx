import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../blocks/ItemCard.css';

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser && item.likes.some(id => id === currentUser._id);

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

        {currentUser && (
          <button
            className={`card__like ${isLiked ? 'is-liked' : ''}`}
            type="button"
            onClick={e => {
              e.stopPropagation();
              onCardLike({ ...item, isLiked });
            }}
          />
        )}
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};
