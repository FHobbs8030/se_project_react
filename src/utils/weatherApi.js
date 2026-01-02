const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function toC(fahrenheit) {
  return Math.round((fahrenheit - 32) * (5 / 9));
}

export async function getWeather() {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=39.1638&lon=-119.7674&appid=${API_KEY}&units=imperial`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');

  const data = await res.json();

  const fahrenheit = Math.round(data.main.temp);
  const celsius = toC(fahrenheit);

  const currentTimeUtc = data.dt;
  const sunriseUtc = data.sys.sunrise;
  const sunsetUtc = data.sys.sunset;
  const timezoneOffsetSeconds = data.timezone;

  const localTime = currentTimeUtc + timezoneOffsetSeconds;
  const localSunrise = sunriseUtc + timezoneOffsetSeconds;
  const localSunset = sunsetUtc + timezoneOffsetSeconds;

  const isNight = !(localTime >= localSunrise && localTime < localSunset);

  const icon = data.weather?.[0]?.icon || '';

  return {
    f: fahrenheit,
    c: celsius,
    icon,
    isNight,
    currentTimeUtc,
    sunriseUtc,
    sunsetUtc,
    timezoneOffsetSeconds,
    name: data.name,
  };
}

export async function getWeatherPair() {
  return await getWeather();
}
