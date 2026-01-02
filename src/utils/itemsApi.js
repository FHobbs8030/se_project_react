const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

function check(res) {
  if (!res.ok) {
    throw res;
  }
  return res.json();
}

export function getItems() {
  return fetch(`${BASE_URL}/items`, {
    credentials: 'include',
    cache: 'no-store',
  }).then(check);
}

export function createItem({ name, imageUrl, weather }) {
  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(check);
}

export function deleteItem(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(check);
}

export function likeItem(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'PUT',
    credentials: 'include',
  }).then(check);
}

export function unlikeItem(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(check);
}
