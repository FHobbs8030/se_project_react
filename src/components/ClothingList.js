import { useEffect, useState } from 'react';
import { getClothingItems, addClothingItem, deleteClothingItem } from '../utils/clothingApi';

const ClothingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getClothingItems()
      .then(setItems)
      .catch(err => console.error(err));
  }, []);

  const handleAdd = () => {
    const newItem = {
      name: 'Rain Coat',
      imageUrl: 'https://example.com/coat.png',
      weather: 'cold',
    };

    addClothingItem(newItem)
      .then(item => setItems([item, ...items]))
      .catch(err => console.error(err));
  };

  const handleDelete = (_id) => {
    deleteClothingItem(_id)
      .then(() => setItems(items.filter(i => i._id !== _id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Clothing Items</h2>
      <button onClick={handleAdd}>Add Rain Coat</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <img src={item.imageUrl} alt={item.name} width={100} />
            <p>{item.name} - {item.weather}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClothingList;


