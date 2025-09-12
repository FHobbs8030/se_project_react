import { useEffect, useState, useContext } from "react";
import { getClothingItems } from "../utils/clothingApi";
import { CurrentUserContext } from "../contextStore/CurrentUserContext";
import ItemCard from "./ItemCard";

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [myItems, setMyItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const items = await getClothingItems();
        const mine =
          Array.isArray(items) && currentUser?._id
            ? items.filter((i) => String(i.owner) === String(currentUser._id))
            : [];
        if (!ignore) setMyItems(mine);
      } catch {
        if (!ignore) setError("Failed to load items.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (currentUser?._id) load();
    return () => {
      ignore = true;
    };
  }, [currentUser?._id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!myItems.length) return <p>No items to show.</p>;

  return (
    <section className="profile-items">
      {myItems.map((item) => (
        <ItemCard key={item._id} item={item} variant="small" />
      ))}
    </section>
  );
}
