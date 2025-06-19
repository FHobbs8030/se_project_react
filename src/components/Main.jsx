import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ItemCard from "./ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import "../blocks/Main.css";

function Main() {
  const { weatherData, clothingItems, onCardClick } = useOutletContext();
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isCelsius = currentTemperatureUnit === "C";

  if (!weatherData) {
    return (
      <section className="main">
        <WeatherCard />
        <p className="main__message">
          Can't fetch weather / You may want to wear:
        </p>
        <div className="main__cards">
          {clothingItems.map((item) => (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          ))}
        </div>
      </section>
    );
  }

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  const rawTemp = weatherData?.temperature;
  const displayTemp = isCelsius
    ? Math.round(((rawTemp - 32) * 5) / 9)
    : Math.round(rawTemp);
  const unit = isCelsius ? "C" : "F";

  return (
    <section className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__message">
        Today is {displayTemp}°{unit} / You may want to wear:
      </p>

      <div className="main__cards">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))
        ) : (
          <p className="main__message">
            No matching clothes for this weather.
          </p>
        )}
      </div>
    </section>
  );
}

export default Main;
