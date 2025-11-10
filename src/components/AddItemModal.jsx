import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../blocks/AddItemModal.css';

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isSubmitting = false,
}) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    imageUrl: false,
    weather: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
      setTouched({ name: false, imageUrl: false, weather: false });
    }
  }, [isOpen]);

  const nameError = useMemo(() => {
    const v = name.trim();
    if (v.length === 0) return 'Required';
    if (v.length < 2) return 'Must be at least 2 characters';
    if (v.length > 30) return 'Must be at most 30 characters';
    return '';
  }, [name]);

  const urlError = useMemo(() => {
    const v = imageUrl.trim();
    if (v.length === 0) return 'Required';
    try {
      const u = new URL(v);
      if (!/^https?:$/i.test(u.protocol))
        return 'Must start with http:// or https://';
    } catch {
      return 'Invalid URL';
    }
    return '';
  }, [imageUrl]);

  const weatherError = useMemo(() => {
    if (!weather) return 'Select a weather type';
    return '';
  }, [weather]);

  const isValid = nameError === '' && urlError === '' && weatherError === '';

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    onAddItem({
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      weather,
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="additem-overlay"
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="additem-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="additem-title"
      >
        <div className="additem-header">
          <h2 id="additem-title" className="additem-title">
            New garment
          </h2>
          <button
            className="additem-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="additem-form" onSubmit={handleSubmit} noValidate>
          <label className="additem-label">
            <span className="additem-fieldname">Name</span>
            <input
              className={`additem-input ${
                touched.name && nameError ? 'additem-input--invalid' : ''
              }`}
              type="text"
              name="name"
              minLength={2}
              maxLength={30}
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              placeholder="Name"
              required
            />
            {touched.name && nameError && (
              <span className="additem-error">{nameError}</span>
            )}
          </label>

          <label className="additem-label">
            <span className="additem-fieldname">Image</span>
            <input
              className={`additem-input ${
                touched.imageUrl && urlError ? 'additem-input--invalid' : ''
              }`}
              type="url"
              name="imageUrl"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, imageUrl: true }))}
              placeholder="Image URL"
              inputMode="url"
              required
            />
            <div className="additem-hint">
              You can use http(s):// — or a site path like
              /images/clothes/beanie.png
            </div>
            {touched.imageUrl && urlError && (
              <span className="additem-error">{urlError}</span>
            )}
          </label>

          <fieldset
            className="additem-fieldset"
            onBlur={() => setTouched(t => ({ ...t, weather: true }))}
          >
            <legend className="additem-legend">Select the weather type:</legend>
            <label className="additem-radio">
              <input
                type="radio"
                name="weather"
                value="hot"
                checked={weather === 'hot'}
                onChange={e => setWeather(e.target.value)}
                required
              />
              <span>Hot</span>
            </label>
            <label className="additem-radio">
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={weather === 'warm'}
                onChange={e => setWeather(e.target.value)}
                required
              />
              <span>Warm</span>
            </label>
            <label className="additem-radio">
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={weather === 'cold'}
                onChange={e => setWeather(e.target.value)}
                required
              />
              <span>Cold</span>
            </label>
            {touched.weather && weatherError && (
              <span className="additem-error">{weatherError}</span>
            )}
          </fieldset>

          <button
            className="additem-submit"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Adding…' : 'Add garment'}
          </button>
        </form>
      </div>
    </div>
  );
}

AddItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};
