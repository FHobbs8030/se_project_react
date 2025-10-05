export const checkResponse = async (res) => {
  if (res.ok) return res.json();
  let body = {};
  try { body = await res.json(); } catch {}
  const message = body?.message || res.statusText || `Request failed with status ${res.status}`;
  const err = new Error(message);
  err.status = res.status;
  err.body = body;
  throw err;
};
