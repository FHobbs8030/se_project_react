import { useEffect, useState, useContext } from 'react';
import { getClothingItems } from '../utils/clothingApi';
import { CurrentUserContext } from '../contextStore/CurrentUserContext';
import ClothesSection from './ClothesSection.jsx';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [myItems, setMyItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError('');
        const items = await getClothingItems();

        const mine = currentUser?._id
          ? items.filter((i) => {
              const ownerId =
                typeof i.owner === 'object' ? i.owner?._id : i.owner;
              return String(ownerId || '') === String(currentUser._id || '');
            })
          : [];

        if (!cancelled) setMyItems(mine);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load items.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentUser?._id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;

  return (
    <section>
      <h2>My Items</h2>
      <ClothesSection items={myItems} />
    </section>
  );
}
