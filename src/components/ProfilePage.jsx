import { useMemo } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../components/SideBar.jsx';
import ClothesSection from '../components/ClothesSection.jsx';
import '../pages/ProfilePage.css';

export default function ProfilePage({
  clothingItems = [],
  isLoadingItems = false,
  onCardClick,
  currentUser,
  onLogoutClick,
  onEditProfileClick,
}) {
  const userItems = useMemo(() => {
    const items = Array.isArray(clothingItems) ? clothingItems : [];
    return items.filter(it => {
      const ownerId =
        typeof it.owner === 'string'
          ? it.owner
          : it.owner && typeof it.owner === 'object' && it.owner._id
          ? it.owner._id
          : it.ownerId || null;
      return currentUser?._id && ownerId === currentUser._id;
    });
  }, [clothingItems, currentUser]);

  return (
    <main className="profile">
      <SideBar
        currentUser={currentUser}
        onEditProfileClick={onEditProfileClick}
        onLogoutClick={onLogoutClick}
      />
      <section className="profile__content">
        <ClothesSection
          clothingItems={userItems}
          onCardClick={onCardClick}
          isLoadingItems={isLoadingItems}
          weatherData={null}
        />
      </section>
    </main>
  );
}

ProfilePage.propTypes = {
  clothingItems: PropTypes.array,
  isLoadingItems: PropTypes.bool,
  onCardClick: PropTypes.func,
  currentUser: PropTypes.object,
  onLogoutClick: PropTypes.func,
  onEditProfileClick: PropTypes.func,
};
