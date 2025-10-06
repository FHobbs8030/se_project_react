import PropTypes from "prop-types";
import WeatherCard from "./WeatherCard.jsx";

export default function Main({
  weatherData,
  shownTemp,
  clothingItems,
  isLoadingItems,
  onCardClick,
}) {
  const band =
    weatherData?.tempF == null
      ? null
      : weatherData.tempF >= 86
        ? "hot"
        : weatherData.tempF >= 66
          ? "warm"
          : "cold";

  const visible = band
    ? clothingItems.filter((c) => c.weather === band)
    : clothingItems;

  return (
    <main className="content">
      <WeatherCard
        shownTemp={shownTemp}
        icon={weatherData.icon}
        city={weatherData.city}
        isDay={weatherData.isDay}
      />

      {isLoadingItems ? (
        <div className="loading">Loading clothing…</div>
      ) : (
        <ul className="cards">
          {visible.map((card) => (
            <li key={card._id} className="card" onClick={() => onCardClick(card)}>
              <img className="card__image" src={card.imageUrl} alt={card.name} />
              <div className="card__footer">
                <h3 className="card__title">{card.name}</h3>
                <span className="card__tag">{card.weather}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

Main.propTypes = {
  weatherData: PropTypes.object.isRequired,
  shownTemp: PropTypes.string.isRequired,
  clothingItems: PropTypes.array.isRequired,
  isLoadingItems: PropTypes.bool,
  onCardClick: PropTypes.func.isRequired,
};
