import PropTypes from "prop-types";
import "../blocks/Cards.css";
import "../blocks/ClothesSection.css";

export default function ClothesSection({
  clothingItems = [],
  onCardClick,
  onCardLike,
  isLoadingItems = false,
  weatherData = null,
  currentUser = null
}) {
  const tempF =
    weatherData && typeof weatherData.main?.temp === "number"
      ? Math.round(weatherData.main.temp)
      : null;

  return (
    <section className="clothes">
      <div className="container">
        <header className="clothes__meta">
          {tempF !== null ? (
            <div className="clothes__summary">
              Today is {tempF} °F / You may want to wear:
            </div>
          ) : (
            <div className="clothes__summary">You may want to wear:</div>
          )}
        </header>

        {isLoadingItems ? (
          <div className="clothes__loading" aria-live="polite">
            Loading items…
          </div>
        ) : (
          <ul className="cards">
            {Array.isArray(clothingItems) &&
              clothingItems.map((item) => {
                const id = item._id || item.id;
                const name = item.name || "Item";
                const src = item.imageUrl || item.image;
                const likes = Array.isArray(item.likes) ? item.likes : [];
                const isLiked = currentUser
                  ? likes.some((l) => l === currentUser._id)
                  : false;
                return (
                  <li
                    key={id}
                    className="card"
                    onClick={() => onCardClick && onCardClick(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        onCardClick && onCardClick(item);
                    }}
                  >
                    <div className="card__meta">
                      <div className="card__title">{name}</div>
                      <button
                        type="button"
                        className={`card__like ${isLiked ? "is-liked" : ""}`}
                        aria-pressed={isLiked}
                        aria-label={isLiked ? "Unlike" : "Like"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCardLike && onCardLike(item, isLiked);
                        }}
                      />
                    </div>
                    {src ? <img src={src} alt={name} /> : null}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  isLoadingItems: PropTypes.bool,
  weatherData: PropTypes.any,
  currentUser: PropTypes.any
};
