import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import ClothesSection from "./ClothesSection.jsx";
import "../blocks/ProfilePage.css";

export default function ProfilePage() {
  const ctx = useOutletContext?.() || {};
  const currentUser = ctx.currentUser ?? null;
  const isLoadingItems = !!ctx.isLoadingItems;
  const weatherData = ctx.weatherData ?? null;
  const onCardClick = ctx.onCardClick;
  const onAddClick = ctx.onAddClick || null;
  const onLogoutClick = ctx.onLogoutClick || null;
  const onEditProfileClick = ctx.onEditProfileClick || null;

  const myItems = useMemo(() => {
    const rawItems = ctx.clothingItems ?? [];
    const list = Array.isArray(rawItems) ? rawItems : [];
    if (!currentUser) return [];
    return list.filter((it) => {
      const ownerId = typeof it.owner === "object" ? it.owner?._id : it.owner;
      return String(ownerId) === String(currentUser._id);
    });
  }, [ctx.clothingItems, currentUser]);

  const title = "Your items";

  return (
    <main className="profile">
      <div className="profile__wrap">
        <aside className="profile__aside">
          <div className="profile__user">
            <img
              className="profile__avatar"
              src={
                currentUser?.avatar ||
                "/images/avatar.png"
              }
              alt={currentUser?.name || "User avatar"}
            />
            <div className="profile__name">{currentUser?.name || "Your Name"}</div>
          </div>

          <button
            type="button"
            className="profile__link"
            onClick={onEditProfileClick || (() => {})}
          >
            Change profile data
          </button>

          <button
            type="button"
            className="profile__link"
            onClick={onLogoutClick || (() => {})}
          >
            Log out
          </button>

          <div className="profile__footer">Developed by Name Surname</div>
        </aside>

        <section className="profile__main">
          <div className="profile__header">
            <h2 className="profile__title">{title}</h2>
            <button
              type="button"
              className="profile__add"
              onClick={onAddClick || (() => {})}
            >
              + Add new
            </button>
          </div>

          {isLoadingItems ? (
            <div className="profile__empty">Loading…</div>
          ) : myItems.length === 0 ? (
            <div className="profile__empty">
              You haven’t added any items yet. Use “+ Add clothes” in the header to add your first item.
            </div>
          ) : (
            <ClothesSection
              clothingItems={myItems}
              weatherData={weatherData}
              isLoadingItems={false}
              onCardClick={onCardClick}
            />
          )}
        </section>
      </div>
    </main>
  );
}
