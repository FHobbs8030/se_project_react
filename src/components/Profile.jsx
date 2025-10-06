import PropTypes from "prop-types";

export default function Profile({
  currentUser,
  clothingItems,
  onCardClick,
  onDeleteClick,
  isLoadingItems,
}) {
  const myId = currentUser?._id;
  const myItems = clothingItems.filter((i) => i?.owner?._id === myId);

  return (
    <main className="content profile">
      <section className="profile__header">
        <h1 className="profile__title">My items</h1>
      </section>

      {isLoadingItems ? (
        <div className="loading">Loading items…</div>
      ) : (
        <ul className="cards">
          {myItems.map((card) => (
            <li key={card._id} className="card" onClick={() => onCardClick(card)}>
              <img className="card__image" src={card.imageUrl} alt={card.name} />
              <div className="card__footer">
                <h3 className="card__title">{card.name}</h3>
                <button className="button button_danger" onClick={(e) => { e.stopPropagation(); onDeleteClick(card._id); }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  clothingItems: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isLoadingItems: PropTypes.bool,
};
