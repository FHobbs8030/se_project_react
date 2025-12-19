import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/EditProfileModal.css';

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  isSubmitting,
}) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setAvatar('');
    }
  }, [isOpen]);

  const isValid = useMemo(
    () => name.trim().length > 0 && isValidUrl(avatar),
    [name, avatar]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ name, avatar });
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="edit-profile" onSubmit={handleSubmit}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />

        <h2 className="edit-profile__title">Change profile data</h2>

        <label className="edit-profile__label">
          Name *
          <input
            type="text"
            className="edit-profile__input"
            placeholder={currentUser?.name || 'Name'}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label className="edit-profile__label">
          Avatar *
          <input
            type="url"
            className="edit-profile__input"
            placeholder="Avatar URL"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="edit-profile__submit"
          disabled={!isValid || isSubmitting}
        >
          Save changes
        </button>
      </form>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  isSubmitting: PropTypes.bool,
};
