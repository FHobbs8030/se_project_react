import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { useMemo, useState } from "react";

export default function AddItemModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  const validUrl = (v) => {
    try { new URL(v); return true; } catch { return false; }
  };

  const disabled = useMemo(() => {
    const n = name.trim().length > 0;
    const u = imageUrl.trim().length > 0 && validUrl(imageUrl.trim());
    return !(n && u);
  }, [name, imageUrl]);

  const handle = (e) => {
    e.preventDefault();
    if (disabled) return;
    onSubmit({ name: name.trim(), imageUrl: imageUrl.trim(), weather });
    setName("");
    setImageUrl("");
    setWeather("hot");
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      onClose={onClose}
      onSubmit={handle}
      submitText="Add garment"
      submitDisabled={disabled}
    >
      <label className="modal__label">
        <span className="modal__label-text">Name</span>
        <input
          className="modal__input modal__input--underline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Image</span>
        <input
          className="modal__input modal__input--underline"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__radio">
          <input type="radio" name="weather" value="hot" checked={weather === "hot"} onChange={(e) => setWeather(e.target.value)} />
          <span>Hot</span>
        </label>
        <label className="modal__radio">
          <input type="radio" name="weather" value="warm" checked={weather === "warm"} onChange={(e) => setWeather(e.target.value)} />
          <span>Warm</span>
        </label>
        <label className="modal__radio">
          <input type="radio" name="weather" value="cold" checked={weather === "cold"} onChange={(e) => setWeather(e.target.value)} />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

AddItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
