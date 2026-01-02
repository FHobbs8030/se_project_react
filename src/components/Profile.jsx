import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';
import SideBar from './SideBar.jsx';

export default function Profile() {
  const {
    clothingItems = [],
    onCardClick,
    onAfterToggle,
    currentUser,
    onEditProfileClick,
    onLogoutClick,
  } = useOutletContext();

  const currentUserId = currentUser?._id || currentUser?.id || null;

  const ownedItems = currentUserId
    ? clothingItems.filter(item => {
        const owner = item.owner;
        const ownerId =
          typeof owner === 'string' ? owner : owner?._id || owner?.id || null;
        return ownerId === currentUserId;
      })
    : clothingItems;

  return (
    <main className="content">
      <section className="profile">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onLogoutClick={onLogoutClick}
        />

        <ClothesSection
          items={ownedItems}
          onCardClick={onCardClick}
          onAfterToggle={onAfterToggle}
        />
      </section>
    </main>
  );
}
