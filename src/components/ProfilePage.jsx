import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';

export default function ProfilePage() {
  const {
    currentUser,
    clothingItems,
    onCardClick,
    onAddClick,
    onEditProfileClick,
    onLogoutClick,
  } = useOutletContext();

  const userId = currentUser?._id || currentUser?.id;

  const avatarSrc = currentUser?.avatar?.startsWith('http')
    ? currentUser.avatar
    : currentUser?.avatarUrl?.startsWith('http')
    ? currentUser.avatarUrl
    : 'http://localhost:3001/users/avatar.png';

  const ownItems = clothingItems.filter(item => {
    const ownerId =
      typeof item.owner === 'string'
        ? item.owner
        : item.owner?._id || item.owner?.id;
    return ownerId === userId;
  });

  return (
    <main className="content">
      <section className="profile">
        <aside className="profile__sidebar">
          <div className="profile__user">
            <img
              src={avatarSrc}
              alt={currentUser?.name || 'User avatar'}
              className="profile__avatar"
            />
            <p className="profile__name">{currentUser?.name}</p>
          </div>

          <button
            type="button"
            className="profile__edit"
            onClick={onEditProfileClick}
          >
            Change profile data
          </button>

          <button
            type="button"
            className="profile__logout"
            onClick={onLogoutClick}
          >
            Log out
          </button>
        </aside>

        <section className="profile__items">
          <div className="profile__items-header">
            <h2 className="profile__items-title">Your items</h2>

            <button type="button" className="profile__add" onClick={onAddClick}>
              + Add new
            </button>
          </div>

          <ClothesSection items={ownItems} onCardClick={onCardClick} />
        </section>
      </section>
    </main>
  );
}
