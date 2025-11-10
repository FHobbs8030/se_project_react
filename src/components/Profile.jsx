import PropTypes from "prop-types";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({
  clothingItems,
  onCardClick,
  onAfterToggle,
  currentUser
}) {
  const uid = currentUser?._id || currentUser?.id || null;
  const ownItems = uid
    ? clothingItems.filter((i) => {
        const owner = i.owner;
        const oid =
          typeof owner === "string" ? owner : owner?._id || owner?.id || null;
        return oid === uid;
      })
    : clothingItems;

  return (
    <main className="content">
      <ClothesSection
        clothingItems={ownItems}
        onCardClick={onCardClick}
        onAfterToggle={onAfterToggle}
      />
    </main>
  );
}

Profile.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAfterToggle: PropTypes.func,
  currentUser: PropTypes.object
};
