import '../blocks/EditProfileModal.css';

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  isSubmitting,
}) {
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    onSubmit({
      name: form.name.value,
      avatar: form.avatar.value,
    });
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={e => e.stopPropagation()}>
          <button type="button" className="modal__close" onClick={onClose} />
          <form className="edit-profile" onSubmit={handleSubmit}>
            <h2 className="edit-profile__title">Change profile data</h2>

            <label className="edit-profile__label">
              Name*
              <input
                className="edit-profile__input"
                name="name"
                defaultValue={currentUser?.name || ''}
                required
              />
            </label>

            <label className="edit-profile__label">
              Avatar*
              <input
                className="edit-profile__input"
                name="avatar"
                defaultValue={currentUser?.avatar || ''}
                required
              />
            </label>

            <button
              type="submit"
              className="edit-profile__submit"
              disabled={isSubmitting}
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
