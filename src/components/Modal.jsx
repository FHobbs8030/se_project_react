import { useEffect } from 'react';
import '../blocks/Modal.css';

export default function Modal({ isOpen, onClose, children }) {
  const handleOverlayClick = e => {
    if (e.target.classList.contains('modal')) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal" onMouseDown={handleOverlayClick}>
      <div className="modal__content" onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
