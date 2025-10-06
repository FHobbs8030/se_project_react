import PropTypes from "prop-types";
import "../blocks/WeatherCard.css";

export default function WeatherCard({ shownTemp, icon, city, isDay }) {
  const dayClass = isDay ? "weather-card_day" : "weather-card_night";
  return (
    <section className={`weather-card ${dayClass}`}>
      <div className="weather-card__overlay" />
      <div className="weather-card__temp">{shownTemp}</div>
      <div className="weather-card__meta">
        <span className="weather-card__city">{city}</span>
      </div>
      {icon && (
        <img className="weather-card__icon" src={icon} alt="Weather" />
      )}
    </section>
  );
}

WeatherCard.propTypes = {
  shownTemp: PropTypes.string.isRequired,
  icon: PropTypes.string,
  city: PropTypes.string,
  isDay: PropTypes.bool,
};
