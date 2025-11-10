import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../blocks/Modal.css";

export default function ItemModal({ isOpen, item, onClose, onDelete, isOwner }) {
  console.log("ItemModal debug:", { isOwner, currentUser: item?.owner, itemOwner: item?.owner });
  const [posClass, setPosClass] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const name = item?.name || "";

  useEffect(() => {
    setPosClass(/sneaker|shoe|boot/i.test(name) ? " item-modal__image--raise" : "");
  }, [name]);

  if (!isOpen || !item) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose} />
        <div className="modal__card item-modal">
          <img
            className={`item-modal__image${posClass}`}
            src={item.imageUrl}
            alt={name}
          />
          <footer className="item-modal__footer">
            <div className="item-modal__meta">
              <div className="item-modal__name">{name}</div>
              {item.weather ? <div className="item-modal__weather">Weather: {item.weather}</div> : null}
            </div>
            {isOwner && (
              <button type="button" className="item-modal__delete" onClick={() => onDelete?.(item)}>
                Delete item
              </button>
            )}
          </footer>
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
