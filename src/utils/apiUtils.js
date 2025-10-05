export const checkResponse = async (res) => {
  // Success path
  if (res.ok) {
    // Some endpoints may return 204 No Content
    if (res.status === 204) return null;

    // Try to parse JSON; if it isn't JSON, fall back to text/null
    try {
      return await res.json();
    } catch (e) {
      /* response body is not JSON */
      try {
        const txt = await res.text();
        return txt || null;
      } catch (e2) {
        /* no body */
        return null;
      }
    }
  }

  // Error path: try to read JSON error body first
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* error body not JSON */
    try {
      const txt = await res.text();
      body = txt ? { message: txt } : null;
    } catch (e2) {
      /* no body */
      body = null;
    }
  }

  const message =
    (body && (body.message || body.error)) ||
    res.statusText ||
    "Request failed";

  const err = new Error(message);
  err.status = res.status;
  err.body = body;
  throw err;
};
