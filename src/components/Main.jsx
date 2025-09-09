// src/components/Main.jsx
import { useContext, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection';
import WeatherCard from './WeatherCard';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';
import { fetchWeather } from '../utils/weatherApi';
import getWeatherIcon from '../utils/getWeatherIcon';   // <- add this
import '../blocks/Main.css';

function Main() {
  const { clothingItems = [], onCardClick } = useOutletContext();
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const [wx, setWx] = useState(null);
  const [isLoadingWeather, setLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchWeather()
      .then((data) => {
        if (!cancelled) { setWx(data); setWeatherError(''); }
      })
      .catch((e) => { if (!cancelled) setWeatherError(e?.message || 'Failed to load weather'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const weatherData = useMemo(() => {
    if (!wx) return null;
    const tempF = Number(wx?.main?.temp);
    const condition = (wx?.weather?.[0]?.main || '').trim();
    const dtMs = wx?.dt ? wx.dt * 1000 : Date.now();
    const sunriseMs = wx?.sys?.sunrise ? wx.sys.sunrise * 1000 : 0;
    const sunsetMs = wx?.sys?.sunset ? wx.sys.sunset * 1000 : 0;
    const isDay = dtMs > sunriseMs && dtMs < sunsetMs;
    return {
      temperature: Number.isFinite(tempF) ? tempF : null,
      condition,
      isDay,
      timestamp: dtMs,
      sunrise: sunriseMs,
      sunset: sunsetMs,
    };
  }, [wx]);

  const { displayTemp, weatherType, recommended, listToShow } = useMemo(() => {
    const rawTemp = weatherData?.temperature ?? null;
    const condLower = (weatherData?.condition || '').toLowerCase();
    let type = 'warm';
    if (condLower === 'snow' || (rawTemp != null && rawTemp < 50)) type = 'cold';
    else if (condLower === 'rain' || (rawTemp != null && rawTemp > 75)) type = 'hot';

    const tempOut =
      rawTemp == null
        ? '--'
        : Math.round(currentTemperatureUnit === 'F' ? rawTemp : ((rawTemp - 32) * 5) / 9);

    const wanted = type.toLowerCase();
    const rec = Array.isArray(clothingItems)
      ? clothingItems.filter((item) => (item?.weather ?? '').toString().toLowerCase() === wanted)
      : [];
    const list = (rec.length ? rec : clothingItems).slice(0, 4);
    return { displayTemp: tempOut, weatherType: type, recommended: rec, listToShow: list };
  }, [weatherData, clothingItems, currentTemperatureUnit]);

  if (isLoadingWeather) return <p className="main__message">Loading weather data...</p>;
  if (weatherError) return <p className="main__message">{weatherError}</p>;
  if (!weatherData) return <p className="main__message">Weather data is unavailable.</p>;

  return (
    <main className="main">
      <WeatherCard
        temperature={displayTemp}
        unit={currentTemperatureUnit}
        isDay={weatherData.isDay}                                  // <- boolean
        icon={getWeatherIcon(weatherData.condition, weatherData.isDay)} // <- show sun/clouds
        timestamp={weatherData.timestamp}
        sunrise={weatherData.sunrise}
        sunset={weatherData.sunset}
      />

      <section className="main__weather">
        <p className="main__message">
          Today is {displayTemp !== '--' ? `${displayTemp}°${currentTemperatureUnit}` : 'unknown'} / You may want to wear:
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


