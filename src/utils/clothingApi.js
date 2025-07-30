const isLocal = window.location.hostname === 'localhost';

const BASE_URL = isLocal
  ? 'http://localhost:3001'
  : 'https://your-production-api.com';

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

function request(path, options) {
  return fetch(`${BASE_URL}${path}`, options).then(checkResponse);
}

// API methods
export const getClothingItems = () => {
  return request('/items');   // correct endpoint
};

export const addClothingItem = (item) => {
  return request('/items', {  // correct endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = (_id) => {
  return request(`/items/${_id}`, {  // correct endpoint
    method: 'DELETE',
  });
};
