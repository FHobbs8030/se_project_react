const localHosts = ['localhost', '127.0.0.1', '::1'];
const isLocal = localHosts.includes(window.location.hostname);

const BASE_URL = isLocal
  ? 'http://127.0.0.1:3001'
  : 'https://<YOUR_REAL_BACKEND_DOMAIN>';

console.log('hostname:', window.location.hostname);
console.log('BASE_URL:', BASE_URL);

function checkResponse(res) {
  if (!res.ok) {
    return res.json().then((data) => {
      const message = data && data.message ? data.message : `Server error: ${res.status}`;
      throw new Error(message);
    });
  }
  return res.json();
}

function request(path, options = {}) {
  const token = localStorage.getItem('jwt');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  }).then(checkResponse);
}

export const getClothingItems = () => request('/items');

export const addClothingItem = (item) =>
  request('/items', {
    method: 'POST',
    body: JSON.stringify(item),
  });

export const deleteClothingItem = (_id) =>
  request(`/items/${_id}`, {
    method: 'DELETE',
  });
