// src/utils/weatherApi.js

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "3d0d531d6ea32e66f08e7e0fa3be4ea0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Helper to check if it's daytime
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// Convert temperature to weather type
const getWeatherType = (temp) => {
  if (temp > 86) return "hot";
  if (temp >= 65 && temp <= 86) return "warm";
  return "cold";
};

// Format weather data into custom structure
const filterWeatherData = (data) => {
  const now = Date.now();
  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    type: getWeatherType(data.main.temp),
    isDay: isDay(data.sys, now),
    condition: data.weather[0].main.toLowerCase(),
    location: data.name,
  };
};

// Fetch weather data based on coordinates
export const fetchWeatherByCoords = (lat, lon) => {
  const useFallback =
    !API_KEY || (window.location.hostname !== "localhost" && !API_KEY);

  const fallbackData = {
    name: "Carson City",
    main: { temp: 72 },
    sys: {
      sunrise: 1718620800, // 6:00 AM
      sunset: 1718671200,  // 8:00 PM
    },
    weather: [{ main: "Clear" }],
  };

  if (useFallback) {
    console.warn("⚠️ No valid API key found. Using fallback weather data.");
    return Promise.resolve(fallbackData);
  }

  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  console.log("🌐 Fetching weather from:", url);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Weather fetch failed");
      return res.json();
    })
    .catch((err) => {
      console.error("❌ Weather API error:", err);
      return fallbackData;
    });
};

export { filterWeatherData, getWeatherType };
