import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImage("");
      setSubmitting(false);
    }
  }, [isOpen]);

const isValid = useMemo(() => {
  const hasName = name.trim().length >= 2;
  const val = image.trim();
  const looksHttp = /^https?:\/\/.+/i.test(val);
  const looksRelative = /^\/[A-Za-z0-9/_\-.]+$/.test(val);
  return hasName && (looksHttp || looksRelative);
}, [name, image]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      const val = image.trim();
      const finalUrl = val.startsWith("/")
        ? `${window.location.origin}${val}`
        : val;

      await onAddItem({ name: name.trim(), imageUrl: finalUrl });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Add garment"
      submitDisabled={!isValid || submitting}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <div className="modal__hint">
          You can use <code>http(s)://…</code> or a site path like <code>/images/clothes/beanie.png</code>
        </div>
      </label>
    </ModalWithForm>
  );
}

AddItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
};
