import PropTypes from "prop-types";
import "../blocks/SideBar.css";

function SideBar({ currentUser, onEditProfileClick, onLogoutClick }) {
  const avatar =
    currentUser?.avatar || "/images/Avatar.png";
  const name =
    currentUser?.name || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img
          src={avatar}
          alt=""
          className="sidebar__avatar"
        />
        <span className="sidebar__username">{name}</span>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__btn sidebar__btn--edit"
          onClick={onEditProfileClick}
        >
          Change profile
        </button>

        <button
          type="button"
          className="sidebar__btn sidebar__btn--logout"
          onClick={onLogoutClick}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  currentUser: PropTypes.object,
  onEditProfileClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
};

export default SideBar;
