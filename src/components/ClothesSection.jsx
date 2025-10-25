import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "../blocks/Cards.css";
import "../blocks/ClothesSection.css";

export default function ClothesSection({
  clothingItems = [],
  onCardClick,
  isLoadingItems = false,
  weatherData = null,
}) {
  const [likedIds, setLikedIds] = useState(() => new Set());

  const tempF =
    weatherData && typeof weatherData.main?.temp === "number"
      ? Math.round(weatherData.main.temp)
      : null;

  const items = useMemo(() => {
    return Array.isArray(clothingItems) ? clothingItems : [];
  }, [clothingItems]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="clothes container">
      <header className="clothes__meta">
        {tempF !== null ? (
          <div className="clothes__summary">Today is {tempF} °F / You may want to wear:</div>
        ) : (
          <div className="clothes__summary">You may want to wear:</div>
        )}
      </header>

      {isLoadingItems ? (
        <div className="clothes__loading" aria-live="polite">Loading items…</div>
      ) : (
        <ul className="cards">
          {items.map((item) => {
            const id = item._id || item.id;
            const liked = likedIds.has(id);
            const name = item.name || "Item";
            const src = item.imageUrl || item.image;
            return (
              <li
                key={id}
                className="card"
                onClick={() => onCardClick && onCardClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onCardClick && onCardClick(item);
                }}
              >
                <div className="card__meta">
                  <div className="card__title">{name}</div>
                  <button
                    type="button"
                    className={`card__like ${liked ? "is-liked" : ""}`}
                    aria-pressed={liked}
                    aria-label={liked ? "Unlike" : "Like"}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(id);
                    }}
                  />
                </div>
                <img src={src} alt={name} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  onCardClick: PropTypes.func,
  isLoadingItems: PropTypes.bool,
  weatherData: PropTypes.any,
};
