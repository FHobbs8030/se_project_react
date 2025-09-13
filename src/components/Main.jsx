import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';
import '../blocks/Main.css';

export default function Main() {
  const outlet = useOutletContext();
  const {
    clothingItems = [],
    onCardClick = () => {},
    onDeleteClick = () => {},
    onAddClick = () => {},
    currentUser = null,
  } = outlet || {};

  return (
    <main className="main">
      <ClothesSection
        title="Today is 73°F / You may want to wear:"
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onDeleteClick={onDeleteClick}
        onAddClick={onAddClick}
        currentUser={currentUser}
      />
    </main>
  );
}
