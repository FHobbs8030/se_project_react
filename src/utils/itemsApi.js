const BASE_URL = 'http://localhost:3001';

function check(res) {
  if (res.ok) return res.json();
  throw new Error(`API error: ${res.status}`);
}

export function getItems() {
  return fetch(`${BASE_URL}/items`, {
    credentials: 'include',
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
