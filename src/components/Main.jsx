import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Main() {
  const {
    weatherData,
    clothingItems,
    onCardClick,
  } = useOutletContext();

  const tempF =
    weatherData && weatherData.main && typeof weatherData.main.temp === "number"
      ? weatherData.main.temp
      : null;

  return (
    <main className="content">
      <WeatherCard />
      <ClothesSection
        clothingItems={clothingItems}
        weatherData={{ tempF }}
        onCardClick={onCardClick}
      />
    </main>
  );
}
