import { api } from "../utils/api.js";

export default function ClothingCard({
  item,
  currentUser,
  onCardClick,
  onCardUpdated,
  onCardRemoved,
}) {
  const isOwner = currentUser && item.owner === currentUser._id;
  const isLiked =
    currentUser &&
    Array.isArray(item.likes) &&
    item.likes.includes(currentUser._id);

  function handleLike() {
    api.toggleLike(item._id, isLiked).then((updated) => {
      onCardUpdated(updated);
    });
  }

  function handleDelete() {
    api.deleteItem(item._id).then(() => {
      onCardRemoved(item._id);
    });
  }

  return (
    <li className="card">
      <article className="card__inner">
        <header className="card__header">
          <h3 className="card__title">{item.name}</h3>
          {isOwner && (
            <button
              className="card__delete"
              aria-label="Delete"
              onClick={handleDelete}
            />
          )}
        </header>
        <button className="card__imageBtn" onClick={() => onCardClick(item)}>
          <img className="card__image" src={item.imageUrl} alt={item.name} />
        </button>
        <footer className="card__footer">
          <button
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            aria-label="Like"
            onClick={handleLike}
          />
        </footer>
      </article>
    </li>
  );
}
