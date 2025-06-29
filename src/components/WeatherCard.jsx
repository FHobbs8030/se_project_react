import React from 'react';
import '../blocks/WeatherCard.css';

import clearDay from '../images/icons/day/clear.svg';
import cloudyDay from '../images/icons/day/cloudy.svg';
import foggyDay from '../images/icons/day/foggy.svg';
import rainyDay from '../images/icons/day/rain.svg';
import snowyDay from '../images/icons/day/snowy.svg';
import stormyDay from '../images/icons/day/stormy.svg';

import clearNight from '../images/icons/night/clear.svg';
import cloudyNight from '../images/icons/night/cloudy.svg';
import foggyNight from '../images/icons/night/foggy.svg';
import rainyNight from '../images/icons/night/rain.svg';
import snowyNight from '../images/icons/night/snowy.svg';
import stormyNight from '../images/icons/night/stormy.svg';

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
  const t = type?.toLowerCase() || '';
  if (['clear', 'sunny'].includes(t)) return 'clear';
  if (['clouds', 'cloudy', 'overcast'].includes(t)) return 'cloudy';
  if (['fog', 'foggy', 'haze', 'mist'].includes(t)) return 'foggy';
  if (['rain', 'drizzle'].includes(t)) return 'rain';
  if (['snow', 'sleet'].includes(t)) return 'snowy';
  if (['storm', 'thunderstorm'].includes(t)) return 'stormy';
  return 'clear';
};

function WeatherCard({ day = true, type = 'clear', temperature = '--', unit = 'F' }) {
  const timeOfDay = day ? 'day' : 'night';
  const weatherKey = normalizeWeatherType(type);
  const imageSrc = cardImages[timeOfDay]?.[weatherKey] || clearDay;
  const altText = `${weatherKey} ${timeOfDay} weather icon`;

  return (
    <section className="weather-card">
      <img src={imageSrc} alt={altText} className="weather-card__image" />
      <div className={`weather-card__overlay ${timeOfDay}`}>
        <p className="weather-card__temp">
          {temperature}°{unit}
        </p>
      </div>
    </section>
  );
}

export default WeatherCard;
