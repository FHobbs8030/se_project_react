const API_KEY = "3d0d531d6ea32e66f08e7e0fa3be4ea0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temp) => {
  if (temp > 86) {
    return "hot";
  } else if (temp >= 65 && temp <= 85) {
    return "warm";
  } else {
    return "cold";
  }
};

const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = Math.round(data.main.temp);
  result.type = getWeatherType(result.temp);
  result.isDay = isDay(data.sys, Date.now());
  result.condition = data.weather[0].main.toLowerCase();
  return result;
};

// ✅ Main API call
export function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY || window.location.hostname !== "localhost" && !API_KEY) {
    // Fallback data for GitHub or missing key
    console.warn("Missing API key or running in fallback mode. Using mock weather.");
    return Promise.resolve({
      name: "Carson City",
      main: { temp: 72 },
      sys: { sunrise: 1718620800, sunset: 1718671200 }, // Fake sunrise/sunset
      weather: [{ main: "Clear" }],
    });
  }

  return fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch weather: ${res.status}`);
      }
      return res.json();
    });
}

export { getWeatherType, filterWeatherData };
