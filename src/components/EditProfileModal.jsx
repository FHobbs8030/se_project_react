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

  const normalizeAvatarUrl = url => {
    const trimmed = url.trim();

    if (/^https:\/\/(www\.)?imgur\.com\/[^/.]+$/.test(trimmed)) {
      const id = trimmed.split('/').pop();
      return `https://i.imgur.com/${id}.jpg`;
    }

    return trimmed;
  };

  const normalizedAvatar = normalizeAvatarUrl(avatar);

  const isValid =
    name.trim().length >= 2 &&
    /^https:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(normalizedAvatar) &&
    !/localhost/.test(normalizedAvatar);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    onUpdateUser({
      name: name.trim(),
      avatar: normalizedAvatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Save changes"
      isDisabled={!isValid || isSubmitting}
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
          Avatar *
          <input
            type="url"
            className="edit-profile__input"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
}
