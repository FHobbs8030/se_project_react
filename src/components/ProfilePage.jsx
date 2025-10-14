import { useOutletContext } from "react-router-dom";
import "../blocks/Profile.css";

export default function ProfilePage() {
  const {
    currentUser,
    clothingItems,
    onCardClick,
    onDeleteClick,
    isLoadingItems,
  } = useOutletContext() || {};

  const items = Array.isArray(clothingItems) ? clothingItems : [];

  return (
    <main className="profile">
      <section className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <div className="profile__user">
          <img
            className="profile__avatar"
            src={currentUser?.avatar || "/images/avatar-default.png"}
            alt={currentUser?.name || "User avatar"}
            width="56"
            height="56"
          />
          <div className="profile__info">
            <div className="profile__name">{currentUser?.name || "User"}</div>
            <div className="profile__email">{currentUser?.email || ""}</div>
          </div>
        </div>
      </section>

      <section className="profile__items">
        <h2 className="profile__subtitle">Your items</h2>

        {isLoadingItems ? (
          <div className="profile__loading">Loading…</div>
        ) : items.length === 0 ? (
          <div className="profile__empty">No items yet.</div>
        ) : (
          <ul className="profile__grid">
            {items.map((it) => (
              <li key={it._id} className="profile__card">
                <button
                  type="button"
                  className="profile__thumb"
                  onClick={() => onCardClick?.(it)}
                >
                  <img src={it.imageUrl} alt={it.name} className="profile__img" />
                </button>
                <div className="profile__cardRow">
                  <div className="profile__cardName">{it.name}</div>
                  <button
                    type="button"
                    className="profile__delete"
                    onClick={() => onDeleteClick?.(it)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
