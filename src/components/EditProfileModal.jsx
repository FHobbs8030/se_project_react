import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ModalWithForm from './ModalWithForm';
import '../blocks/EditProfileModal.css';

export default function EditProfileModal({
  isOpen,
  onClose,
  onUpdateUser,
  isSubmitting,
}) {
  const outletContext = useOutletContext();
  const currentUser = outletContext?.currentUser ?? null;

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
    <ModalWithForm
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change profile data"
      submitText="Save Change"
      isSubmitting={isSubmitting}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
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
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
