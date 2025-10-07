export default function ItemCard({ item, onClick }) {
  return (
    <li className="cards__item">
      <button type="button" className="card" onClick={() => onClick(item)}>
        <img className="card__img" src={item.imageUrl} alt={item.name} />
        <span className="card__title">{item.name}</span>
      </button>
    </li>
  );
}

