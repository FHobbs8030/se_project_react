const WEATHER_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_COORDS = (import.meta.env.VITE_DEFAULT_COORDS || "").split(",");
const LAT = DEFAULT_COORDS[0]?.trim();
const LON = DEFAULT_COORDS[1]?.trim();

export async function getWeather() {
  const url = `${WEATHER_URL}?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.message || "Weather fetch failed";
    throw new Error(msg);
  }
  const temp = typeof data?.main?.temp === "number" ? data.main.temp : null;
  const w = Array.isArray(data?.weather) && data.weather[0] ? data.weather[0] : null;
  const iconCode = w?.icon || null;
  const icon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;
  return { temp, condition: w?.main || "", icon };
}
