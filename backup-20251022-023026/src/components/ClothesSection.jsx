import ClothingCard from "./ClothingCard.jsx";

export default function ClothesSection({
  clothingItems,
  currentUser,
  onCardClick,
  onCardUpdated,
  onCardRemoved,
  isLoadingItems,
}) {
  return (
    <section className="clothes">
      <div className="cards-wrapper">
        <ul className="cards">
          {isLoadingItems
            ? null
            : clothingItems.map((item) => (
                <ClothingCard
                  key={item._id}
                  item={item}
                  currentUser={currentUser}
                  onCardClick={onCardClick}
                  onCardUpdated={onCardUpdated}
                  onCardRemoved={onCardRemoved}
                />
              ))}
        </ul>
      </div>
    </section>
  );
}
