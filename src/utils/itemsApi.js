const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ensureOk(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

export async function getItems() {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'GET',
    credentials: 'include',
  }).then(ensureOk);
  const body = await res.json().catch(() => null);
  const list = Array.isArray(body) ? body : body?.data ?? [];
  return Array.isArray(list) ? list : [];
}

export async function likeItem(id) {
  await fetch(`${API_BASE}/items/${id}/likes`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).then(ensureOk);
}

export async function unlikeItem(id) {
  await fetch(`${API_BASE}/items/${id}/likes`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).then(ensureOk);
}
