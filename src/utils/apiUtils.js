const toJson = async (res) => {
  if (!res.ok) {
    let message;
    try {
      const data = await res.json();
      message = data && (data.message || data.error) ? (data.message || data.error) : `${res.status} ${res.statusText}`;
    } catch (e) {
      message = `${res.status} ${res.statusText}`;
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
};

const withAuth = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const buildUrl = (base, path = '', query = {}) => {
  const url = new URL(path, base);
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  });
  return url.toString();
};

export { toJson, withAuth, buildUrl };
