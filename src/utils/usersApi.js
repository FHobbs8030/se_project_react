const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function updateUser(data) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(res => (res.ok ? res.json() : Promise.reject(res)));
}
