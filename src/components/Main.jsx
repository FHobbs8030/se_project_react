import { useEffect, useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getWeatherPair } from '../utils/weatherApi.js';
import WeatherCard from './WeatherCard.jsx';
import ClothesSection from './ClothesSection.jsx';
import '../blocks/Main.css';

function filterByWeather(items, tempF) {
  if (tempF == null) return items;
  const t = Number(tempF);

  return items.filter(it => {
    const tag = String(it.weather || it.weatherType || '').toLowerCase();
    if (!tag) return true;
    if (t <= 40) return tag.includes('cold');
    if (t >= 75) return tag.includes('hot');
    return tag.includes('warm') || tag.includes('mild') || tag.includes('cool');
  });
}

export default function Main() {
  const { clothingItems, onCardClick, onCardLike, currentTemperatureUnit } =
    useOutletContext();

  const [weather, setWeather] = useState({
    f: null,
    c: null,
    icon: '',
    isNight: false,
    city: '',
  });

  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setIsLoadingWeather(true);
        const data = await getWeatherPair();
        if (active) setWeather(data);
      } finally {
        if (active) setIsLoadingWeather(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const visibleClothing = useMemo(
    () => filterByWeather(clothingItems || [], weather.f),
    [clothingItems, weather.f]
  );

  const displayTemp = currentTemperatureUnit === 'F' ? weather.f : weather.c;

  return (
    <main className="main">
      <div className="weather-block">
        <WeatherCard
          tempF={weather.f}
          unit={currentTemperatureUnit}
          weatherData={weather}
          isLoadingWeather={isLoadingWeather}
        />
      </div>

      <section className="clothes">
        <div className="panel">
          <h3 className="panel__title">
            Today is {displayTemp == null ? '--' : displayTemp}°
            {currentTemperatureUnit} / You may want to wear:
          </h3>

          <ClothesSection
            clothingItems={visibleClothing}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        </div>
      </section>
    </main>
  );
}
