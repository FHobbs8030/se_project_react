import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ClothesSection from './ClothesSection.jsx';
import SideBar from './SideBar.jsx';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const {
    clothingItems = [],
    onCardClick,
    onEditProfileClick,
    onLogoutClick,
  } = useOutletContext();

  const currentUserId = currentUser?._id || currentUser?.id || null;

  const ownedItems = currentUserId
    ? clothingItems.filter(item => {
        const owner =
          typeof item.owner === 'string'
            ? item.owner
            : item.owner?._id || item.owner?.id;
        return owner === currentUserId;
      })
    : [];

  return (
    <main className="content">
      <section className="profile">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onLogoutClick={onLogoutClick}
        />

        <ClothesSection items={ownedItems} onCardClick={onCardClick} />
      </section>
    </main>
  );
}
