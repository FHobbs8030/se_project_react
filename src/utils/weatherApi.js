export async function fetchWeather({ apiUrl, apiKey, lat, lon, units = "imperial" }) {
  const url = `${apiUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather error ${res.status}`);
  return res.json();
}
