import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import ItemCard from './ItemCard.jsx';
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
  items = [],
  onCardClick,
  onCardLike,
  isLoadingItems = false,
  currentUser,
  likePending,
}) {
  const outlet = useOutletContext?.() || {};
  const _onCardClick = onCardClick ?? outlet.onCardClick;
  const _onCardLike = onCardLike ?? outlet.onCardLike;
  const _currentUser = currentUser ?? outlet.currentUser;
  const _likePending = likePending ?? outlet.likePending;

  if (isLoadingItems) {
    return <ul className="cards" aria-busy="true" aria-live="polite" />;
  }

  const list = Array.isArray(items) ? items : [];

  return (
    <ul className="cards">
      {list.map(item => {
        const name = item?.name || '';
        const key = item?._id || item?.id || name;
        const src = item?.imageUrl || FALLBACK[name.toLowerCase()] || null;
        const hydrated = src ? { ...item, imageUrl: src } : item;

        return (
          <ItemCard
            key={key}
            item={hydrated}
            currentUser={_currentUser}
            onCardClick={_onCardClick}
            onCardLike={_onCardLike}
            likePending={_likePending}
          />
        );
      })}
    </ul>
  );
}

ClothesSection.propTypes = {
  items: PropTypes.array,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  isLoadingItems: PropTypes.bool,
  currentUser: PropTypes.any,
  likePending: PropTypes.instanceOf(Set),
};
