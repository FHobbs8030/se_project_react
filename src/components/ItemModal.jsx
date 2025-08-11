import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';
import '../blocks/ItemModal.css';

function ItemModal({ item, onClose, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!item) return null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const userId = currentUser?._id || currentUser?.data?._id || currentUser?.id;
  const ownerId =
    typeof item?.owner === 'object'
      ? item?.owner?._id || item?.owner?.id
      : item?.owner;
  const canDelete = Boolean(userId && ownerId && String(ownerId) === String(userId));

  return (
    <div className="item-modal" onClick={onClose}>
      <div className="item-modal__container">
        <div
          className="item-modal__content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="item-modal__close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>

          <img className="item-modal__image" src={item.imageUrl} alt={item.name} />

          <div className="item-modal__footer">
            <div className="item-modal__text-group">
              <p className="item-modal__caption">{item.name}</p>
              <p className="item-modal__weather">Weather: {item.weather}</p>
            </div>

            <button
              type="button"
              className="item-modal__delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onConfirmDelete(item);
              }}
              data-can-delete={canDelete ? 'true' : 'false'}
              title={canDelete ? 'Delete this item' : 'You may not own this item'}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
