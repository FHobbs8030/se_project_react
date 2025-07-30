// src/utils/clothingApi.js

const isLocal = window.location.hostname === 'localhost';

const BASE_URL = isLocal
  ? 'http://localhost:3001'
  : 'https://your-production-api.com';

// Utility to handle server response
function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

// Generic request wrapper
function request(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, options).then(checkResponse);
}

// API methods
export const getClothingItems = () => {
  return request('/items');
};

export const addClothingItem = (item) => {
  return request('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = (_id) => {
  return request(`/items/${_id}`, {
    method: 'DELETE',
  });
};
