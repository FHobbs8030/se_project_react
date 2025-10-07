const WURL = import.meta.env.VITE_WEATHER_API_URL;
const KEY  = import.meta.env.VITE_WEATHER_API_KEY;
const [lat, lon] = (import.meta.env.VITE_DEFAULT_COORDS || "40.7128,-74.0060").split(",");

export async function getWeather() {
  const url = `${WURL}?lat=${lat}&lon=${lon}&units=imperial&appid=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("weather failed");
  const data = await res.json();
  const tempF = Math.round(data.main?.temp ?? 0);
  const tempC = Math.round((tempF - 32) * 5 / 9);
  const band = tempF >= 75 ? "hot" : tempF >= 55 ? "warm" : "cold";
  return { tempF, tempC, band, name: data.name ?? "" };
}
