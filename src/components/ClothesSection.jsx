import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../utils/api.js";

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function ClothesSection() {
  const { weatherData } = useOutletContext() || {};
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await api.getItems();
        const normalized = normalizeItems(raw);
        if (!cancelled) setItems(normalized);
      } catch (e) {
        if (!cancelled) setErr("Could not load clothes.");
        // Optional: console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p className="muted">Loading clothes…</p>;
  if (err) return <p className="muted">{err}</p>;

  // Simple recommended logic (adjust to your schema: i.weather / i.temperature / i.isCold etc.)
  const isCold = (weatherData?.type || "").toLowerCase().includes("cold");
  const recommended = items.filter((i) =>
    isCold ? i.weather === "cold" : i.weather === "warm"
  );

  return (
    <>
      <p className="muted">Recommended items</p>
      {recommended.length ? (
        <section className="cards">
          {recommended.map((i) => (
            <article key={i._id || i.id} className="card">
              <span className="card__name">{i.name}</span>
              <img src={i.imageUrl || i.image} alt={i.name} />
            </article>
          ))}
        </section>
      ) : (
        <p className="muted">No items to show.</p>
      )}

      <p className="muted" style={{ marginTop: 16 }}>All items</p>
      {items.length ? (
        <section className="cards">
          {items.map((i) => (
            <article key={i._id || i.id} className="card">
              <span className="card__name">{i.name}</span>
              <img src={i.imageUrl || i.image} alt={i.name} />
            </article>
          ))}
        </section>
      ) : (
        <p className="muted">No items in wardrobe yet.</p>
      )}
    </>
  );
}
