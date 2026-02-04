const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

const request = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then(res =>
    res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  );

export const getItems = () => request('/items');

export const createItem = data =>
  request('/items', {
    method: 'POST',
    body: data,
  });

export const deleteItem = itemId =>
  request(`/items/${itemId}`, { method: 'DELETE' });

export const addItemLike = itemId =>
  request(`/items/${itemId}/likes`, { method: 'PUT' });

export const removeItemLike = itemId =>
  request(`/items/${itemId}/likes`, { method: 'DELETE' });
