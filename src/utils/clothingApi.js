const isLocal = window.location.hostname === 'localhost';
const BASE_URL = isLocal
  ? 'http://localhost:3001/items'
  : 'https://your-production-api.com/clothingItems';

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getClothingItems = () => {
  return request(BASE_URL);
};

export const addClothingItem = item => {
  const newId = crypto.randomUUID();
  const newItem = {
    ...item,
    _id: newId,
  };

  return request(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  });
};

export const deleteClothingItem = (_id) => {
  return request(`${BASE_URL}/${_id}`, {
    method: 'DELETE',
  });
};
