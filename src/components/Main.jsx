import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import "../blocks/Weather.css";
import "../blocks/Cards.css";

export default function Main() {
  const ctx = useOutletContext() || {};
  const {
    weatherData = null,
    clothingItems = [],
    isLoadingWeather = false,
    isLoadingItems = false,
    onCardClick,
  } = ctx;

  const items = useMemo(() => {
    const seen = new Set();
    return clothingItems.filter(i => {
      if (!i || !i._id) return false;
      if (seen.has(i._id)) return false;
      seen.add(i._id);
      return true;
    });
  }, [clothingItems]);

  const temp = typeof weatherData?.temp === "number" ? Math.round(weatherData.temp) : null;
  const weatherKey = temp == null ? null : temp <= 40 ? "cold" : temp <= 65 ? "cool" : "warm";
  const itemsToShow = useMemo(() => {
    if (!weatherKey) return items;
    return items.filter(i => {
      const arr = Array.isArray(i.weather) ? i.weather : [i.weather];
      return arr.filter(Boolean).map(s => String(s).toLowerCase()).includes(weatherKey);
    });
  }, [items, weatherKey]);

  const handleImgError = (e) => { e.currentTarget.src = "/images/clothes/default.png"; };

  return (
    <main className="main">
      <section className="weather">
        {isLoadingWeather ? (
          <div className="weather__banner weather__banner--loading">Loading weather…</div>
        ) : (
          <div className="weather__banner">
            <div className="weather__temp">{temp !== null ? `${temp}°F` : "--"}</div>
            <div className="weather__art" aria-hidden="true"></div>
          </div>
        )}

        <div className="weather__lead">
          Today is {temp !== null ? `${temp}° F` : "--"} / You may want to wear:
        </div>
      </section>

      <section className="cards">
        {isLoadingItems ? (
          <div className="cards__loading">Loading items…</div>
        ) : (
          <ul className="cards__list" role="list">
            {itemsToShow.map((item) => (
              <li key={item._id} className="card" onClick={() => onCardClick && onCardClick(item)}>
                <div className="card__img-wrap">
                  <img className="card__img" src={item.imageUrl} alt={item.name} onError={handleImgError} />
                </div>
                <div className="card__name">{item.name}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
