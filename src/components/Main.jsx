import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";
import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Main() {
  const { weatherData } = useContext(WeatherContext);
  const { tempUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} tempUnit={tempUnit} />
      <ClothesSection tempUnit={tempUnit} />
    </main>
  );
}
