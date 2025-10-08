// src/components/ItemModal.jsx
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import "../blocks/ItemModal.css";

export default function ItemModal({ isOpen, onClose, card, onDelete }) {
  const { currentUser } = useOutletContext() || {};
  if (!isOpen || !card) return null;

  const ownerId = typeof card.owner === "object" ? card.owner?._id : card.owner;
  const canDelete = currentUser && ownerId === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__container modal__container_item"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose} />
        <img
          className="item-modal__image"
          src={card.imageUrl}
          alt={card.name}
          onError={(e) => { e.currentTarget.src = "/images/clothes/placeholder.png"; }}
        />
        <div className="item-modal__meta">
          <h3 className="item-modal__title">{card.name}</h3>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
        {canDelete && (
          <button
            type="button"
            className="item-modal__delete"
            onClick={() => onDelete(card)}
            aria-label={`Delete ${card.name}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    weather: PropTypes.oneOf(["hot", "warm", "cold"]),
    owner: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};
