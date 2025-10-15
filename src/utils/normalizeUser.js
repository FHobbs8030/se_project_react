export function normalizeUser(raw) {
  const src = raw?.data || raw?.user || raw || {};
  const _id = src._id || src.id || null;
  const name = src.name || src.username || src.fullName || "";
  const avatar =
    src.avatar?.url ||
    src.avatarUrl ||
    src.avatar ||
    src.profileImage ||
    "";
  return { _id, name, avatar };
}
