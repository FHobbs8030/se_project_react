import "../blocks/WeatherCard.css";

function toTempF(src) {
  if (!src) return null;
  let v = src?.main?.temp ?? src?.tempF ?? src?.current?.temp_f ?? null;
  if (typeof v === "string") {
    const n = Number(v.trim());
    v = Number.isFinite(n) ? n : null;
  }
  return Number.isFinite(v) ? Math.round(v) : null;
}

function isDaylight(data) {
  try {
    const ts = Number.isFinite(data?.dt) ? data.dt : null;
    const tz = Number.isFinite(data?.timezone) ? data.timezone : 0;
    const when = ts != null ? new Date((ts + tz) * 1000) : new Date();
    const hr = when.getUTCHours();
    return hr >= 6 && hr < 18;
  } catch {
    return true;
  }
}

export default function WeatherCard({
  weatherData,
  tempUnit = "F",
  sourceUnit = "F",
  locationName,
  formattedDate,
  isLoading = false,
  error = "",
}) {
  const baseF = toTempF(weatherData);
  const reading =
    Number.isFinite(baseF)
      ? sourceUnit === tempUnit
        ? baseF
        : tempUnit === "C"
        ? Math.round((baseF - 32) * (5 / 9))
        : Math.round(baseF * (9 / 5) + 32)
      : null;

  const symbol = tempUnit === "C" ? "°C" : "°F";
  const dayClass = isDaylight(weatherData) ? "weather-card_day" : "weather-card_night";

  return (
    <section className={`weather-card ${dayClass}`}>
      <div className="container">
        <div className="weather-card__inner" aria-busy={isLoading ? "true" : "false"}>
          <div className="weather-card__left">
            {isLoading ? (
              <span className="weather-card__loading">Loading...</span>
            ) : error ? (
              <span className="weather-card__error">{error}</span>
            ) : (
              <div className="weather-card__tempwrap" role="group" aria-label="Current temperature">
                <span className="weather-card__temp">{reading ?? "--"}</span>
                <span className="weather-card__deg">{symbol}</span>
              </div>
            )}
          </div>
          <div className="weather-card__right" aria-hidden="true">
            <div className="weather-card__meta">
              {locationName && <span className="weather-card__city">{locationName}</span>}
              {formattedDate && <span className="weather-card__date">{formattedDate}</span>}
            </div>
            <div className="weather-card__orb" />
          </div>
        </div>
      </div>
    </section>
  );
}
