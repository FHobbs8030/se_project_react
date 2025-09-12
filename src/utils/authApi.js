const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function getToken() {
  return localStorage.getItem('jwt') || null;
}
function setToken(token) {
  if (token) localStorage.setItem('jwt', token);
}
export function clearToken() {
  localStorage.removeItem('jwt');
}

async function parseError(res) {
  try {
    const data = await res.json();
    const msg = data?.message || data?.error || JSON.stringify(data);
    throw new Error(msg || `HTTP ${res.status}`);
  } catch {
    const txt = await res.text();
    throw new Error(txt || `HTTP ${res.status}`);
  }
}

export async function signIn({ email, password }) {
  const res = await fetch(`${API_BASE}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(email || '').trim(), password: String(password || '') }),
  });
  if (!res.ok) return parseError(res);
  const data = await res.json();
  if (data?.token) setToken(data.token);
  return data;
}

export async function signUp({ name, email, password, avatar }) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      password: String(password || ''),
      avatar,
    }),
  });
  if (!res.ok) return parseError(res);
  return res.json();
}

export async function getMe(token = getToken()) {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return parseError(res);
  return res.json();
}

export { getToken, setToken };
