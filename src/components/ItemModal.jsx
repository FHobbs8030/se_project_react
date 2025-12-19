import Modal from './Modal.jsx';
import '../blocks/ItemModal.css';

export default function ItemModal({ card, onClose, onDelete }) {
  if (!card) return null;

  return (
    <Modal isOpen={!!card} onClose={onClose}>
      <div className="item-modal">
        <button type="button" className="item-modal__close" onClick={onClose}>
          ×
        </button>

        <div className="item-modal__media">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="item-modal__image"
          />
        </div>

        <div className="item-modal__info">
          <div className="item-modal__top">
            <p className="item-modal__name">{card.name}</p>

            <button
              type="button"
              className="item-modal__delete"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          </div>

          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </Modal>
  );
}
