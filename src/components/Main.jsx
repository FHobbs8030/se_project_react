import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Main() {
  const ctx = useOutletContext() || {};
  const {
    weatherData,
    clothingItems,
    onCardClick,
    isLoadingWeather,
    isLoadingItems
  } = ctx;

  return (
    <main className="content">
      <WeatherCard
        weatherData={weatherData}
        isLoadingWeather={isLoadingWeather}
      />
      <ClothesSection
        clothingItems={clothingItems || []}
        weatherData={{ tempF: weatherData?.main?.temp ?? null }}
        onCardClick={onCardClick || (() => {})}
        isLoadingItems={isLoadingItems}
      />
    </main>
  );
}
