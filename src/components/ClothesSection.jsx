import PropTypes from "prop-types";
import ClothingCard from "./ClothingCard.jsx";
import "../blocks/Cards.css";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAfterToggle
}) {
  return (
    <section className="cards-wrapper">
      <ul className="cards">
        {clothingItems.map((item) => (
          <ClothingCard
            key={item._id || item.id}
            item={item}
            onCardClick={onCardClick}
            onAfterToggle={onAfterToggle}
          />
        ))}
      </ul>
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAfterToggle: PropTypes.func
};
