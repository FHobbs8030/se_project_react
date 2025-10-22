import { createContext } from "react";
export const WeatherContext = createContext({
  weatherData: null,
  isLoadingWeather: false,
});

