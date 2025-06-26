import React from 'react';
import '../blocks/WeatherCard.css';

import clearDay from '../images/cards/clear-day.svg';
import clearNight from '../images/cards/clear-night.svg';
import cloudyDay from '../images/cards/cloudy-day.svg';
import cloudyNight from '../images/cards/cloudy-night.svg';
import foggyDay from '../images/cards/foggy-day.svg';
import foggyNight from '../images/cards/foggy-night.svg';
import rainyDay from '../images/cards/rainy-day.svg';
import rainyNight from '../images/cards/rainy-night.svg';
import snowyDay from '../images/cards/snowy-day.svg';
import snowyNight from '../images/cards/snowy-night.svg';
import stormyDay from '../images/cards/stormy-day.svg';
import stormyNight from '../images/cards/stormy-night.svg';

const cardImages = {
  day: {
    clear: clearDay,
    cloudy: cloudyDay,
    foggy: foggyDay,
    rain: rainyDay,
    snowy: snowyDay,
    stormy: stormyDay,
  },
  night: {
    clear: clearNight,
    cloudy: cloudyNight,
    foggy: foggyNight,
    rain: rainyNight,
    snowy: snowyNight,
    stormy: stormyNight,
  },
};

const normalizeWeatherType = (type) => {
  const t = type.toLowerCase();
  if (['clear', 'sunny'].includes(t)) return 'clear';
  if (['clouds', 'cloudy', 'overcast'].includes(t)) return 'cloudy';
  if (['fog', 'foggy', 'haze'].includes(t)) return 'foggy';
  if (['rain', 'drizzle'].includes(t)) return 'rain';
  if (['snow', 'sleet'].includes(t)) return 'snowy';
  if (['storm', 'thunderstorm'].includes(t)) return 'stormy';
  return 'clear'; // fallback
};

function WeatherCard({ day, type, temperature, unit }) {
  const timeOfDay = day ? 'day' : 'night';
  const weatherKey = normalizeWeatherType(type);
  const imageSrc = cardImages[timeOfDay][weatherKey];
  const altText = `${weatherKey} ${timeOfDay} weather card`;

  return (
    <section className="weather-card">
      <img src={imageSrc} alt={altText} className="weather-card__full" />
      <div className={`weather-card__overlay ${timeOfDay}`}>
        <p className="weather-card__temp">{temperature}°{unit}</p>
      </div>
    </section>
  );
}

export default WeatherCard;
