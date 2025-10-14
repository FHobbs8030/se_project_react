import { useContext, useMemo } from "react";
import { WeatherContext } from "../contexts/WeatherContext.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";
import "../blocks/WeatherCard.css";

function mapIconName(code, main) {
  const id = Number(code);
  if (Number.isFinite(id)) {
    if (id >= 200 && id < 300) return "stormy";
    if (id >= 300 && id < 600) return "rain";
    if (id >= 600 && id < 700) return "snowy";
    if (id >= 700 && id < 800) return "foggy";
    if (id === 800) return "clear";
    if (id > 800) return "cloudy";
  }
  const m = (main || "").toLowerCase();
  if (/thunder/.test(m)) return "stormy";
  if (/drizzle|rain/.test(m)) return "rain";
  if (/snow/.test(m)) return "snowy";
  if (/mist|smoke|haze|dust|fog|sand|ash|squall|tornado/.test(m)) return "foggy";
  if (/clear/.test(m)) return "clear";
  if (/cloud/.test(m)) return "cloudy";
  return "clear";
}

const toF = (t, units) => {
  if (t == null || typeof t !== "number") return null;
  if (units === "imperial") return Math.round(t);
  if (units === "metric") return Math.round((t * 9) / 5 + 32);
  if (units === "standard") return Math.round(((t - 273.15) * 9) / 5 + 32);
  if (t > 170) return Math.round(((t - 273.15) * 9) / 5 + 32);
  return Math.round(t);
};

export default function WeatherCard() {
  const { weatherData, isLoadingWeather } = useContext(WeatherContext) || {};
  const { currentTemperatureUnit = "F" } =
    useContext(CurrentTemperatureUnitContext) || {};

  const isDay = useMemo(() => {
    const s = (weatherData?.sys?.sunrise ?? 0) * 1000;
    const e = (weatherData?.sys?.sunset ?? 0) * 1000;
    if (!s || !e) return true;
    const now = Date.now();
    return now >= s && now < e;
  }, [weatherData]);

  const units = weatherData?.units || weatherData?.unit || null;
  const baseF = useMemo(
    () => toF(weatherData?.main?.temp, units),
    [weatherData, units]
  );

  const displayTemp = useMemo(() => {
    if (baseF == null) return "—";
    return currentTemperatureUnit === "C"
      ? Math.round((baseF - 32) * 5 / 9)
      : baseF;
  }, [baseF, currentTemperatureUnit]);

  const w0 = weatherData?.weather?.[0] || {};
  const iconName = mapIconName(w0.id, w0.main);
  const iconPath = `/images/icons/${isDay ? "day" : "night"}/${iconName}.svg`;

  return (
    <section className="weather-card__outer">
      <div className={`weather-card ${isDay ? "weather-card_day" : "weather-card_night"}`}>
        <div className="weather-card__left">
          <div className="weather-card__tempwrap">
            <span className="weather-card__temp">
              {isLoadingWeather ? "…" : displayTemp}
            </span>
            <span className="weather-card__deg">°{currentTemperatureUnit}</span>
          </div>
        </div>
        <img className="weather-card__icon" src={iconPath} alt="" />
      </div>
    </section>
  );
}
