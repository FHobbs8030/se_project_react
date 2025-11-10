import PropTypes from "prop-types";
import { likeItem, unlikeItem } from "../utils/itemsApi.js";

export default function ClothingCard({ item, onCardClick, onAfterToggle, currentUser }) {
  const id = item._id || item.id;
  const name = (item?.name || "").trim();
  const uid = currentUser?._id || currentUser?.id || null;
  const liked = Array.isArray(item.likes) && uid ? item.likes.some(l => String(l) === String(uid)) : false;

  async function toggleLike(e) {
    e.stopPropagation();
    const updated = liked ? await unlikeItem(id) : await likeItem(id);
    if (typeof onAfterToggle === "function") onAfterToggle(updated);
  }

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <button
        className={`card__like ${liked ? "is-liked" : ""}`}
        type="button"
        aria-pressed={liked ? "true" : "false"}
        onClick={toggleLike}
        title={liked ? "Unlike" : "Like"}
      >
        ♥
      </button>
      <span className="card__badge" aria-hidden="true">{name}</span>
      <img
        className={`card__image card__image--${name.toLowerCase().replace(/\s+/g, "-")}`}
        src={item.imageUrl}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/placeholder.svg";
        }}
      />
    </li>
  );
}

ClothingCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string,
    owner: PropTypes.any,
    likes: PropTypes.array
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAfterToggle: PropTypes.func,
  currentUser: PropTypes.object
};
