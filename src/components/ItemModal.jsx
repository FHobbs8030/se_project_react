import PropTypes from "prop-types";

export default function ItemModal({ isOpen, item, onClose, onDelete, isOwner }) {
  if (!isOpen || !item) return null;

  return (
    <div className="modal modal_opened" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose} />
        <img
          className="item-modal__image"
          src={item.imageUrl}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.svg";
          }}
        />
        <div className="item-modal__caption">
          <div className="item-modal__name">{item.name}</div>
          <div className="item-modal__weather">{item.weather}</div>
          {isOwner && typeof onDelete === "function" && (
            <button className="item-modal__delete" type="button" onClick={() => onDelete(item)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string,
    owner: PropTypes.any,
  }),
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool,
};
