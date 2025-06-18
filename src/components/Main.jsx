import React from "react";
import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ItemCard from "./ItemCard.jsx";
import "../blocks/Main.css";

function Main() {
  const { weatherData, clothingItems, onCardClick } = useOutletContext();

  if (!weatherData) {
    return (
      <section className="main">
        <WeatherCard />
        <p className="main__message">Can't fetch weather / Showing all items:</p>
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

  return (
    <section className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__message">
        {filteredItems.length > 0
          ? `Showing clothes for ${weatherData.type} weather:`
          : "No matching clothes for this weather."}
      </p>
      <div className="main__cards">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}

export default Main;
