import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection';

export default function ClothingGallery() {
  const { clothingItems = [], onCardClick, onDeleteClick } = useOutletContext();

  return (
    <ClothesSection
      clothingItems={clothingItems}
      onCardClick={onCardClick}
      onDeleteItem={onDeleteClick}
      title="Recommended items"
      showMessage
      showDelete={false}
    />
  );
}
