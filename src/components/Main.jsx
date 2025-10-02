import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";

export default function Main() {
  const { unit } = useContext(CurrentTemperatureUnitContext);
  const { weatherData } = useOutletContext() || {};
  const temp = Number.isFinite(weatherData?.temp) ? weatherData.temp : null;
  const unitSymbol = unit || "F";

  return (
    <section className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="today-line">
        Today is {temp != null ? `${temp}°${unitSymbol}` : "—"} / You may want to wear:
      </p>
      <ClothesSection />
    </section>
  );
}
