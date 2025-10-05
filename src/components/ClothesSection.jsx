import ItemCard from "./ItemCard.jsx";

export default function ClothesSection({ clothingItems = [], weatherData, onCardClick }) {
  const group =
    weatherData?.tempF >= 75 ? "hot" :
    weatherData?.tempF >= 60 ? "warm" : "cold";

  const visibleItems = weatherData
    ? clothingItems.filter((i) => i.weather === group)
    : clothingItems;

  return (
    <section className="clothes">
      <ul className="cards__list">
        {visibleItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}
