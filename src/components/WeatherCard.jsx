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

function isDaylight(data) {
  try {
    const ts = Number.isFinite(data?.dt) ? data.dt : null;
    const tz = Number.isFinite(data?.timezone) ? data.timezone : 0;
    const when = ts != null ? new Date((ts + tz) * 1000) : new Date();
    const hr = when.getUTCHours();
    return hr >= 6 && hr < 18;
  } catch {
    return true;
  }
}

export default function WeatherCard({ weatherData: propWD, tempF: propTempF, isLoadingWeather }) {
  const ctx = useOutletContext();
  const data = propWD ?? ctx?.weatherData ?? null;
  console.log("Weather data structure:", data);
  const unit = ctx?.tempUnit === "C" ? "C" : "F";

  let baseF = null;
  if (typeof propTempF === "number" && Number.isFinite(propTempF)) {
    baseF = Math.round(propTempF);
  } else if (typeof propTempF === "string") {
    const n = Number(propTempF.trim());
    baseF = Number.isFinite(n) ? Math.round(n) : null;
  } else {
    baseF = toTempF(data);
  }

  console.log("Current unit from context:", unit);
  console.log("Base temperature (F):", baseF);

  const temp = Number.isFinite(baseF) ? (unit === "F" ? baseF : Math.round((baseF - 32) * 5 / 9)) : null;
  const symbol = unit === "F" ? "°F" : "°C";
  console.log("[WeatherCard] temp =", temp, symbol);

  const dayClass = isDaylight(data) ? "weather-card_day" : "weather-card_night";

  return (
    <div className={`weather-card ${dayClass} container`}>
      <section className="weather-card__inner" aria-busy={isLoadingWeather ? "true" : "false"}>
        <div className="weather-card__left">
          <div className="weather-card__tempwrap" role="group" aria-label="Current temperature">
            <span className="weather-card__temp">{temp ?? "--"}</span>
            <span className="weather-card__deg">{symbol}</span>
          </div>
        </div>
        <div className="weather-card__right" aria-hidden="true">
          <div className="weather-card__orb" />
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
