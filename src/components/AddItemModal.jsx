import { useState } from 'react';
import ModalWithForm from './ModalWithForm';
import '../blocks/AddItemModal.css';

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isSubmitting,
}) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  const isValid =
    name.trim().length >= 2 &&
    /^\/images\/.+\.(png|jpg|jpeg|webp|svg)$/.test(imageUrl.trim()) &&
    weather;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    onAddItem({
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      weather,
    });
  }

  return (
    <ModalWithForm
      name="add-item"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="New garment"
      submitText="Add garment"
      isDisabled={!isValid || isSubmitting}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          minLength="2"
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="/images/clothes/puffy_jacket.png"
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Weather</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={weather === 'hot'}
            onChange={e => setWeather(e.target.value)}
            required
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={weather === 'warm'}
            onChange={e => setWeather(e.target.value)}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={weather === 'cold'}
            onChange={e => setWeather(e.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
