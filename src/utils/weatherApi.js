import { checkResponse } from "./apiUtils.js";

export function fetchWeather({ apiUrl, apiKey, lat, lon, units = "imperial" }) {
  const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  return fetch(url)
    .then(checkResponse)
    .then((d) => ({
      tempF: Math.round(d.main?.temp ?? 0),
      description: d.weather?.[0]?.main ?? "",
      city: d.name ?? "",
    }));
}

