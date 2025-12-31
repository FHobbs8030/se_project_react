import PropTypes from 'prop-types';
import ClothesSection from './ClothesSection.jsx';

export default function Profile({
  clothingItems,
  onCardClick,
  onAfterToggle,
  currentUser,
}) {
  const uid = currentUser?._id || currentUser?.id || null;

  const ownItems = uid
    ? clothingItems.filter(i => {
        const owner = i.owner;
        const oid =
          typeof owner === 'string' ? owner : owner?._id || owner?.id || null;
        return oid === uid;
      })
    : clothingItems;

  const avatarSrc = currentUser?.avatar?.startsWith('http')
    ? currentUser.avatar
    : '/images/Avatar.png';

  return (
    <main className="content">
      <section className="profile">
        <aside className="profile__sidebar">
          <img
            className="profile__avatar"
            src={avatarSrc}
            alt={currentUser?.name || 'User avatar'}
          />
          <p className="profile__name">{currentUser?.name}</p>
        </aside>

        <ClothesSection
          clothingItems={ownItems}
          onCardClick={onCardClick}
          onAfterToggle={onAfterToggle}
        />
      </section>
    </main>
  );
}

Profile.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAfterToggle: PropTypes.func,
  currentUser: PropTypes.object,
};
