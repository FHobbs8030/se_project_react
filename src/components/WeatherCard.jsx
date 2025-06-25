import React from "react";
import "../blocks/WeatherCard.css";

import dayClear from "../images/day/clear.svg";
import dayCloudy from "../images/day/cloudy.svg";
import dayRain from "../images/day/rain.svg";
import dayStorm from "../images/day/storm.svg";
import daySnow from "../images/day/snow.svg";

import nightClear from "../images/night/clear.svg";
import nightCloudy from "../images/night/cloudy.svg";
import nightRain from "../images/night/rain.svg";
import nightStorm from "../images/night/storm.svg";
import nightSnow from "../images/night/snow.svg";

const weatherImages = {
  day: {
    clear: dayClear,
    cloudy: dayCloudy,
    rainy: dayRain,
    storm: dayStorm,
    snow: daySnow,
  },
  night: {
    clear: nightClear,
    cloudy: nightCloudy,
    rainy: nightRain,
    storm: nightStorm,
    snow: nightSnow,
  },
};

// Map API types to your keys
const mapWeatherType = (type) => {
  const normalized = type.toLowerCase();
  if (["clear", "sunny"].includes(normalized)) return "clear";
  if (["clouds", "cloudy", "overcast"].includes(normalized)) return "cloudy";
  if (["rain", "drizzle"].includes(normalized)) return "rain";
  if (["storm", "thunderstorm"].includes(normalized)) return "storm";
  if (["snow", "sleet"].includes(normalized)) return "snow";
  return "clear"; 
};

function WeatherCard({ day, type, temperature = "--", unit = "F" }) {
  const timeOfDay = day ? "day" : "night";
  const weatherKey = mapWeatherType(type);
  const imageSrc = weatherImages[timeOfDay][weatherKey];
  const imageAlt = `${weatherKey} ${timeOfDay}`;

  return (
    <section className="weather-card">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {temperature}°{unit}
      </p>
    </section>
  );
}

export default WeatherCard;
