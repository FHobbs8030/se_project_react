import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection.jsx';
import { getClothingItems } from '../utils/clothingApi.js';
import '../blocks/Main.css';

export default function Main() {
  const ctx = useOutletContext() || {};
  const ctxItems = useMemo(
    () => (Array.isArray(ctx.clothingItems) ? ctx.clothingItems : []),
    [ctx.clothingItems]
  );
  const ctxCount = ctxItems.length;

  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (ctxCount > 0) {
        if (!cancelled) setLocalItems(ctxItems);
        return;
      }
      try {
        const items = await getClothingItems();
        if (!cancelled) setLocalItems(items);
      } catch {
        if (!cancelled) setLocalItems([]);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [ctxCount, ctxItems]);

  const items = ctxCount ? ctxItems : localItems;

  if (!items.length) return <p>No items yet.</p>;

  return (
    <section className="main">
      <ClothesSection
        title="Recommended items"
        clothingItems={items}
        onCardClick={ctx.onCardClick}
        onDeleteClick={ctx.onDeleteClick}
        onAddClick={ctx.onAddClick}
        currentUser={ctx.currentUser}
      />
    </section>
  );
}
