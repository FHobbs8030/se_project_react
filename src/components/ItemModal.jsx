import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/ItemModal.css';

export default function ItemModal({ card, onClose, onDelete }) {
  if (!card) return null;

  return (
    <Modal isOpen={!!card} onClose={onClose}>
      <div className="item-modal">
        <button
          type="button"
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close"
        />

        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />

        <div className="item-modal__info">
          <div className="item-modal__header">
            <h2 className="item-modal__name">{card.name}</h2>

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

ItemModal.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
