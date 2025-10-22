const OW_URL = import.meta.env.VITE_WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather";
const OW_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
const DEFAULT_COORDS = import.meta.env.VITE_DEFAULT_COORDS || "";
const DEFAULT_CITY = import.meta.env.VITE_LOCATION_NAME || "New York";

function buildUrl({ city, coords, units }) {
  const u = new URL(OW_URL);
  if (coords && coords.includes(",")) {
    const [lat, lon] = coords.split(",").map((s) => s.trim());
    u.searchParams.set("lat", lat);
    u.searchParams.set("lon", lon);
  } else {
    u.searchParams.set("q", city || DEFAULT_CITY);
  }
  u.searchParams.set("appid", OW_KEY);
  u.searchParams.set("units", units || "imperial");
  return u.toString();
}

export async function getWeather({ city = DEFAULT_CITY, coords = DEFAULT_COORDS, units = "imperial" } = {}) {
  const url = buildUrl({ city, coords, units });
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
