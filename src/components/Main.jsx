// src/components/Main.jsx
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
    if (t <= 40) return tag.includes('cold');
    if (t >= 75) return tag.includes('hot');
    return tag.includes('warm') || tag.includes('mild') || tag.includes('cool');
  });
}

export default function Main() {
  const { clothingItems, onCardClick, onCardLike, currentTemperatureUnit } =
    useOutletContext();

  const [temps, setTemps] = useState({ f: null, c: null });
  const [loadingWx, setLoadingWx] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingWx(true);
        const pair = await getWeatherPair();
        if (alive) setTemps(pair);
      } finally {
        if (alive) setLoadingWx(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(
    () => filterByWeather(clothingItems || [], temps.f),
    [clothingItems, temps.f]
  );

  const displayTemp = currentTemperatureUnit === 'F' ? temps.f : temps.c;

  return (
    <main className="main">
      <div className="weather-block">
        <WeatherCard
          tempF={temps.f}
          unit={currentTemperatureUnit}
          isLoadingWeather={loadingWx}
        />
      </div>

      <section className="clothes">
        <div className="panel">
          <h3 className="panel__title">
            Today is {displayTemp == null ? '--' : displayTemp}°
            {currentTemperatureUnit} / You may want to wear:
          </h3>

          <ClothesSection
            items={visible}
            clothingItems={visible}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        </div>
      </section>
    </main>
  );
}
