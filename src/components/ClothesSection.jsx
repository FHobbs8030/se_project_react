import ItemCard from './ItemCard.jsx';
import '../blocks/ClothesSection.css';

function normalizeItem(i) {
  return {
    _id: i._id || i.id,
    name: i.name || i.title || 'Untitled',
    imageUrl: i.imageUrl || i.image || i.link || '',
    weather: i.weather ?? null,
    owner: i.owner,
  };
}

export default function ClothesSection({
  items,
  clothingItems,
  onCardClick,
  onDeleteClick,
  onDeleteItem,
  title = 'Recommended items',
  showMessage = true,
  showDelete = false,
}) {
  const data = Array.isArray(items)
    ? items
    : Array.isArray(clothingItems)
    ? clothingItems
    : [];

  const handleDelete = onDeleteClick || onDeleteItem;

  if (!data.length) return showMessage ? <p className="clothes-section__empty">No items to show.</p> : null;

  return (
    <section className="clothes-section">
      {title && <h2 className="clothes-section__title">{title}</h2>}
      <ul className="cards">
        {data.map((raw) => {
          const item = normalizeItem(raw);
          return (
            <ItemCard
              key={item._id || item.name}
              item={item}
              onSelect={onCardClick}
              onDeleteClick={handleDelete}
              showDelete={showDelete}
              needsScaling={false}
            />
          );
        })}
      </ul>
    </section>
  );
}
