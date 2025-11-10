import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import '../blocks/Cards.css';
import '../blocks/ClothesSection.css';

const FALLBACK = {
  tshirt: '/images/clothes/tshirt.png',
  tee: '/images/clothes/tshirt.png',
  tshirts: '/images/clothes/tshirt.png',
  shirt: '/images/clothes/tshirt.png',
  top: '/images/clothes/tshirt.png',
  sneakers: '/images/clothes/sneakers.png',
  cap: '/images/clothes/cap.png',
  hat: '/images/clothes/cap.png',
  beanie: '/images/clothes/beanie.png',
  boots: '/images/clothes/boots.png',
  jacket: '/images/clothes/jacket.png',
  hoodie: '/images/clothes/hoodie.png',
  jeans: '/images/clothes/jeans.png',
  shoes: '/images/clothes/shoes.png',
  shorts: '/images/clothes/shorts.png',
  'vintage cap': '/images/clothes/Vintage_Cap.png',
};

export default function ClothesSection({
  clothingItems = [],
  onCardClick,
  onCardLike,
  isLoadingItems = false,
  currentUser,
}) {
  const outlet = useOutletContext?.() || {};
  const _onCardClick = onCardClick ?? outlet.onCardClick;
  const _onCardLike = onCardLike ?? outlet.onCardLike;
  const _currentUser = currentUser ?? outlet.currentUser;

  if (isLoadingItems) {
    return <ul className="cards" aria-busy="true" aria-live="polite" />;
  }

  const list = Array.isArray(clothingItems) ? clothingItems : [];

  return (
    <ul className="cards">
      {list.map(item => {
        const name = item?.name || '';
        const key = item?._id || item?.id || name;
        const src = item?.imageUrl || FALLBACK[name.toLowerCase()] || null;

        const isLiked =
          _currentUser?._id && Array.isArray(item?.likes)
            ? item.likes.some(
                u => (typeof u === 'string' ? u : u?._id) === _currentUser._id
              )
            : false;

        return (
          <li
            key={key}
            className="card"
            onClick={() => _onCardClick && _onCardClick(item)}
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
                onClick={e => {
                  e.stopPropagation();
                  _onCardLike && _onCardLike(item?._id || item?.id, isLiked);
                }}
              />
            </div>
            {src ? <img src={src} alt={name} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  isLoadingItems: PropTypes.bool,
  currentUser: PropTypes.any,
};
