import { useMemo } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";
import ClothesSection from "../components/ClothesSection.jsx";
import "../pages/ProfilePage.css";

export default function ProfilePage({ onLogoutClick, onEditProfileClick }) {
  const {
    clothingItems = [],
    isLoadingItems = false,
    onCardClick,
    currentUser,
  } = useOutletContext();

  const userItems = useMemo(() => {
    const items = Array.isArray(clothingItems) ? clothingItems : [];
    return items.filter((it) => {
      const ownerId =
        typeof it.owner === "string"
          ? it.owner
          : it.owner && typeof it.owner === "object" && it.owner._id
          ? it.owner._id
          : it.ownerId || null;
      return currentUser?._id && ownerId === currentUser._id;
    });
  }, [clothingItems, currentUser]);

  return (
    <main className="profile">
      <SideBar
        currentUser={currentUser}
        onEditProfileClick={onEditProfileClick}
        onLogoutClick={onLogoutClick}
      />
      <section className="profile__content">
        <ClothesSection
          clothingItems={userItems}
          onCardClick={onCardClick}
          isLoadingItems={isLoadingItems}
          weatherData={null}
        />
      </section>
    </main>
  );
}

ProfilePage.propTypes = {
  onLogoutClick: PropTypes.func,
  onEditProfileClick: PropTypes.func,
};
