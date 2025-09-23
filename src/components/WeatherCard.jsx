import PropTypes from "prop-types";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import getWeatherIcon from "../utils/getWeatherIcon.js";
import "../blocks/WeatherCard.css";

export default function WeatherCard({ wx }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!wx) {
    return (
      <section className="weather-card weather-card--empty" aria-live="polite">
        <p>Weather data is unavailable.</p>
      </section>
    );
  }

  const temp = Number(wx?.main?.temp);
  const tempF = Number.isFinite(temp) ? temp : null;
  const now = Math.floor(Date.now() / 1000);
  const sr = Number(wx?.sys?.sunrise ?? 0);
  const ss = Number(wx?.sys?.sunset ?? 0);
  const isDay = sr && ss ? now > sr && now < ss : true;

  const main = wx?.weather?.[0]?.main || "";
  const desc = wx?.weather?.[0]?.description || main || "Weather";
  const icon = getWeatherIcon(main, isDay) || null;

  if (!Number.isFinite(tempF)) {
    return (
      <section className="weather-card weather-card--empty" aria-live="polite">
        <p>Weather data is unavailable.</p>
      </section>
    );
  }

  const tempDisplay = Math.round(
    currentTemperatureUnit === "F" ? tempF : ((tempF - 32) * 5) / 9
  );

  return (
    <section className="weather-card" role="region" aria-label="Weather">
      <div className={`weather-card__overlay ${isDay ? "day" : "night"}`}>
        {icon && (
          <img
            className="weather-card__icon"
            src={icon}
            alt={desc}
            onError={(e) => { e.currentTarget.src = `/images/icons/${isDay ? "day" : "night"}/foggy.svg`; }}
          />
        )}
        <div className="weather-card__temp">
          {tempDisplay}°{currentTemperatureUnit}
        </div>
        <div className="weather-card__cond">{desc}</div>
      </div>
    </section>
  );
}

WeatherCard.propTypes = { wx: PropTypes.object };
