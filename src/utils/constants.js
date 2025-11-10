// src/utils/constants.js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const WEATHER_URL =
  import.meta.env.VITE_WEATHER_API_URL ||
  "https://api.openweathermap.org/data/2.5/weather";

export const WEATHER_KEY =
  import.meta.env.VITE_WEATHER_API_KEY ||
  import.meta.env.VITE_OPENWEATHER_API_KEY ||
  "3d0d531d6ea32e66f08e7e0fa3be4ea0"; // fallback if env not set

export const DEFAULT_COORDS = (import.meta.env.VITE_DEFAULT_COORDS || "37.7749,-122.4194")
  .split(",")
  .map((n) => Number(n.trim()));

export const LOCATION_NAME =
  import.meta.env.VITE_LOCATION_NAME || "Your city";
