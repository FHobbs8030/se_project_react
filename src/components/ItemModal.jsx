import Modal from './Modal.jsx';
import '../blocks/ItemModal.css';

export default function ItemModal({ card, onClose, onDelete, canDelete }) {
  if (!card) return null;

  const handleDelete = () => {
    onDelete(card);
    onClose();
  };

  return (
    <Modal isOpen={!!card} onClose={onClose}>
      <button className="modal__close" onClick={onClose}>
        ×
      </button>

      <img src={card.imageUrl} alt={card.name} className="item-modal__image" />

      <div className="item-modal__footer">
        <div>
          <p className="item-modal__name">{card.name}</p>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>

        {canDelete && (
          <button className="item-modal__delete" onClick={handleDelete}>
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}
