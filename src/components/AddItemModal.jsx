import { useState } from 'react';
import Modal from './Modal.jsx';
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

  const isValid = name.trim() && imageUrl.trim() && weather.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;

    onAddItem({ name, imageUrl, weather });

    setName('');
    setImageUrl('');
    setWeather('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-item__container">
        <div className="add-item__header">
          <h2 className="add-item__title">New garment</h2>
          <button className="add-item__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="add-item__form" onSubmit={handleSubmit}>
          <label className="add-item__label">
            Name
            <input
              type="text"
              className="add-item__input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="add-item__label">
            Image
            <input
              type="text"
              className="add-item__input"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </label>

          <fieldset className="add-item__fieldset">
            <legend className="add-item__legend">
              Select the weather type:
            </legend>

            <div className="add-item__radio-row add-item__radio-row--1">
              <input
                type="radio"
                id="weather-hot"
                className="add-item__radio"
                name="weather"
                value="hot"
                checked={weather === 'hot'}
                onChange={e => setWeather(e.target.value)}
              />
              <label htmlFor="weather-hot" className="add-item__radio-label">
                Hot
              </label>
            </div>

            <div className="add-item__radio-row add-item__radio-row--2">
              <input
                type="radio"
                id="weather-warm"
                className="add-item__radio"
                name="weather"
                value="warm"
                checked={weather === 'warm'}
                onChange={e => setWeather(e.target.value)}
              />
              <label htmlFor="weather-warm" className="add-item__radio-label">
                Warm
              </label>
            </div>

            <div className="add-item__radio-row add-item__radio-row--3">
              <input
                type="radio"
                id="weather-cold"
                className="add-item__radio"
                name="weather"
                value="cold"
                checked={weather === 'cold'}
                onChange={e => setWeather(e.target.value)}
              />
              <label htmlFor="weather-cold" className="add-item__radio-label">
                Cold
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="add-item__submit"
            disabled={!isValid || isSubmitting}
          >
            Add garment
          </button>
        </form>
      </div>
    </Modal>
  );
}
