// src/utils/itemsApi.js
const ITEMS_BASE =
  import.meta.env.VITE_ITEMS_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "";

const ITEMS_PATH = import.meta.env.VITE_ITEMS_PATH || "/items";

const tokenKey = "jwt";

const authHeaders = () => {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const isAbs = (url = "") => /^https?:\/\//i.test(url);
const toAbs = (url = "") => {
  if (!url) return "";
  if (isAbs(url)) return url;
  if (url.startsWith("/")) return `${ITEMS_BASE}${url}`;
  return `${ITEMS_BASE}/${url}`;
};

const findFirstArrayOfObjects = (input, maxDepth = 5) => {
  const seen = new Set();
  const dfs = (node, depth) => {
    if (node == null || depth > maxDepth) return null;
    if (Array.isArray(node)) {
      if (!node.length || typeof node[0] !== "object") return null;
      return node;
    }
    if (typeof node === "object") {
      if (seen.has(node)) return null;
      seen.add(node);
      for (const k of Object.keys(node)) {
        const r = dfs(node[k], depth + 1);
        if (r) return r;
      }
    }
    return null;
  };
  return dfs(input, 0) || [];
};

const normalizeItem = (raw = {}) => {
  const ownerObj = raw.owner ?? raw.user ?? null;
  const ownerId =
    (ownerObj && (ownerObj._id || ownerObj.id)) ||
    (typeof ownerObj === "string" ? ownerObj : null);

  const img =
    raw.imageUrl ??
    raw.image?.url ??
    raw.image ??
    raw.link ??
    "";

  const likes = Array.isArray(raw.likes)
    ? raw.likes.map((u) => (u && (u._id || u.id)) || u)
    : [];

  return {
    ...raw,
    _id: raw._id || raw.id || null,
    ownerId,
    name: raw.name || raw.title || "Item",
    imageUrl: toAbs(img),
    likes,
  };
};

const url = (suffix = "") => `${ITEMS_BASE}${ITEMS_PATH}${suffix}`;

export const getItems = async () => {
  const res = await fetch(url(), {
    headers: { ...authHeaders() },
    cache: "no-store",
  });
  if (!res.ok && res.status !== 304) throw new Error(await res.text());
  const payload = res.status === 304 ? [] : await res.json();
  const items = findFirstArrayOfObjects(payload).map(normalizeItem);
  if (import.meta.env.DEV) {
    console.log("[/items payload]", payload);
    console.log("[/items parsed]", items.length, items.slice(0, 3));
  }
  return items;
};

export const likeItem = async (id) => {
  const res = await fetch(url(`/${id}/likes`), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const unlikeItem = async (id) => {
  const res = await fetch(url(`/${id}/likes`), {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(url(`/${id}`), {
    method: "DELETE",
    headers: { ...authHeaders() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
};
