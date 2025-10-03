import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import getWeatherBarArt from "../utils/getWeatherBarArt.js";
import "../blocks/WeatherCard.css";

function toDisplayTemp(t, u) {
  if (!Number.isFinite(t)) return "—";
  return `${Math.round(t)}°${u || "F"}`;
}

function toMs(x) {
  if (!Number.isFinite(x)) return NaN;
  return x < 1e12 ? x * 1000 : x;
}

export default function WeatherCard({ weatherData }) {
  const { unit } = useContext(CurrentTemperatureUnitContext);
  const temp = Number.isFinite(weatherData?.temp) ? weatherData.temp : null;

  const condition =
    weatherData?.condition ||
    weatherData?.main ||
    weatherData?.weather?.[0]?.main ||
    "Clear";

  const ts = toMs(weatherData?.timestamp ?? weatherData?.dt ?? Date.now());
  const sunrise = toMs(weatherData?.sunrise ?? weatherData?.sys?.sunrise);
  const sunset = toMs(weatherData?.sunset ?? weatherData?.sys?.sunset);
  const isDay =
    Number.isFinite(ts) && Number.isFinite(sunrise) && Number.isFinite(sunset)
      ? ts > sunrise && ts < sunset
      : true;

  const artSrc = getWeatherBarArt(condition, isDay);

  return (
    <div className="weather-card">
      <div className="weather-card__temp">{toDisplayTemp(temp, unit)}</div>
      <img className="weather-card__rightArt" src={artSrc} alt="" aria-hidden="true" />
    </div>
  );
}
