import { useOutletContext } from 'react-router-dom';
import '../blocks/ProfilePage.css';

export default function ProfilePage() {
  const ctx = useOutletContext() || {};
  const currentUser = ctx.currentUser || null;
  const onEditProfile = ctx.onEditProfileClick;
  const onLogout = ctx.onLogoutClick;

  const avatar =
    currentUser?.avatar || currentUser?.avatarUrl || '/images/Avatar.png';

  return (
    <section className="profile-page">
      <header className="profile-page__header"></header>
      <div className="profile-page__user">
        <div className="profile-page__avatar-wrap">
          <img
            src={avatar}
            alt="User avatar"
            className="profile-page__avatar"
          />
        </div>
        <div className="profile-page__info">
          <h1 className="profile-page__name">
            {currentUser?.name || 'New User'}
          </h1>
          <p className="profile-page__city">
            {currentUser?.city || 'City not set'}
          </p>
        </div>
      </div>
      <div className="profile-page__actions">
        <h2 className="profile-page__section-title">Profile</h2>
      </div>
      <button
        type="button"
        className="profile-page__action"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button type="button" className="profile-page__action" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
}
