import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";
import getBackgroundImage from "../utils/getBackgroundImage.js";
import weatherImages from "../utils/weatherImages.js";
import "../blocks/WeatherCard.css";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#3b82f6" offset="0"/><stop stop-color="#06b6d4" offset="1"/></linearGradient></defs><rect width="1200" height="64" rx="10" fill="url(#g)"/></svg>'
  );

function pickImage(type, isDay) {
  if (typeof getBackgroundImage === "function") {
    const src = getBackgroundImage(type, isDay);
    if (src) return src;
  }
  const table = weatherImages?.[isDay ? "day" : "night"];
  if (table?.[type]) return table[type];
  if (table?.default) return table.default;
  const first = table ? Object.values(table)[0] : null;
  return first || FALLBACK;
}

export default function WeatherCard({ weatherData }) {
  const { unit } = useContext(CurrentTemperatureUnitContext);
  const temp = Number.isFinite(weatherData?.temp) ? weatherData.temp : null;
  const type = weatherData?.type || null;
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  const iconSrc = pickImage(type, isDay);

  return (
    <div className="weather-card">
      <div className={`weather-card__overlay ${isDay ? "day" : "night"}`}>
        <p className="weather-card__temp">{temp != null ? `${temp}°${unit || "F"}` : "—"}</p>
      </div>
      <img
        className="weather-card__icon"
        src={iconSrc}
        alt={type ? `${type} weather` : "weather"}
      />
    </div>
  );
}
