const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function jsonOrThrow(res) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  async getItems() {
    const res = await fetch(`${BASE_URL}/items`, { credentials: "include" });
    return jsonOrThrow(res);
  },
};
