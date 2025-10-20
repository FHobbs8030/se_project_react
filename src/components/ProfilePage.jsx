import PropTypes from "prop-types";

export default function ProfilePage({
  clothingItems = [],
  isLoadingItems = false,
  onCardClick,
  currentUser,
}) {
  const mine = Array.isArray(clothingItems)
    ? clothingItems.filter((it) => {
        const ownerId =
          typeof it.owner === "string"
            ? it.owner
            : it.owner && typeof it.owner === "object" && it.owner._id
            ? it.owner._id
            : it.ownerId || null;
        return currentUser?._id && ownerId === currentUser._id;
      })
    : [];

  const list = mine;

  return (
    <section className="profile">
      {isLoadingItems ? (
        <div className="profile__loading">Loading…</div>
      ) : !list.length ? (
        <div className="profile__empty">No items yet.</div>
      ) : (
        <ul className="cards">
          {list.map((item) => (
            <li key={item._id || item.id} className="cards__item">
              <button className="cards__button" onClick={() => onCardClick(item)}>
                <img
                  className="cards__image"
                  src={item.imageUrl || "/images/placeholder.png"}
                  alt={item.name || "Clothing item"}
                />
                <div className="cards__meta">
                  <span className="cards__name">{item.name}</span>
                  <span className="cards__tag">{item.weather}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

ProfilePage.propTypes = {
  clothingItems: PropTypes.array,
  isLoadingItems: PropTypes.bool,
  onCardClick: PropTypes.func,
  currentUser: PropTypes.object,
};
