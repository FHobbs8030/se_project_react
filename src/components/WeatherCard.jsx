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
  if (!code || typeof code !== 'string' || code.length < 2) return 'clear';
  const prefix = code.slice(0, 2);
  return iconMap[prefix] || 'clear';
}

export default function WeatherCard({
  weatherData,
  tempF,
  unit,
  isLoadingWeather,
}) {
  const outletContext = useOutletContext() || {};
  const resolvedWeather = weatherData ?? outletContext.weather ?? null;

  const tempUnit = unit || outletContext.currentTemperatureUnit || 'F';
  const fahrenheit = Number.isFinite(tempF)
    ? tempF
    : resolvedWeather?.tempF ?? null;

  const display =
    tempUnit === 'C' && fahrenheit != null
      ? Math.round(((fahrenheit - 32) * 5) / 9)
      : fahrenheit;

  const iconCode = resolvedWeather?.icon || '';
  const type = mapIcon(iconCode);
  const isNight = !!resolvedWeather?.isNight;
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
