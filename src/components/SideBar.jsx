import { useOutletContext } from 'react-router-dom';

export default function SideBar() {
  const { currentUser, onEditProfileClick, onLogoutClick } = useOutletContext();

  return (
    <aside className="profile__sidebar">
      <div className="profile__user">
        <img
          className="profile__avatar"
          src={currentUser?.avatar || '/images/Avatar.png'}
          alt={currentUser?.name || 'User avatar'}
        />
        <p className="profile__name">{currentUser?.name}</p>
      </div>

      <button
        type="button"
        className="profile__button"
        onClick={onEditProfileClick}
      >
        Change profile
      </button>

      <button type="button" className="profile__button" onClick={onLogoutClick}>
        Log out
      </button>
    </aside>
  );
}
