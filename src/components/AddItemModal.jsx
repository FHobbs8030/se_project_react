import { useState } from 'react';
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

  if (!isOpen) return null;

  const isValid = name.trim() && imageUrl.trim() && weather;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    onAddItem({
      name,
      imageUrl,
      weather,
    });

    setName('');
    setImageUrl('');
    setWeather('');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="add-item__close" onClick={onClose}>
          ×
        </button>

        <h2 className="add-item__title">New garment</h2>

        <form className="add-item__form" onSubmit={handleSubmit}>
          <label className="add-item__label">
            Name
            <input
              className="add-item__input"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="add-item__label">
            Image
            <input
              className="add-item__input"
              placeholder="Image URL"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </label>

          <fieldset className="add-item__fieldset">
            <legend className="add-item__legend">
              Select the weather type:
            </legend>

            <label className="add-item__radio-row">
              <input
                type="radio"
                className="add-item__radio"
                checked={weather === 'hot'}
                onChange={() => setWeather('hot')}
              />
              <span className="add-item__radio-label">Hot</span>
            </label>

            <label className="add-item__radio-row">
              <input
                type="radio"
                className="add-item__radio"
                checked={weather === 'warm'}
                onChange={() => setWeather('warm')}
              />
              <span className="add-item__radio-label">Warm</span>
            </label>

            <label className="add-item__radio-row">
              <input
                type="radio"
                className="add-item__radio"
                checked={weather === 'cold'}
                onChange={() => setWeather('cold')}
              />
              <span className="add-item__radio-label">Cold</span>
            </label>
          </fieldset>

          <button
            type="submit"
            className="add-item__submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Add garment'}
          </button>
        </form>
      </div>
    </div>
  );
}
