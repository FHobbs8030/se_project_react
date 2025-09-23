const BASE = import.meta.env.BASE_URL || "/";

export default function getWeatherIcon(rawCondition = "", isDay = true) {
  const c = String(rawCondition).toLowerCase();
  const key =
    c.includes("clear") ? "clear" :
    c.includes("cloud") ? "cloudy" :
    c.includes("rain")  ? "rain"   :
    c.includes("snow")  ? "snowy"  :
    c.includes("fog") || c.includes("mist") || c.includes("haze") ? "foggy" :
    c.includes("storm") || c.includes("thunder") ? "stormy" :
    "foggy";
  const dn = isDay ? "day" : "night";
  return `${BASE}images/icons/${dn}/${key}.svg`;
}
