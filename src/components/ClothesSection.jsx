import { memo } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import '../blocks/Cards.css';
import '../blocks/ClothesSection.css';

const ClothesSection = memo(function ClothesSection({
  clothingItems = [],
  onCardClick,
  onDeleteItem,
  title = 'Recommended items',
  showMessage = true,
  showDelete = false,
}) {
  const hasItems = Array.isArray(clothingItems) && clothingItems.length > 0;

  return (
    <section className="clothes-section" aria-label="Clothing suggestions">
      {showMessage && <p className="clothes-section__title">{title}</p>}
      <div className="main__cards">
        {hasItems ? (
          clothingItems.map((item, idx) => (
            <ItemCard
              key={item._id ?? item.id ?? item.name ?? `item-${idx}`}
              item={item}
              onCardClick={onCardClick}
              onDeleteClick={onDeleteItem}
              showDelete={showDelete}
              needsScaling={false}
            />
          ))
        ) : (
          <p className="clothes-section__empty">No items to show.</p>
        )}
      </div>
    </section>
  );
});

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object),
  onCardClick: PropTypes.func,
  onDeleteItem: PropTypes.func,
  title: PropTypes.string,
  showMessage: PropTypes.bool,
  showDelete: PropTypes.bool,
};

export default ClothesSection;
