import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Main({
  weatherData,
  isLoadingWeather,
  clothingItems,
  currentUser,
  onCardClick,
  onCardUpdated,
  onCardRemoved,
  isLoadingItems,
}) {
  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} isLoadingWeather={isLoadingWeather} />
      <ClothesSection
        clothingItems={clothingItems}
        currentUser={currentUser}
        onCardClick={onCardClick}
        onCardUpdated={onCardUpdated}
        onCardRemoved={onCardRemoved}
        isLoadingItems={isLoadingItems}
      />
    </main>
  );
}
