import { useEffect, useState } from 'react';

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isSubmitting,
}) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('hot');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setImageUrl('');
      setWeather('hot');
    }
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!onAddItem) return;
    onAddItem({ name, imageUrl, weather });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose} />
        <h3 className="modal__title">New garment</h3>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <span className="modal__hint">
              You can use http(s):// – or a site path like
              /images/clothes/beanie.png
            </span>
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>
            <label className="modal__radio">
              <input
                type="radio"
                name="weather"
                value="hot"
                checked={weather === 'hot'}
                onChange={e => setWeather(e.target.value)}
                disabled={isSubmitting}
              />
              Hot
            </label>
            <label className="modal__radio">
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={weather === 'warm'}
                onChange={e => setWeather(e.target.value)}
                disabled={isSubmitting}
              />
              Warm
            </label>
            <label className="modal__radio">
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={weather === 'cold'}
                onChange={e => setWeather(e.target.value)}
                disabled={isSubmitting}
              />
              Cold
            </label>
          </fieldset>

          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Add garment'}
          </button>
        </form>
      </div>
    </div>
  );
}
