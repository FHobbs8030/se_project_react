import { useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const { currentUser, clothingItems, isLoadingItems, onCardClick } = useOutletContext();

  const mine = Array.isArray(clothingItems)
    ? clothingItems.filter((it) => currentUser?._id && it.ownerId === currentUser._id)
    : [];

  const list = mine.length ? mine : (clothingItems || []);

  return (
    <section className="profile">
      <h1 className="profile__title">Profile</h1>
      <h2 className="profile__subtitle">Your items</h2>

      <div className="profile__hint" style={{ opacity: 0.6, fontSize: 12 }}>
        fetched: {Array.isArray(clothingItems) ? clothingItems.length : 0}
        {" · "}yours: {mine.length}
      </div>

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
                  alt={item.name || "Item"}
                  onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }}
                />
                <div className="cards__caption">{item.name || "Item"}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
