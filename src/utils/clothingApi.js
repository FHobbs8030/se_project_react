import { api } from "./http";

export const getClothingItems = () => api("/items");

export const addClothingItem = ({ name, weather, imageFile }) => {
  const fd = new FormData();
  if (name != null) fd.append("name", name);
  if (weather != null) fd.append("weather", weather);
  if (imageFile) fd.append("image", imageFile);
  return api("/items", { method: "POST", body: fd });
};

export const deleteClothingItem = (id) => api(`/items/${id}`, { method: "DELETE" });
