const WEATHER_API_URL = (import.meta.env.VITE_WEATHER_API_URL ?? 'https://api.openweathermap.org/data/2.5/weather').trim();

const RAW_KEY =
  (import.meta.env.VITE_APP_WEATHER_API_KEY ??
   import.meta.env.VITE_WEATHER_API_KEY ??
   '').trim().replace(/^["']|["']$/g, '');

if (!RAW_KEY) throw new Error('Missing OpenWeather API key. Set VITE_APP_WEATHER_API_KEY in .env');
const WEATHER_KEY = RAW_KEY;

const [DEFAULT_LAT, DEFAULT_LON] = (import.meta.env.VITE_DEFAULT_COORDS ?? '39.1638,-119.7674')
  .split(',')
  .map((n) => Number(n.trim()));

async function handleJSON(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const base = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`;
    if (res.status === 401) throw new Error(base || 'Invalid API key');
    throw new Error(base);
  }
  return data;
}

function buildUrl(lat, lon, units = 'imperial') {
  const url = new URL(WEATHER_API_URL);
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units,
    appid: WEATHER_KEY,
  });
  return url.toString();
}

export async function fetchWeather(arg1 = DEFAULT_LAT, arg2 = DEFAULT_LON, arg3) {
  let lat, lon, units;
  if (typeof arg1 === 'object') {
    lat = arg1.latitude ?? arg1.lat ?? DEFAULT_LAT;
    lon = arg1.longitude ?? arg1.lon ?? DEFAULT_LON;
    units = arg1.units ?? 'imperial';
  } else {
    lat = arg1 ?? DEFAULT_LAT;
    lon = arg2 ?? DEFAULT_LON;
    units = arg3 ?? 'imperial';
  }
  const res = await fetch(buildUrl(lat, lon, units), { method: 'GET' });
  return handleJSON(res);
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
  return { temperature, condition, isDay, timestamp, sunrise, sunset, city: raw?.name ?? '' };
}

export async function getWeather(arg1 = DEFAULT_LAT, arg2 = DEFAULT_LON, arg3) {
  const raw = await fetchWeather(arg1, arg2, arg3);
  return normalizeWeather(raw);
}

export { fetchWeather as fetchWeatherData };
export default fetchWeather;
