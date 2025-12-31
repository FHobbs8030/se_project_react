import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/EditProfileModal.css';

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
    if (!isOpen) {
      setName('');
      setAvatar('');
    }
  }, [isOpen]);

  const isValid =
    name.trim().length > 0 &&
    /^https?:\/\/.+/i.test(avatar.trim());

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    onSubmit({ name: name.trim(), avatar: avatar.trim() });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change profile data">
      <form className="edit-profile" onSubmit={handleSubmit} noValidate>
        <label className="edit-profile__label">
          Name*
          <input
            type="text"
            className="edit-profile__input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={currentUser?.name || 'Enter your name'}
            required
          />
        </label>

        <label className="edit-profile__label">
          Avatar*
          <input
            type="url"
            className="edit-profile__input"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            placeholder={
              currentUser?.avatar ||
              'https://example.com/avatar.png'
            }
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
