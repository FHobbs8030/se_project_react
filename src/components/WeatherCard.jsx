import { useOutletContext } from 'react-router-dom';
import '../blocks/WeatherCard.css';

const iconMap = {
  '01': 'clear',
  '02': 'cloudy',
  '03': 'cloudy',
  '04': 'cloudy',
  '09': 'rain',
  10: 'rain',
  11: 'stormy',
  13: 'snowy',
  50: 'foggy',
};

function mapIcon(code) {
  if (!code || typeof code !== 'string' || code.length < 3) return 'clear';
  const prefix = code.slice(0, 2);
  return iconMap[prefix] || 'clear';
}

export default function WeatherCard({
  weatherData,
  tempF,
  unit,
  isLoadingWeather,
}) {
  const ctx = useOutletContext() || {};
  const wd = weatherData ?? ctx.weatherData ?? null;

  const tempUnit = unit || ctx.currentTemperatureUnit || 'F';
  const f = Number.isFinite(tempF) ? tempF : wd?.f ?? null;
  const display =
    tempUnit === 'C' && f != null ? Math.round(((f - 32) * 5) / 9) : f;

  const iconCode = wd?.icon || '';
  const type = mapIcon(iconCode);
  const isNight = wd?.isNight;
  const iconPath = `/images/icons/${isNight ? 'night' : 'day'}/${type}.svg`;

  return (
    <div className="weather-card__outer">
      <section
        className={`weather-card ${
          isNight ? 'weather-card_night' : 'weather-card_day'
        }`}
        aria-busy={!!isLoadingWeather}
      >
        <div className="weather-card__inner">
          <div className="weather-card__left">
            <span className="weather-card__temp">{display ?? '--'}</span>
            <span className="weather-card__deg">°{tempUnit}</span>
          </div>

          <div className="weather-card__icon-wrapper">
            <img
              className="weather-card__icon"
              src={iconPath}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
