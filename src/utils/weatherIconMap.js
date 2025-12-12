const iconMap = {
  '01': 'clear',
  '02': 'cloudy',
  '03': 'cloudy',
  '04': 'cloudy',
  '09': 'rain',
  10: 'rain',
  11: 'stormy',
  13: 'snowy',
  50: 'foggy',
};

export default function getWeatherIcon(iconCode = '') {
  if (!iconCode || iconCode.length < 3) return null;

  const base = iconCode.slice(0, 2);
  const time = iconCode.endsWith('n') ? 'night' : 'day';
  const name = iconMap[base] || 'clear';

  return `/images/icons/${time}/${name}.svg`;
}
