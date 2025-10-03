// utils/normalizeWeatherType.js
export default function normalizeWeatherType(main, id) {
  const m = (main || "").toLowerCase();
  if (m === "thunderstorm") return "thunder";
  if (m === "drizzle") return "rain_light";
  if (m === "rain") return id >= 500 && id < 504 ? "rain" : "shower";
  if (m === "snow") return "snow";
  if (m === "mist" || m === "fog" || m === "haze" || m === "smoke") return "fog";
  if (m === "clouds") return id === 801 ? "partly_cloudy" : "cloudy";
  if (m === "clear") return "clear";
  return "default";
}
