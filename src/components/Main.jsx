import { useContext, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import ClothesSection from "./ClothesSection";
import WeatherCard from "./WeatherCard";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import "../blocks/Main.css";

export default function Main() {
  const {
    weatherData,
    isLoadingWeather,
    clothingItems = [],
    onCardClick,
    onDeleteClick,
  } = useOutletContext();

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const norm = useMemo(() => {
    if (!weatherData) return null;
    const tempF = Number(weatherData?.main?.temp);
    const ts = Math.floor(Date.now() / 1000);
    const sunrise = Number(weatherData?.sys?.sunrise) || 0;
    const sunset = Number(weatherData?.sys?.sunset) || 24 * 3600;
    const isDay = ts > sunrise && ts < sunset;
    return {
      tempF: Number.isFinite(tempF) ? tempF : null,
      ts,
      sunrise,
      sunset,
      isDay,
    };
  }, [weatherData]);

  const displayTemp = useMemo(() => {
    if (!norm || norm.tempF == null) return "--";
    return Math.round(
      currentTemperatureUnit === "F" ? norm.tempF : ((norm.tempF - 32) * 5) / 9
    );
  }, [norm, currentTemperatureUnit]);

  const weatherType = useMemo(() => {
    const t = norm?.tempF;
    if (t == null) return "cold";
    if (t >= 86) return "hot";
    if (t >= 66) return "warm";
    return "cold";
  }, [norm]);

  const recommended = useMemo(() => {
    const wanted = weatherType.toLowerCase();
    return Array.isArray(clothingItems)
      ? clothingItems.filter(
          (item) => (item?.weather ?? "").toString().toLowerCase() === wanted
        )
      : [];
  }, [clothingItems, weatherType]);

  const listToShow = recommended.length ? recommended : clothingItems;

  return (
    <main className="main">
      {isLoadingWeather ? (
        <section className="weather-card weather-card--empty" aria-busy="true">
          <p>Loading weather…</p>
        </section>
      ) : (
        <WeatherCard wx={weatherData} />
      )}

      <section className="main__weather">
        <p className="main__message">
          Today is{" "}
          {displayTemp !== "--"
            ? `${displayTemp}°${currentTemperatureUnit}`
            : "unknown"}{" "}
          / You may want to wear:
        </p>
      </section>

      <ClothesSection
        clothingItems={listToShow}
        onCardClick={onCardClick}
        onDeleteItem={onDeleteClick}
        showDelete={true}
        showMessage={false}
      />
    </main>
  );
}
