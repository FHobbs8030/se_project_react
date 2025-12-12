const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Convert Fahrenheit → Celsius
function toC(f) {
  return Math.round((f - 32) * (5 / 9));
}

export async function getWeather() {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=39.1638&lon=-119.7674&appid=${API_KEY}&units=imperial`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');

  const data = await res.json();

  // Temperature
  const f = Math.round(data.main.temp);
  const c = toC(f);

  // Raw fields needed for accurate day/night
  const dt = data.dt; // Current timestamp (UTC)
  const sunrise = data.sys.sunrise; // Sunrise timestamp (UTC)
  const sunset = data.sys.sunset; // Sunset timestamp (UTC)
  const tz = data.timezone; // Offset in seconds

  // Convert to local timestamps for the target city
  const localTime = dt + tz;
  const localSunrise = sunrise + tz;
  const localSunset = sunset + tz;

  // TRUE day/night detection
  const isNight = !(localTime >= localSunrise && localTime < localSunset);

  const icon = data.weather?.[0]?.icon || '';

  return {
    f,
    c,
    icon,
    isNight,
    dt,
    sunrise,
    sunset,
    timezone: tz,
    name: data.name,
  };
}

export async function getWeatherPair() {
  return await getWeather();
}
