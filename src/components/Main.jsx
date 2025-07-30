import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from '../components/ClothesSection'; 
import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import '../blocks/Main.css';

function Main() {
  const {
    weatherData,
    clothingItems,
    onCardClick,
    isLoadingWeather,
    weatherError,
  } = useOutletContext();

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (isLoadingWeather) {
    return <p className="main__message">Loading weather data...</p>;
  }

  if (weatherError) {
    return <p className="main__message">{weatherError}</p>;
  }

  if (!weatherData || typeof weatherData !== 'object') {
    return <p className="main__message">Weather data is unavailable.</p>;
  }

  const rawTemp = weatherData.temperature;
  let weatherType = 'warm';

  if (weatherData.condition === 'snow' || rawTemp < 50) {
    weatherType = 'cold';
  } else if (weatherData.condition === 'rain' || rawTemp > 75) {
    weatherType = 'hot';
  }

  const displayTemp =
    rawTemp !== undefined && rawTemp !== null
      ? Math.round(
          currentTemperatureUnit === 'F' ? rawTemp : ((rawTemp - 32) * 5) / 9
        )
      : '--';

  console.log('Computed weatherType:', weatherType);
  console.log('All items:', clothingItems);
  console.log(
    'Filtered items for weather:',
    clothingItems.filter(
      item => item.weather.toLowerCase() === weatherType.toLowerCase()
    )
  );

  const clothingToShow =
    clothingItems
      ?.filter(item => item.weather.toLowerCase() === weatherType.toLowerCase())
      .slice(0, 4) || [];

  const noScaleItems = ['Sneakers', 'Vintage Cap'];

  return (
    <main className="main">
      <WeatherCard
        day={weatherData.isDay ? 'day' : 'night'}
        type={weatherData.condition}
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

     <ClothesSection
  clothingItems={clothingToShow}
  onCardClick={onCardClick}
  weatherType={weatherType}
  showMessage={false}
/>

    </main>
  );
}

export default Main;
