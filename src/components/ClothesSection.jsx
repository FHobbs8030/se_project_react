import PropTypes from "prop-types";
import ClothingCard from "./ClothingCard.jsx";
import "../blocks/Cards.css";

export default function ClothesSection({ clothingItems, weatherData, onCardClick }) {
  const tempF = typeof weatherData?.tempF === "number" ? Math.round(weatherData.tempF) : null;
  const bucket = tempF == null ? null : tempF >= 86 ? "hot" : tempF >= 66 ? "warm" : "cold";

  const all = Array.isArray(clothingItems) ? clothingItems : [];
  const filtered = bucket ? all.filter((i) => i.weather === bucket) : all;
  const source = filtered.length > 0 ? filtered : all;

  const seen = new Set();
  const items = source.filter((it) => {
    const key = it.name?.toLowerCase() || it._id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const lead = tempF == null ? "You may want to wear:" : `Today is ${tempF}°F / You may want to wear:`;

  return (
    <section className="cards-wrapper">
      <p className="cards__lead">{lead}</p>
      <ul className="cards" role="list">
        {items.map((item) => (
          <ClothingCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  weatherData: PropTypes.object,
  onCardClick: PropTypes.func,
};
