import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
      setIsFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const isValid = name.trim() && imageUrl.trim() && weather;
    setIsFormValid(Boolean(isValid));
  }, [name, imageUrl, weather]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({ name, imageUrl, weather });
    }
  };

  const handleChange = e => {
    setWeather(e.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <input
        type="text"
        className="modal__input"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="text"
        className="modal__input"
        placeholder="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />

      <fieldset className="modal__fieldset">
        <legend className="modal__label">Select weather type</legend>
        <div className="modal__radio-group">
          {['hot', 'warm', 'cold'].map(type => (
            <label key={type} className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                value={type}
                checked={weather === type}
                onChange={handleChange}
              />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;


