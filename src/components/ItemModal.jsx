import React, { useContext } from 'react';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';
import '../blocks/ItemModal.css';

function ItemModal({ item, onClose, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const canDelete =
    currentUser?._id && item?.owner && String(item.owner) === String(currentUser._id);

  if (!item) return null;

  return (
    <div className="item-modal" onClick={onClose}>
      <div className="item-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="item-modal__close" type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <img className="item-modal__image" src={item.imageUrl} alt={item.name} />

        <div className="item-modal__footer">
          <div className="item-modal__text-group">
            <p className="item-modal__caption">{item.name}</p>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>

          {canDelete && (
            <button
              type="button"
              className="item-modal__delete-button"
              onClick={onConfirmDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
