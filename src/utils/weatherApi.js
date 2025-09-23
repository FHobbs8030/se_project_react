const WEATHER_API_URL =
  (import.meta.env.VITE_WEATHER_API_URL ?? 'https://api.openweathermap.org/data/2.5/weather').trim();

const WEATHER_KEY =
  (import.meta.env.VITE_WEATHER_API_KEY ??
    import.meta.env.VITE_APP_WEATHER_API_KEY ??
    '').trim();

const [DEFAULT_LAT, DEFAULT_LON] = (import.meta.env.VITE_DEFAULT_COORDS ?? '39.1638,-119.7674')
  .split(',')
  .map((n) => Number(n));

const handleJSON = async (res) => {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
};

const buildUrl = (lat, lon, units = 'imperial') => {
  const url = new URL(WEATHER_API_URL);
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units: units,
    appid: WEATHER_KEY,
  });
  return url.toString();
};

export async function fetchWeather(arg1 = DEFAULT_LAT, arg2 = DEFAULT_LON, arg3) {
  if (!WEATHER_KEY) throw new Error('Missing weather API key');
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

// Alias so App.jsx's import doesn't break
export const getWeather = fetchWeather;
