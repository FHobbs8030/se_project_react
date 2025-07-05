import React, { useEffect } from 'react';
import '../blocks/ItemModal.css';

function ItemModal({ item, onClose, onConfirmDelete }) {
  const handleConfirmDelete = () => {
    onConfirmDelete();
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return (
    <div className="item-modal" onClick={onClose}>
      <div className="item-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="item-modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div className="item-modal__text-group">
            <p className="item-modal__caption">{item.name}</p>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>
          <button
            className="item-modal__delete-button"
            onClick={handleConfirmDelete}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;