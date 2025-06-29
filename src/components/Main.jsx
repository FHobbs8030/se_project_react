import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
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

  const clothingToShow =
    clothingItems?.filter(
      item => item.weather.toLowerCase() === weatherType.toLowerCase()
    ) || [];

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

      <ul className="main__clothing-items">
        {clothingToShow.length > 0 ? (
          clothingToShow.map(item => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))
        ) : (
          <p>No matching clothes for this weather.</p>
        )}
      </ul>
    </main>
  );
}

export default Main;
