import React, { useContext } from 'react';
import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import '../blocks/Main.css';

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log('🐞 weatherData in Main:', weatherData);

  if (!weatherData || typeof weatherData !== 'object') {
    return <p>Loading weather data...</p>;
  }

  const rawTemp = weatherData.temperature;
  let weatherType = 'warm'; // default

  if (weatherData.condition === 'snow' || weatherData.temperature < 50) {
    weatherType = 'cold';
  } else if (weatherData.condition === 'rain' || weatherData.temperature > 75) {
    weatherType = 'hot';
  }

  const displayTemp =
    rawTemp !== undefined && rawTemp !== null
      ? Math.round(
          currentTemperatureUnit === 'F' ? rawTemp : ((rawTemp - 32) * 5) / 9
        )
      : '--';

  const clothingToShow =
    clothingItems?.filter(
      item => item.weather.toLowerCase() === weatherType.toLowerCase()
    ) || [];

  // 🔍 Debugging logs
  console.log('🌡 Raw Temp:', rawTemp);
  console.log('🎯 Display Temp:', displayTemp);
  console.log('☁️ Weather Type (condition):', weatherType);
  console.log('🧺 Clothing Items:', clothingItems);
  console.log('👕 Filtered Items to Show:', clothingToShow);

  return (
    <main className="main">
      <WeatherCard
        day={weatherData.isDay}
        type={weatherType}
        temperature={displayTemp}
        unit={currentTemperatureUnit}
      />

      <section className="main__weather">
        <p className="main__message">
          Today is{' '}
          {displayTemp !== '--'
            ? `${displayTemp}°${currentTemperatureUnit}`
            : 'unknown'}{' '}
           / You may want to wear:
        </p>
      </section>

      <ul className="main__clothing-items">
        {clothingToShow.length > 0 ? (
          clothingToShow.map(item => (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p>No matching clothes for this weather.</p>
        )}
      </ul>
    </main>
  );
}

export default Main;
