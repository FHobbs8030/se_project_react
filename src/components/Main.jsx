import React, { useContext } from "react";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("🐞 weatherData in Main:", weatherData);

  if (!weatherData || typeof weatherData !== "object") {
    return <p>Loading weather data...</p>;
  }

  const rawTemp = weatherData.temperature;
  const weatherType = weatherData.condition || "unknown";

  const displayTemp =
    rawTemp !== undefined && rawTemp !== null
      ? Math.round(
          currentTemperatureUnit === "F"
            ? rawTemp
            : ((rawTemp - 32) * 5) / 9
        )
      : "--";

  const clothingToShow = clothingItems?.filter(
    (item) => item.weather === weatherType
  ) || [];

  return (
    <main className="main">
      <WeatherCard
        day={weatherData.isDay}
        type={weatherType}
        temperature={displayTemp}
        unit={currentTemperatureUnit}
      />

      <section className="main__weather">
        <p className="main__temp-display">
          {displayTemp}°{currentTemperatureUnit}
        </p>
        <p className="main__message">
          Today is{" "}
          {displayTemp !== "--"
            ? `${displayTemp}°${currentTemperatureUnit}`
            : "unknown"}{" "}
          and {weatherType} / You may want to wear:
        </p>
      </section>

      <ul className="main__clothing-items">
        {clothingToShow.length > 0 ? (
          clothingToShow.map((item) => (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p>No matching clothes for this weather.</p>
        )}
      </ul>
    </main>
  );
}

export default Main;
