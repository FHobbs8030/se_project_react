// src/components/WeatherCard.jsx
import PropTypes from "prop-types";
import "../blocks/WeatherCard.css";

function formatTemp(t) {
  if (t === null || t === undefined) return "—";
  const n = Number(t);
  if (!Number.isFinite(n)) return "—";
  return `${Math.round(n)}°F`;
}

export default function WeatherCard({ temperature }) {
  return (
    <section className="weather" aria-live="polite">
      <div className="weather__temp">{formatTemp(temperature)}</div>
    </section>
  );
}

WeatherCard.propTypes = {
  temperature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
