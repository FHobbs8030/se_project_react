const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const [lat, lon] = (import.meta.env.VITE_DEFAULT_COORDS || "").split(",");

export const getWeather = async () => {
  const url = `${apiUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed weather fetch");
  const data = await res.json();
  const tempF = data?.main?.temp ?? null;
  const iconCode = data?.weather?.[0]?.icon || "";
  const isDay = iconCode?.includes("d");
  const city = data?.name || "";
  const icon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";
  return { tempF, isDay, icon, city };
};
