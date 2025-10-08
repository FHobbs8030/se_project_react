// src/components/Main.jsx
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import WeatherCard from "./WeatherCard.jsx";
import "../blocks/Cards.css";

export default function Main({
  clothingItems: clothingFromProps = [],
  onCardClick: onCardClickFromProps = () => {},
}) {
  const outlet = useOutletContext() || {};

  const clothingItems = outlet.clothingItems ?? clothingFromProps ?? [];
  const onCardClick = outlet.onCardClick ?? onCardClickFromProps ?? (() => {});

  return (
    <main className="content">
      <WeatherCard />
      <section className="cards-wrap">
        <ul className="cards">
          {clothingItems.map((item) => (
            <li
              className="card"
              key={item._id || item.id || item.name}
              onClick={() => onCardClick(item)}
            >
              <div className="card__imgbox">
                <img className="card__img" src={item.imageUrl} alt={item.name} />
              </div>
              <div className="card__title">{item.name}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  clothingItems: PropTypes.array,
  onCardClick: PropTypes.func,
};
