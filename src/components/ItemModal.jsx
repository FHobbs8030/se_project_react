import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/ItemModal.css';

export default function ItemModal({ card, onClose, onRequestDelete }) {
  if (!card) return null;

  return (
    <Modal isOpen={!!card} onClose={onClose}>
      <div className="item-modal">
        <div className="item-modal__media">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="item-modal__image"
          />
        </div>

        <div className="item-modal__info">
          <div className="item-modal__top">
            <h2 className="item-modal__name">{card.name}</h2>

            <button
              type="button"
              className="item-modal__delete"
              onClick={() => onRequestDelete(card)}
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
  onRequestDelete: PropTypes.func.isRequired,
};
