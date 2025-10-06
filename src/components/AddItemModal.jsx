import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem && onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      onSubmit={handleSubmit}
      submitText="Add item"
    >
      <label className="modal__field">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="modal__field">
        Image URL
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label className="modal__field">
        Weather
        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </label>
    </ModalWithForm>
  );
}
