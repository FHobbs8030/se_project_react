import WeatherCard from "./WeatherCard.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Main({ clothingItems, weatherData }) {
  const temperature = weatherData ? `${weatherData.tempF}°F` : "—";
  return (
    <main className="main">
      <WeatherCard temperature={temperature} />
      <ClothesSection clothingItems={clothingItems} weatherData={weatherData} />
    </main>
  );
}
