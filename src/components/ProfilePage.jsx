import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';
import '../blocks/ProfilePage.css';

export default function ProfilePage() {
  const {
    currentUser,
    clothingItems,
    onCardClick,
    onCardLike,
    likePending,
    onLogoutClick,
    onEditProfileClick,
  } = useOutletContext();

  const avatarSrc =
    currentUser?.avatar && currentUser.avatar.trim() !== ''
      ? currentUser.avatar
      : '/images/Avatar.png';

  const myItems = clothingItems.filter(
    it => String(it.owner?._id || it.owner) === String(currentUser?._id)
  );

  return (
    <div className="profile">
      <aside className="profile__sidebar">
        <div className="profile__user-row">
          <img className="profile__avatar" src={avatarSrc} alt="avatar" />
          <h2 className="profile__name">{currentUser?.name}</h2>
        </div>

        <button
          type="button"
          className="profile__link"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>

        <button type="button" className="profile__link" onClick={onLogoutClick}>
          Log out
        </button>
      </aside>

      <section className="profile__main">
        <div className="profile__header-row">
          <h3 className="profile__items-title">Your items</h3>

          <button
            type="button"
            className="profile__add-btn"
            onClick={() => onCardClick(null)}
          >
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={myItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          likePending={likePending}
          currentUser={currentUser}
        />
      </section>
    </div>
  );
}
