import React from "react";
import "../blocks/WeatherCard.css";

function WeatherCard({ day, type, temperature, unit }) {
  const imageSrc = `/images/icons/${day}/${type.toLowerCase()}.svg`;

  return (
    <div className="weather-card">
      <div className={`weather-card__overlay ${day}`}>
        <span className="weather-card__temp">
          {temperature}°{unit}
        </span>
        <img
          className="weather-card__icon"
          src={imageSrc}
          alt={`Weather icon: ${type}`}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
