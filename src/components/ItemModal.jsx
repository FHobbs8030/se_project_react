import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';
import '../blocks/ItemModal.css';

function ItemModal({ item, onClose, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, item]);

  if (!item) return null;

  const userId =
    currentUser?.data?._id || currentUser?._id || currentUser?.id || null;

  const ownerId =
    (typeof item?.owner === 'object'
      ? item?.owner?._id || item?.owner?.id
      : item?.owner) || null;

  const canDelete = !!(userId && ownerId && String(ownerId) === String(userId));

  console.log('[ItemModal]', { userId, ownerId, canDelete, item });

  const imgSrc = item.imageUrl || item.link || item.image || '';
  const name = item.name || 'Clothing item';

  return (
    <div className="item-modal" onClick={onClose}>
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

        <img className="item-modal__image" src={imgSrc} alt={name} />

        <div className="item-modal__footer">
          <div className="item-modal__text-group">
            <p className="item-modal__caption">{name}</p>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>

          <button
            type="button"
            className="item-modal__delete-button"
            title={canDelete ? 'Delete this item' : 'Only the owner can delete this item'}
            onClick={(e) => {
              e.stopPropagation();
              if (!canDelete) {
                alert('Only the owner can delete this item.');
                return;
              }
              onConfirmDelete(item);
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
