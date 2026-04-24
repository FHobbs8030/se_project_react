import { request } from './http.js';

export const getItems = () => {
  return request('/items');
};

export const createItem = data => {
  return request('/items', {
    method: 'POST',
    body: data,
  });
};

export const deleteItem = itemId => {
  return request(`/items/${itemId}`, {
    method: 'DELETE',
  });
};

export const addItemLike = itemId => {
  return request(`/items/${itemId}/likes`, {
    method: 'PUT',
  });
};

export const removeItemLike = itemId => {
  return request(`/items/${itemId}/likes`, {
    method: 'DELETE',
  });
};
