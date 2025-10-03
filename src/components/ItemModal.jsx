import { useContext } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { CurrentUserContext } from "../contextStore/CurrentUserContext.jsx";

export default function ItemModal({ item, isOpen, onClose, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!isOpen || !item) return null;

  const ownerId = item?.owner?._id || item?.owner || null;
  const canDelete = Boolean(currentUser?._id) && currentUser._id === ownerId;

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title={item?.name || "Item"}>
      <div className="item-modal__body">
        {item?.imageUrl && (
          <img
            className="item-modal__image"
            src={item.imageUrl}
            alt={item?.name || "Item"}
          />
        )}
        {item?.weather && (
          <div className="item-modal__meta">Weather: {item.weather}</div>
        )}
      </div>
      {canDelete ? (
        <button
          type="button"
          className="item-modal__delete"
          onClick={() => onConfirmDelete(item)}
        >
          Delete
        </button>
      ) : null}
    </ModalWithForm>
  );
}

ItemModal.propTypes = {
  item: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};
