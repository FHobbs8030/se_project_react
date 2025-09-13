import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import WeatherCard from './WeatherCard.jsx';
import ClothesSection from './ClothesSection.jsx';
import { getClothingItems } from '../utils/clothingApi.js';
import '../blocks/Main.css';

function kToF(k){ return Math.round((k - 273.15) * 9/5 + 32); }
function kToC(k){ return Math.round(k - 273.15); }

export default function Main() {
  const ctx = useOutletContext() || {};
  const unit = ctx.currentTemperatureUnit || 'F';
  const wx = ctx.weather;

  const temp = useMemo(() => {
    const k = wx?.main?.temp;
    if (typeof k !== 'number') return null;
    return unit === 'C' ? kToC(k) : kToF(k);
  }, [wx, unit]);

  const isDay = useMemo(() => {
    const ts = wx?.dt ? wx.dt * 1000 : Date.now();
    const sr = wx?.sys?.sunrise ? wx.sys.sunrise * 1000 : undefined;
    const ss = wx?.sys?.sunset ? wx.sys.sunset * 1000 : undefined;
    if (!sr || !ss) return true;
    return ts > sr && ts < ss;
  }, [wx]);

  const iconUrl = useMemo(() => {
    const code = wx?.weather?.[0]?.icon;
    return code ? `https://openweathermap.org/img/wn/${code}@2x.png` : null;
  }, [wx]);

  // 🔧 Make ctxItems reference-stable
  const ctxItems = useMemo(
    () => (Array.isArray(ctx.clothingItems) ? ctx.clothingItems : []),
    [ctx.clothingItems]
  );

  const [localItems, setLocalItems] = useState([]);

  // Mirror context items when provided
  useEffect(() => {
    if (ctxItems.length > 0) setLocalItems(ctxItems);
  }, [ctxItems]);

  // Fetch only if context is empty
  useEffect(() => {
    if (ctxItems.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        const items = await getClothingItems();
        if (!cancelled) setLocalItems(items);
      } catch {
        if (!cancelled) setLocalItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, [ctxItems]);

  const items = ctxItems.length ? ctxItems : localItems;

  return (
    <section className="main">
      <WeatherCard
        temperature={temp}
        unit={unit}
        isDay={isDay}
        icon={iconUrl}
        timestamp={wx?.dt ? wx.dt * 1000 : undefined}
        sunrise={wx?.sys?.sunrise ? wx.sys.sunrise * 1000 : undefined}
        sunset={wx?.sys?.sunset ? wx.sys.sunset * 1000 : undefined}
      />
      {items.length ? (
        <ClothesSection
          title="Recommended items"
          clothingItems={items}
          onCardClick={ctx.onCardClick}
          onDeleteClick={ctx.onDeleteClick}
          onAddClick={ctx.onAddClick}
          currentUser={ctx.currentUser}
        />
      ) : (
        <p>No items yet.</p>
      )}
    </section>
  );
}
