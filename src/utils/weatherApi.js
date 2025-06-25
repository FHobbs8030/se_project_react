const APIkey = "3d0d531d6ea32e66f08e7e0fa3be4ea0";
const latitude = 39.1638;
const longitude = -119.7674;

const getWeatherType = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 600) return "rainy";
  if (weatherCode >= 600 && weatherCode < 700) return "snow";
  if (weatherCode >= 700 && weatherCode < 800) return "cloudy";
  if (weatherCode === 800) return "clear";
  if (weatherCode > 800) return "cloudy";
  return "clear";
};

const isDaytime = (currentTime, sunrise, sunset) => {
  return currentTime >= sunrise && currentTime < sunset;
};

export const fetchWeatherData = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Weather API request failed");
      }
      return res.json();
    })
    .then((data) => {
      const weatherCode = data.weather[0].id;
      const weatherType = getWeatherType(weatherCode);

      const currentTime = data.dt;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const isDay = isDaytime(currentTime, sunrise, sunset);

      return {
        temperature: data.main.temp,
        condition: weatherType, // used by WeatherCard
        type: weatherType,      // used by Main.jsx
        isDay: isDay,
      };
    })
    .catch((err) => {
      console.error("Error fetching weather data:", err);
      return null;
    });
};
