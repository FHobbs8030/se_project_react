import { useEffect, useState } from 'react';
import Modal from './Modal';
import '../blocks/EditProfileModal.css';

export default function EditProfileModal({
  isOpen,
  onClose,
  onUpdateUser,
  isSubmitting,
  currentUser,
}) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [isOpen, currentUser]);

  const isValid =
    name.trim().length >= 2 && /^https?:\/\/.+/.test(avatar.trim());

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    onUpdateUser({
      name: name.trim(),
      avatar: avatar.trim(),
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="form">
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">Change profile data</h2>

        <label className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            minLength="2"
            required
          />
        </label>

        <label className="modal__label">
          Avatar
          <input
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className={`modal__submit ${
            !isValid || isSubmitting ? 'modal__submit--disabled' : ''
          }`}
          disabled={!isValid || isSubmitting}
        >
          Save Change
        </button>
      </form>
    </Modal>
  );
}
