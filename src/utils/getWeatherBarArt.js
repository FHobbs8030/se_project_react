// src/utils/getWeatherBarArt.js
export default function getWeatherBarArt(condition = "Clear", isDay = true) {
  const d = isDay ? "day" : "night";
  const map = {
    Clear:        `/images/cards/clear-${d}-right.svg`,
    Clouds:       `/images/cards/cloudy-${d}-right.svg`,
    Rain:         `/images/cards/rainy-${d}-right.svg`,
    Drizzle:      `/images/cards/rainy-${d}-right.svg`,
    Snow:         `/images/cards/snowy-${d}-right.svg`,
    Thunderstorm: `/images/cards/stormy-${d}-right.svg`,
    Mist:         `/images/cards/foggy-${d}-right.svg`,
    Fog:          `/images/cards/foggy-${d}-right.svg`,
    Haze:         `/images/cards/foggy-${d}-right.svg`,
  };
  return map[condition] || map.Clear;
}
