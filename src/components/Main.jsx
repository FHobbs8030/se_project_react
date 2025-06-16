import React from "react";
import { useOutletContext } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import "../blocks/Main.css";
import "../blocks/ItemCard.css";
import "../blocks/Cards.css";

function Main() {
  const { weatherData, clothingItems, onCardClick } = useOutletContext();
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  const rawTemperature = weatherData?.temp ?? null;

  const convertedTemperature =
    typeof rawTemperature === "number"
      ? currentTemperatureUnit === "C"
        ? Math.round(((rawTemperature - 32) * 5) / 9)
        : Math.round(rawTemperature)
      : null;

  const weatherType = weatherData?.type ?? null;

  const filteredItems =
    weatherType === null
      ? clothingItems
      : clothingItems.filter((item) => item.weather === weatherType);

  const unit = currentTemperatureUnit === "C" ? "°C" : "°F";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__intro">
        {typeof convertedTemperature === "number"
          ? `Today is ${convertedTemperature}${unit} / You may want to wear:`
          : `Can't fetch weather / Showing all items:`}
      </p>
      <section className="cards">
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item.id || item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
