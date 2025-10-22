import PropTypes from "prop-types";
import ClothingCard from "./ClothingCard.jsx";
import "../blocks/Cards.css";
import "../blocks/ClothesSection.css";

function getTempF(weatherData) {
  if (!weatherData) return null;
  if (typeof weatherData.tempF === "number") return Math.round(weatherData.tempF);
  const raw = weatherData?.main?.temp;
  return typeof raw === "number" ? Math.round(raw) : null;
}

export default function ClothesSection({
  clothingItems,
  weatherData,
  onCardClick,
  isLoadingItems
}) {
  const items = Array.isArray(clothingItems) ? clothingItems : [];
  const tF = getTempF(weatherData);

  return (
    <section className="clothes">
      <h2 className="clothes__title">
        <span className="clothes__intro">
          Today is {Number.isFinite(tF) ? `${tF}° F` : "—"}
        </span>
        <span className="clothes__sep"> / </span>
        <span className="clothes__lead">You may want to wear:</span>
      </h2>

      <div className="cards-wrapper" aria-live="polite">
        <ul className="cards">
          {items.map((item) => (
            <ClothingCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
          {isLoadingItems && items.length === 0 ? (
            <li className="cards__empty">Loading…</li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  weatherData: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onCardClick: PropTypes.func.isRequired,
  isLoadingItems: PropTypes.bool
};
