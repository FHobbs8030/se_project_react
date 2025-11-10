import { WEATHER_URL, WEATHER_KEY, DEFAULT_COORDS } from "./constants.js";

export async function getWeatherPair() {
  const [lat, lon] = DEFAULT_COORDS;
  const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "weather failed");
  const c = Math.round(data?.main?.temp ?? NaN);
  const f = Math.round(c * 9 / 5 + 32);
  return { c, f };
}
