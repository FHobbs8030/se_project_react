const WEATHER_KEY = (import.meta.env.VITE_APP_WEATHER_API_KEY ?? '').trim();
const [DEFAULT_LAT, DEFAULT_LON] = (import.meta.env.VITE_DEFAULT_COORDS ?? '39.1638,-119.7674')
  .split(',')
  .map((n) => Number(n));

export async function fetchWeather(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  if (!WEATHER_KEY) {
    throw new Error('Missing VITE_APP_WEATHER_API_KEY');
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units: 'imperial',
    appid: WEATHER_KEY,
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    let details = '';
    try { details = await res.text(); } catch {}
    throw new Error(`Weather API ${res.status}${details ? `: ${details}` : ''}`);
  }
  return res.json();
}

export function normalizeWeather(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      temperature: null,
      condition: 'Clear',
      isDay: true,
      timestamp: null,
      sunrise: null,
      sunset: null,
      city: '',
    };
  }

  const temperature = typeof raw?.main?.temp === 'number' ? raw.main.temp : null;
  const condition = raw?.weather?.[0]?.main ?? 'Clear';
  const timestamp = typeof raw?.dt === 'number' ? raw.dt : null;
  const sunrise = typeof raw?.sys?.sunrise === 'number' ? raw.sys.sunrise : null;
  const sunset = typeof raw?.sys?.sunset === 'number' ? raw.sys.sunset : null;

  const isDay =
    timestamp != null && sunrise != null && sunset != null
      ? timestamp > sunrise && timestamp < sunset
      : true;

  return {
    temperature,
    condition,
    isDay,
    timestamp,
    sunrise,
    sunset,
    city: raw?.name ?? '',
  };
}

export async function getWeather(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  const raw = await fetchWeather(lat, lon);
  return normalizeWeather(raw);
}

// Back-compat aliases/exports
export { fetchWeather as fetchWeatherData };
export default fetchWeather;
