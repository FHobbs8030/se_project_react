import { useEffect } from "react";
import "../blocks/Modal.css";

export default function Modal({ isOpen, onClose, children, variant }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}>
        <div
          className={`modal__content ${
            variant ? `modal__content--${variant}` : ""
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
