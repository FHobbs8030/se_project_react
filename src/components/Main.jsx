import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";

export default function Main() {
  const { unit } = useContext(CurrentTemperatureUnitContext);
  const {
    weatherData = null,
    clothingItems = [],
    onCardClick,        // provided by App via <Outlet context={...}>
  } = useOutletContext?.() ?? {};

  const temp = Number.isFinite(weatherData?.temp) ? weatherData.temp : null;
  const unitSymbol = unit || "F";

  return (
    <section className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="section__title">
        Today is {temp != null ? `${temp}°${unitSymbol}` : "—"} / You may want to wear:
      </h3>

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        title=""
        showMessage
      />
    </section>
  );
}
