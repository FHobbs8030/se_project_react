import React from "react";
import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.sys) {
    return null;
  }

  const temperature = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0]?.main?.toLowerCase() || "default";
  const isDay = weatherData.dt > weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset;

  const weatherKey = condition;
  const timeOfDay = isDay ? "day" : "night";
  const imageSrc = `/images/icons/${timeOfDay}/${weatherKey}.svg`;

  return (
    <div className="weather-card">
      <div className={`weather-card__overlay ${timeOfDay}`}>
        <span className="weather-card__temp">{temperature}°F</span>
        <img
          className="weather-card__icon"
          src={imageSrc}
          alt={`Weather icon: ${weatherKey}`}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
