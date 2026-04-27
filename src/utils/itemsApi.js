import { api } from './http.js';

export const getItems = () => {
  return api.get('/items');
};

export const createItem = data => {
  return api.post('/items', data);
};

export const deleteItem = itemId => {
  return api.del(`/items/${itemId}`);
};

export const addItemLike = itemId => {
  return api.put(`/items/${itemId}/likes`);
};

export const removeItemLike = itemId => {
  return api.del(`/items/${itemId}/likes`);
};
