const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');

const request = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then(async (res) => {
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return Promise.reject(data || { message: 'Request failed' });
    }

    return data;
  });

export const getItems = () => request('/items');

export const createItem = (data) =>
  request('/items', {
    method: 'POST',
    body: data,
  });

export const deleteItem = (itemId) =>
  request(`/items/${itemId}`, { method: 'DELETE' });

export const addItemLike = (itemId) =>
  request(`/items/${itemId}/likes`, { method: 'PUT' });

export const removeItemLike = (itemId) =>
  request(`/items/${itemId}/likes`, { method: 'DELETE' });