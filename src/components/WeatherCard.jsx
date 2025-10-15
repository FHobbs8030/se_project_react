import { useOutletContext } from "react-router-dom";
import "../blocks/WeatherCard.css";


function iconNameFromCode(code) {
  if (!code) return "clear";
  const n = String(code).slice(0, 2);
  if (n === "01") return "clear";
  if (n === "02" || n === "03") return "cloudy";
  if (n === "04") return "stormy";
  if (n === "09" || n === "10") return "rain";
  if (n === "11") return "stormy";
  if (n === "13") return "snowy";
  if (n === "50") return "foggy";
  return "clear";
}

export default function WeatherCard() {
  const { weatherData, isLoadingWeather, tempUnit } = useOutletContext();

  const code = weatherData?.weather?.[0]?.icon || "";
  const isNight = /n$/.test(code);
  const name = iconNameFromCode(code);
  const iconSrc = `/images/icons/${isNight ? "night" : "day"}/${name}.svg`;

  const temp =
    typeof weatherData?.main?.temp === "number"
      ? Math.round(weatherData.main.temp)
      : null;

  const unit = tempUnit === "C" ? "°C" : "°F";

  return (
    <section
      className={`weather-card ${isNight ? "weather-card_night" : "weather-card_day"}`}
      aria-label="Current weather"
    >
      <div className="weather-card__left">
        {isLoadingWeather ? (
          <div className="weather-card__temp" aria-busy="true">…</div>
        ) : (
          <div className="weather-card__temp">
            {temp !== null ? temp : "—"}
            <span className="weather-card__deg">{unit}</span>
          </div>
        )}
      </div>
      <img
        className="weather-card__icon"
        alt={weatherData?.weather?.[0]?.description || "Weather"}
        src={iconSrc}
        width="128"
        height="90"
        onError={(e) => { e.currentTarget.src = "/images/icons/day/clear.svg"; }}
      />
    </section>
  );
}
