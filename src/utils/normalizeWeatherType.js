export default function normalizeWeatherType(main, id) {
  const conditionLower = (main || '').toLowerCase();

  if (conditionLower === 'thunderstorm') return 'thunder';
  if (conditionLower === 'drizzle') return 'rain_light';
  if (conditionLower === 'rain')
    return id >= 500 && id < 504 ? 'rain' : 'shower';
  if (conditionLower === 'snow') return 'snow';
  if (
    conditionLower === 'mist' ||
    conditionLower === 'fog' ||
    conditionLower === 'haze' ||
    conditionLower === 'smoke'
  )
    return 'fog';
  if (conditionLower === 'clouds')
    return id === 801 ? 'partly_cloudy' : 'cloudy';
  if (conditionLower === 'clear') return 'clear';

  return 'default';
}
