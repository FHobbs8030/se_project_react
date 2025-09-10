import { api } from './http';

export const getClothingItems = () =>
  api('/items');

export const addClothingItem = (data) =>
  api('/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteClothingItem = (id) =>
  api(`/items/${id}`, {
    method: 'DELETE',
  });

export default { getClothingItems, addClothingItem, deleteClothingItem };
