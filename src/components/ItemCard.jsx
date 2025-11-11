export default function ItemCard({
  item,
  currentUser,
  onCardClick,
  onCardLike,
  likePending,
}) {
  const id = item._id || item.id;
  const me = currentUser?._id;
  const likedByMe = !!me && (item.likes || []).some(u => (u?._id ?? u) === me);

  return (
    <li className="card" onClick={() => onCardClick?.(item)}>
      <div className="card__meta">
        <div className="card__title">{item?.name || ''}</div>
        <button
          type="button"
          className={`card__like ${likedByMe ? 'is-liked' : ''}`}
          aria-pressed={likedByMe}
          aria-label={likedByMe ? 'Unlike' : 'Like'}
          disabled={likePending?.has(id)}
          onClick={e => {
            e.stopPropagation();
            onCardLike?.(id, likedByMe);
          }}
        />
      </div>
      {item?.imageUrl ? (
        <img src={item.imageUrl} alt={item?.name || ''} />
      ) : null}
    </li>
  );
}
