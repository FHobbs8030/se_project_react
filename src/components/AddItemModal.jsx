import React, { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
      setFormErrors({});
      setIsFormValid(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    if (!weather) errors.weather = 'Weather type is required';
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [name, imageUrl, weather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({ name, imageUrl, weather });
    }
  };

  const handleChange = (e) => {
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
      <label className="modal__label">Name</label>
      <input
        type="text"
        className="modal__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className={formErrors.name ? 'modal__error' : 'modal__error_hidden'}>
        {formErrors.name}
      </span>

      <label className="modal__label">Image URL</label>
      <input
        type="text"
        className="modal__input"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <span className={formErrors.imageUrl ? 'modal__error' : 'modal__error_hidden'}>
        {formErrors.imageUrl}
      </span>

      <fieldset className="modal__fieldset">
        <legend className="modal__label">Select weather type</legend>
        <div className="modal__radio-group">
          {['hot', 'warm', 'cold'].map((type) => (
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
        <span className={formErrors.weather ? 'modal__error' : 'modal__error_hidden'}>
          {formErrors.weather}
        </span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
