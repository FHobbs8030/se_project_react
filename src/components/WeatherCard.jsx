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

function WeatherCard({ day, type, temperature = "--", unit = "F" }) {
  const timeOfDay = day ? "day" : "night";
  const imageSrc = weatherImages[timeOfDay][type] || weatherImages[timeOfDay]["clear"];
  const imageAlt = `${type} ${day ? "day" : "night"}`;

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
