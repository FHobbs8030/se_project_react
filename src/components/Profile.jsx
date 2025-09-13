import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClothesSection from './ClothesSection';
import '../blocks/Profile.css';

export default function Profile() {
  const outlet = useOutletContext?.() || {};
  const {
    clothingItems = [],
    currentUser = null,
    onCardClick,
    onDeleteClick,
    onAddClick,
  } = outlet;

  console.log('[Profile] outlet:', outlet);
  console.log('[Profile] clothingItems len:', clothingItems.length);
  console.log('[Profile] first item:', clothingItems[0]);

  const ownersDebug = clothingItems.map((i) => ({
    name: i?.name,
    ownerRaw: i?.owner,
    ownerId: typeof i?.owner === 'string' ? i?.owner : i?.owner?._id ?? i?.owner?.id ?? null,
  }));
  console.table(ownersDebug);

  const myId = currentUser?._id ?? currentUser?.id ?? null;
  console.log('[Profile] myId:', myId);

  const compare = clothingItems.map((i) => {
    const ownerId =
      typeof i?.owner === 'string' ? i?.owner : i?.owner?._id ?? i?.owner?.id ?? null;
    return {
      name: i?.name,
      ownerId,
      equalsMyId: ownerId && myId ? String(ownerId) === String(myId) : null,
    };
  });
  console.table(compare);

  console.table(clothingItems.map((i) => ({ name: i?.name, owner: i?.owner?._id ?? i?.owner })));

  const myItems = useMemo(() => {
    if (!Array.isArray(clothingItems)) return [];
    if (!myId) return clothingItems;
    return clothingItems.filter((it) => {
      const owner = it?.owner;
      const ownerId = typeof owner === 'string' ? owner : owner?._id ?? owner?.id ?? null;
      if (!ownerId) return true;
      return String(ownerId) === String(myId);
    });
  }, [clothingItems, myId]);

  console.log('[Profile] myItems length:', myItems.length, 'first:', myItems[0]);

  return (
    <section className="profile">
      <div className="profile__header">
        <h2 className="profile__title">Your items</h2>
        <button className="profile__add-btn" onClick={onAddClick}>+ Add Clothes</button>
      </div>

      <ClothesSection
        items={myItems}
        onCardClick={onCardClick}
        onDeleteClick={onDeleteClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}
