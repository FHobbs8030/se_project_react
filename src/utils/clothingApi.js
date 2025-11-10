import { http } from "./http.js";

export function getClothingItems() {
  return http.get("/items");
}
export function addClothingItem({ name, weather, imageUrl }) {
  return http.post("/items", { name, weather, imageUrl });
}
export function deleteClothingItem(id) {
  return http.del(`/items/${id}`);
}
export function likeItem(id) {
  return http.put(`/items/${id}/likes`);
}
export function unlikeItem(id) {
  return http.del(`/items/${id}/likes`);
}
