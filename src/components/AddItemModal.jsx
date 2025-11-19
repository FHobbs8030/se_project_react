import Modal from './Modal.jsx';
import '../blocks/AddItemModal.css';

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isSubmitting,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const imageUrl = e.target.imageUrl.value;
    const weather = e.target.weather.value;
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-item__header">
        <h2 className="add-item__title">New garment</h2>
        <button className="add-item__close" onClick={onClose}>
          ×
        </button>
      </div>

      <form className="add-item__form" onSubmit={handleSubmit}>
        <label className="add-item__label">
          Name
          <input name="name" className="add-item__input" required />
        </label>

        <label className="add-item__label">
          Image
          <input
            name="imageUrl"
            type="url"
            className="add-item__input"
            required
          />
        </label>

        <fieldset className="add-item__fieldset">
          <legend className="add-item__legend">Select the weather type:</legend>

          <label className="add-item__radio-label">
            <input
              type="radio"
              name="weather"
              value="hot"
              defaultChecked
              className="add-item__radio"
            />
            Hot
          </label>

          <label className="add-item__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              className="add-item__radio"
            />
            Warm
          </label>

          <label className="add-item__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              className="add-item__radio"
            />
            Cold
          </label>
        </fieldset>

        <div className="add-item__actions">
          <button className="add-item__submit" disabled={isSubmitting}>
            Add garment
          </button>
        </div>
      </form>
    </Modal>
  );
}
