import { useContext, useMemo } from "react";
import WeatherCard from "./WeatherCard.jsx";
import { WeatherContext } from "../contextStore/WeatherContext.js";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";

export default function Main({ clothingItems = [], weatherBand, isLoadingItems, onCardClick }) {
  const { tempF, tempC, name } = useContext(WeatherContext);
  const { useCelsius } = useContext(CurrentTemperatureUnitContext);

  const shownTemp = useCelsius ? `${tempC ?? "–"}°C` : `${tempF ?? "–"}°F`;

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  const icon = isDay ? "/images/weather/day.svg" : "/images/weather/night.svg";

  const filtered = useMemo(() => {
    if (!weatherBand) return clothingItems;
    return clothingItems.filter((i) => (i.weather || "").toLowerCase() === weatherBand);
  }, [clothingItems, weatherBand]);

  return (
    <main className="main">
      <WeatherCard shownTemp={shownTemp} icon={icon} city={name || ""} isDay={isDay} />
      {isLoadingItems ? (
        <div className="main__loading">Loading…</div>
      ) : (
        <ul className="cards">
          {filtered.map((item) => (
            <li key={item._id} className="cards__item">
              <button type="button" className="card" onClick={() => onCardClick(item)}>
                <img className="card__img" src={item.imageUrl} alt={item.name} />
                <span className="card__title">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
