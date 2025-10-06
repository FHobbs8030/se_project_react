import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { useState } from "react";

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("warm");

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("warm");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add garment"
      submitText="Add"
      onSubmit={onSubmit}
    >
      <label className="form__label">
        Name
        <input className="form__input" type="text" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={30} />
      </label>
      <label className="form__label">
        Image URL
        <input className="form__input" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </label>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Weather</legend>
        <label className="form__radio">
          <input type="radio" name="weather" value="hot" checked={weather === "hot"} onChange={(e) => setWeather(e.target.value)} />
          <span>Hot</span>
        </label>
        <label className="form__radio">
          <input type="radio" name="weather" value="warm" checked={weather === "warm"} onChange={(e) => setWeather(e.target.value)} />
          <span>Warm</span>
        </label>
        <label className="form__radio">
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
  onAddItem: PropTypes.func.isRequired,
};
