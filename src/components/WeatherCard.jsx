// src/components/WeatherCard.jsx
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import "../blocks/WeatherCard.css";

function toTempF(src) {
  if (!src) return null;
  let v = src?.main?.temp ?? src?.tempF ?? src?.current?.temp_f ?? null;
  if (typeof v === "string") {
    const n = Number(v.trim());
    v = Number.isFinite(n) ? n : null;
  }
  return Number.isFinite(v) ? Math.round(v) : null;
}

export default function WeatherCard({
  weatherData: propWD,
  tempF: propTempF,
  unit,                 // optional override
  isLoadingWeather,
}) {
  const ctx = useOutletContext() || {};
  const ctxUnit = ctx.currentTemperatureUnit || ctx.tempUnit || "F";
  const tempUnit = unit || ctxUnit;

  const wd = propWD ?? ctx.weatherData ?? null;
  const baseF = Number.isFinite(propTempF) ? Math.round(propTempF) : toTempF(wd);
  const tempC = baseF !== null ? Math.round((baseF - 32) * 5 / 9) : null;
  const display = tempUnit === "C" ? tempC : baseF;

  const icon = wd?.weather?.[0]?.icon || "";
  const isNight = /n$/.test(icon);

  return (
    <div className="weather-card__outer">
      <section
        className={`weather-card ${isNight ? "weather-card_night" : "weather-card_day"}`}
        aria-label="current weather"
        aria-busy={!!isLoadingWeather}
      >
        <div className="weather-card__inner">
          <div className="weather-card__left">
            <span className="weather-card__temp">{display ?? "--"}</span>
            <span className="weather-card__deg">°{tempUnit}</span>
          </div>
          <div className="weather-card__right" aria-hidden="true">
            <div className="weather-card__orb" />
          </div>
        </div>
      </section>
    </div>
  );
}

WeatherCard.propTypes = {
  weatherData: PropTypes.object,
  tempF: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.oneOf(["F", "C"]),
  isLoadingWeather: PropTypes.bool,
};
