import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection';

export default function Profile() {
  const {
    currentUser = null,
    clothingItems = [],
    onCardClick,
    onDeleteClick,
  } = useOutletContext?.() ?? {};

  const name = currentUser?.name ?? 'My Profile';

  return (
    <main className="page">
      <h2 className="profile__title">{name}</h2>
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onDeleteItem={onDeleteClick}
        title="Your items"
        showMessage
        showDelete
      />
    </main>
  );
}
