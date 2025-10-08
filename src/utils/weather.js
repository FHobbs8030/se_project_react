// src/utils/weather.js
export async function getWeather() {
  const base = import.meta.env.VITE_WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather";
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  const [lat, lon] = (import.meta.env.VITE_DEFAULT_COORDS || "40.7128,-74.0060").split(",").map(Number);
  const url = `${base}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather ${res.status}`);
  const data = await res.json();
  return {
    name: data?.name ?? "",
    sys: data?.sys ?? {},
    weather: Array.isArray(data?.weather) ? data.weather : [],
    main: { temp: typeof data?.main?.temp === "number" ? data.main.temp : null },
  };
}
