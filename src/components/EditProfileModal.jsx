import { useContext, useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../blocks/EditProfileModal.css';

export default function EditProfileModal({
  isOpen,
  onClose,
  onUpdateUser,
  isSubmitting,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Save changes"
      isDisabled={isSubmitting}
    >
      <div className="edit-profile">
        <label className="edit-profile__label">
          Name *
          <input
            type="text"
            className="edit-profile__input"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label className="edit-profile__label">
          Avatar URL *
          <input
            type="url"
            className="edit-profile__input"
            placeholder="https://example.com/images/avatar.jpg"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
}
