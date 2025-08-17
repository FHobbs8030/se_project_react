import React, { useContext, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from '../components/ClothesSection';
import WeatherCard from './WeatherCard';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import '../blocks/Main.css';

function Main() {
  const {
    weatherData,
    clothingItems = [],
    onCardClick,
    isLoadingWeather,
    weatherError,
  } = useOutletContext();

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const { displayTemp, weatherType, recommended, listToShow } = useMemo(() => {
    const rawTemp =
      typeof weatherData?.temperature === 'number' ? weatherData.temperature : null;
    const condition = (weatherData?.condition || '').toLowerCase();

    let type = 'warm';
    if (condition === 'snow' || (rawTemp != null && rawTemp < 50)) type = 'cold';
    else if (condition === 'rain' || (rawTemp != null && rawTemp > 75)) type = 'hot';

    const tempOut =
      rawTemp == null
        ? '--'
        : Math.round(
            currentTemperatureUnit === 'F' ? rawTemp : ((rawTemp - 32) * 5) / 9
          );

    const wanted = type.toLowerCase();
    const rec = Array.isArray(clothingItems)
      ? clothingItems.filter(
          (item) => (item?.weather ?? '').toString().toLowerCase() === wanted
        )
      : [];

    const list = (rec.length ? rec : clothingItems).slice(0, 4);

    return {
      displayTemp: tempOut,
      weatherType: type,
      recommended: rec,
      listToShow: list,
    };
  }, [weatherData, clothingItems, currentTemperatureUnit]);

  if (isLoadingWeather) {
    return <p className="main__message">Loading weather data...</p>;
  }
  if (weatherError) {
    return <p className="main__message">{weatherError}</p>;
  }
  if (!weatherData || typeof weatherData !== 'object') {
    return <p className="main__message">Weather data is unavailable.</p>;
  }

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
          {displayTemp !== '--' ? `${displayTemp}°${currentTemperatureUnit}` : 'unknown'} / You may
          want to wear:
        </p>
      </section>

      <ClothesSection
        clothingItems={listToShow}
        onCardClick={onCardClick}
        weatherType={recommended.length ? weatherType : null}
        showMessage={false}
      />
    </main>
  );
}

export default Main;
