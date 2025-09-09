import PropTypes from "prop-types";
import "../blocks/WeatherCard.css"; 

export default function WeatherCard({
  temperature,
  unit = "F",
  isDay,               
  icon,                
  timestamp, sunrise, sunset, 
}) {
  const tempNum = typeof temperature === "number" ? temperature : Number(temperature);

  let dayFlag = isDay;
  if (typeof dayFlag !== "boolean" && sunrise && sunset && timestamp) {
    dayFlag = timestamp > sunrise && timestamp < sunset;
  }

  if (!Number.isFinite(tempNum)) {
    return (
      <section className="weather-card weather-card--empty" aria-live="polite">
        <p>Weather data is unavailable.</p>
      </section>
    );
  }

  return (
    <section className="weather-card">{/* or: style={{ backgroundImage: `url(${bg})` }} */}
      <div className={`weather-card__overlay ${dayFlag ? "day" : "night"}`}>
        <div className="weather-card__temp">{Math.round(tempNum)}°{unit}</div>
        {icon && <img className="weather-card__icon" src={icon} alt="" aria-hidden="true" />}
      </div>
    </section>
  );
}

WeatherCard.propTypes = {
  temperature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
  isDay: PropTypes.bool,
  icon: PropTypes.string,
  timestamp: PropTypes.number,
  sunrise: PropTypes.number,
  sunset: PropTypes.number,
};


