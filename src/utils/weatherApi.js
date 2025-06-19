const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "3d0d531d6ea32e66f08e7e0fa3be4ea0";
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
  result.temperature = Math.round(data.main.temp); 
  result.type = getWeatherType(result.temperature);
  result.isDay = isDay(data.sys, Date.now());
  result.condition = data.weather[0].main.toLowerCase();
  return result;
};

export function fetchWeatherByCoords(lat, lon) {
  const useFallback = !API_KEY || (window.location.hostname !== "localhost" && !API_KEY);
  const fallbackData = {
    name: "Carson City",
    main: { temp: 72 },
    sys: { sunrise: 1718620800, sunset: 1718671200 },
    weather: [{ main: "Clear" }]
  };

  if (useFallback) {
    console.warn("Using fallback weather data.");
    return Promise.resolve(fallbackData);
  }

  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  console.log("Fetching weather from:", url);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.warn("Weather fetch failed. Using fallback.");
        return fallbackData;
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Weather API error:", err);
      return fallbackData;
    });
}

export { getWeatherType, filterWeatherData };
