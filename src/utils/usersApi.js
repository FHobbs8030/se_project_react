const baseUrl = import.meta.env.VITE_API_BASE_URL;

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const updateProfile = ({ name, avatar }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};
