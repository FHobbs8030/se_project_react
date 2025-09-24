const cToF = (c) => (c * 9) / 5 + 32;
const fToC = (f) => ((f - 32) * 5) / 9;
const kToC = (k) => k - 273.15;

export function getDisplayTemp(weatherData, unit = "F") {
  if (!weatherData) return null;

  const fFromObj = weatherData?.temp?.F ?? weatherData?.temperatureF;
  const cFromObj = weatherData?.temp?.C ?? weatherData?.temperatureC;

  const raw =
    fFromObj ??
    cFromObj ??
    weatherData?.temp ??
    weatherData?.temperature ??
    weatherData?.main?.temp ??
    null;

  if (raw == null || Number.isNaN(raw)) return null;

  const scale =
    weatherData?.unit ||
    weatherData?.units ||
    weatherData?.scale ||
    (fFromObj != null ? "F" : cFromObj != null ? "C" : null);

  let tempF;
  if (scale === "F" || scale === "imperial") {
    tempF = Math.round(raw);
  } else if (scale === "C" || scale === "metric") {
    tempF = Math.round(cToF(raw));
  } else if (scale === "K") {
    tempF = Math.round(cToF(kToC(raw)));
  } else {
    if (raw > 200) tempF = Math.round(cToF(kToC(raw)));
    else if (raw <= 60) tempF = Math.round(cToF(raw));
    else tempF = Math.round(raw);
  }

  return unit === "F" ? tempF : Math.round(fToC(tempF));
}
