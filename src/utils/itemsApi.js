const BASE_URL = 'http://localhost:3001';

const request = (url, options = {}) =>
  fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }).then(res =>
    res.ok ? res.json() : Promise.reject(res.status)
  );

export const getItems = () => request('/items');

export const createItem = data =>
  request('/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteItem = itemId =>
  request(`/items/${itemId}`, {
    method: 'DELETE',
  });

export const addItemLike = itemId =>
  request(`/items/${itemId}/likes`, {
    method: 'PUT',
  });

export const removeItemLike = itemId =>
  request(`/items/${itemId}/likes`, {
    method: 'DELETE',
  });
