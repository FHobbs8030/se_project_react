const BASE = import.meta.env.BASE_URL || '/';

export default function getWeatherIcon(rawCondition = '', isDay = true) {
  const c = String(rawCondition).toLowerCase();

  const key =
    c.includes('clear') ? 'clear' :
    c.includes('cloud') ? 'cloudy' :
    c.includes('rain')  ? 'rainy'  :
    c.includes('snow')  ? 'snowy'  :
    c.includes('fog')   ? 'foggy'  :
    c.includes('storm') || c.includes('thunder') ? 'stormy' :
    null;

  if (!key) return null;

  const dn = isDay ? 'day' : 'night';
  return `${BASE}images/cards/${key}-${dn}.svg`;
}


