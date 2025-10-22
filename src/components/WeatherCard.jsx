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

export default function WeatherCard({ weatherData: propWD, tempF: propTempF, isLoadingWeather }) {
  const ctx = useOutletContext();
  const wd = propWD ?? ctx?.weatherData ?? null;

  const tF = Number.isFinite(propTempF) ? Math.round(propTempF) : toTempF(wd);
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
            <span className="weather-card__temp">{tF ?? "--"}</span>
            <span className="weather-card__deg">°F</span>
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
  isLoadingWeather: PropTypes.bool,
};
