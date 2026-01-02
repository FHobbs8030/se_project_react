const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function check(res) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
}

export function updateProfile(data) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(check);
}
