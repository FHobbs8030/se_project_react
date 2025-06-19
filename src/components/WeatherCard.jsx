import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import { getBackgroundImage } from "../utils/getBackgroundImage";
import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isCelsius = currentTemperatureUnit === "C";

  const rawTemp = weatherData?.temperature ?? null;
  const condition = weatherData?.condition;
  const timestamp = weatherData?.dt;
  const sunrise = weatherData?.sunrise;
  const sunset = weatherData?.sunset;

  const backgroundImage = getBackgroundImage(condition, timestamp, sunrise, sunset);

  if (rawTemp === null || !backgroundImage) {
    return (
      <section className="weather-card" style={{ backgroundColor: "#00aaff" }}>
        <p className="weather-card__temp">--°{isCelsius ? "C" : "F"}</p>
      </section>
    );
  }

  const displayTemp = isCelsius
    ? Math.round(((rawTemp - 32) * 5) / 9)
    : Math.round(rawTemp);

  return (
    <section
      className="weather-card"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <p className="weather-card__temp">
        {displayTemp}°{isCelsius ? "C" : "F"}
      </p>
    </section>
  );
}

export default WeatherCard;
