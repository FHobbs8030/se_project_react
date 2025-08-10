const AUTH_URL = 'http://127.0.0.1:3001';

function check(res) {
  if (!res.ok) return res.json().then((d) => { throw new Error(d?.message || res.status); });
  return res.json();
}

export async function signIn(email, password) {
  const data = await fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(check);
  if (data?.token) localStorage.setItem('jwt', data.token);
  return data;
}
