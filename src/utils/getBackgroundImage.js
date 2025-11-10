// src/utils/getBackgroundImage.js
export default function getBackgroundImage(condition = '', timestamp, sunrise, sunset) {
  const isDay = Number.isFinite(timestamp) && Number.isFinite(sunrise) && Number.isFinite(sunset)
    ? timestamp > sunrise && timestamp < sunset
    : true;

  const map = {
    Clear:        { day: '/images/cards/clear-day.svg',   night: '/images/cards/clear-night.svg' },
    Clouds:       { day: '/images/cards/cloudy-day.svg',  night: '/images/cards/cloudy-night.svg' },
    Rain:         { day: '/images/cards/rainy-day.svg',   night: '/images/cards/rainy-night.svg' },
    Drizzle:      { day: '/images/cards/rainy-day.svg',   night: '/images/cards/rainy-night.svg' },
    Snow:         { day: '/images/cards/snowy-day.svg',   night: '/images/cards/snowy-night.svg' },
    Thunderstorm: { day: '/images/cards/stormy-day.svg',  night: '/images/cards/stormy-night.svg' },
    Mist:         { day: '/images/cards/foggy-day.svg',   night: '/images/cards/foggy-night.svg' },
    Fog:          { day: '/images/cards/foggy-day.svg',   night: '/images/cards/foggy-night.svg' },
    Haze:         { day: '/images/cards/foggy-day.svg',   night: '/images/cards/foggy-night.svg' },
  };

  const entry = map[condition] || map.Clear;
  return entry[isDay ? 'day' : 'night'];
}


