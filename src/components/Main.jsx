import { useContext, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection';
import WeatherCard from './WeatherCard';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { fetchWeather } from '../utils/weatherApi';
import '../blocks/Main.css';

export default function Main() {
  const { clothingItems = [], onCardClick, onDeleteClick } = useOutletContext();
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const [wx, setWx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchWeather()
      .then(data => {
        if (!cancelled) {
          setWx(data);
          setWeatherError('');
        }
      })
      .catch(e => {
        if (!cancelled) {
          setWeatherError(e?.message || 'Failed to load weather');
          setWx({
            sys: { sunrise: 0, sunset: 24 * 3600 },
            main: { temp: 72 },
            weather: [{ main: 'Clear' }],
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const norm = useMemo(() => {
    if (!wx) return null;
    const tempF = Number(wx?.main?.temp);
    const ts = Math.floor(Date.now() / 1000);
    const sunrise = Number(wx?.sys?.sunrise) || 0;
    const sunset = Number(wx?.sys?.sunset) || 24 * 3600;
    const isDay = ts > sunrise && ts < sunset;
    return {
      tempF: Number.isFinite(tempF) ? tempF : null,
      ts,
      sunrise,
      sunset,
      isDay,
    };
  }, [wx]);

  const displayTemp = useMemo(() => {
    if (!norm || norm.tempF == null) return '--';
    return Math.round(
      currentTemperatureUnit === 'F' ? norm.tempF : ((norm.tempF - 32) * 5) / 9
    );
  }, [norm, currentTemperatureUnit]);

  const weatherType = useMemo(() => {
    const t = norm?.tempF;
    if (t != null && t < 50) return 'cold';
    if (t != null && t > 75) return 'hot';
    return 'warm';
  }, [norm]);

  const recommended = useMemo(() => {
    const wanted = weatherType.toLowerCase();
    return Array.isArray(clothingItems)
      ? clothingItems.filter(
          item => (item?.weather ?? '').toString().toLowerCase() === wanted
        )
      : [];
  }, [clothingItems, weatherType]);

  const listToShow = (recommended.length ? recommended : clothingItems).slice(
    0,
    4
  );

  return (
    <main className="main">
      <WeatherCard
        temperature={norm?.tempF ?? null}
        unit={currentTemperatureUnit}
        isDay={norm?.isDay}
        icon={undefined}
        timestamp={norm?.ts}
        sunrise={norm?.sunrise}
        sunset={norm?.sunset}
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
      {loading ? (
        <p className="main__message">Loading weather data...</p>
      ) : weatherError ? (
        <p className="main__message">{weatherError}</p>
      ) : null}

      <ClothesSection
        clothingItems={listToShow}
        onCardClick={onCardClick}
        onDeleteItem={onDeleteClick}
        showDelete={true}
        showMessage={false}
      />
    </main>
  );
}
