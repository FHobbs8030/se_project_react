import React, { useContext } from "react";
import WeatherCard from "./WeatherCard.jsx";
import ItemCard from "./ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
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
            <ItemCard
              key={item.id || `${item.name}-${Math.random()}`}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </section>
    );
  }

  const rawTemp = weatherData?.temperature;
  const displayTemp = isCelsius
    ? Math.round(((rawTemp - 32) * 5) / 9)
    : Math.round(rawTemp);
  const unit = isCelsius ? "C" : "F";

  // Always use Fahrenheit for weatherType logic
  let weatherType;
  if (rawTemp >= 75) {
    weatherType = "hot";
  } else if (rawTemp >= 60) {
    weatherType = "warm";
  } else {
    weatherType = "cold";
  }

  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

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
              key={item.id || `${item.name}-${Math.random()}`}
              item={item}
              onCardClick={onCardClick}
            />
          ))
        ) : (
          <p className="main__message">No matching clothes for this weather.</p>
        )}
      </div>
    </section>
  );
}

export default Main;
