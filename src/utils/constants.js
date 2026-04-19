// src/utils/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');

export const WEATHER_URL = import.meta.env.VITE_WEATHER_API_URL;

export const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const DEFAULT_COORDS = (import.meta.env.VITE_DEFAULT_COORDS || "37.7749,-122.4194")
  .split(",")
  .map((n) => Number(n.trim()));

export const LOCATION_NAME =
  import.meta.env.VITE_LOCATION_NAME || "Your city";