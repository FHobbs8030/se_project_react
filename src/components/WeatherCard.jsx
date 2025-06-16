import React from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import { getBackgroundImage } from "../utils/getBackgroundImage";
import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  const rawTemp = weatherData?.temp ?? null;
  const condition = weatherData?.type;
  const timestamp = weatherData?.timestamp;
  const sunrise = weatherData?.sunrise;
  const sunset = weatherData?.sunset;

  const convertedTemp =
    typeof rawTemp === "number"
      ? currentTemperatureUnit === "C"
        ? Math.round(((rawTemp - 32) * 5) / 9)
        : Math.round(rawTemp)
      : "--";

  const unit = currentTemperatureUnit === "C" ? "°C" : "°F";

  const backgroundImage = getBackgroundImage(condition, timestamp, sunrise, sunset);

  return (
    <section className="weather-card" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <p className="weather-card__temp">
        {convertedTemp}
        {unit}
      </p>
    </section>
  );
}

export default WeatherCard;
