import PropTypes from "prop-types";
import ItemCard from "./ItemCard.jsx";
import "../blocks/ClothesSection.css"; // optional if you have styles

export default function ClothesSection({
  clothingItems = [],
  onCardClick,
  title = "Clothes",
  showMessage = true,
}) {
  const hasItems = Array.isArray(clothingItems) && clothingItems.length > 0;

  return (
    <section className="clothes-section">
      {title && <h3 className="section__title">{title}</h3>}

      {hasItems ? (
        <ul className="cards">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id || item.id || item.imageUrl || Math.random()}
              item={item}
              onCardClick={() => onCardClick?.(item)}
            />
          ))}
        </ul>
      ) : (
        showMessage && <p className="muted">No items in wardrobe yet.</p>
      )}
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  onCardClick: PropTypes.func,
  title: PropTypes.string,
  showMessage: PropTypes.bool,
};
