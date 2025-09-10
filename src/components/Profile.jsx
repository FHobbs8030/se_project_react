import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';
import '../blocks/Profile.css';

export default function Profile() {
  // Call the hook unconditionally at the top level
  const ctx = useOutletContext?.() ?? {};

  const {
    clothingItems = [],
    onCardClick,
    onDeleteClick,
    currentUser,          // provided by App.jsx context (see below)
  } = ctx;

  // Example use so it's not “unused” and to differentiate owner view
  const isOwner = Boolean(currentUser?._id);

  return (
    <main className="profile">
      <h2 className="profile__title">My Profile</h2>

      <section className="profile__items">
        <ClothesSection
          title="Your items"
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onDeleteItem={onDeleteClick}
          showMessage
          // owner sees delete buttons; average visitors won’t
          showDelete={isOwner}
        />
      </section>
    </main>
  );
}
