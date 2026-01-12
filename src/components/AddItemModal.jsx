import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
    }
  }, [isOpen]);

  const isValid =
    name.trim() !== '' &&
    imageUrl.trim() !== '' &&
    weather !== '' &&
    imageUrl.startsWith('http');

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
      title="New garment"
      submitText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isSubmitting}
    >
      <label className="add-item__label">
        Name
        <input
          className="add-item__input"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>

      <label className="add-item__label">
        Image
        <input
          type="url"
          className="add-item__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          required
        />
      </label>

      <fieldset className="add-item__fieldset">
        <legend className="add-item__legend">Select the weather type:</legend>

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
    </ModalWithForm>
  );
}
