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
      <img src={card.imageUrl} alt={card.name} className="item-modal__image" />
      <p className="item-modal__name">{card.name}</p>

      {canDelete && (
        <button className="item-modal__delete" onClick={handleDelete}>
          Delete item
        </button>
      )}
    </Modal>
  );
}
