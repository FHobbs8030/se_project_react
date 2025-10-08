import { useContext, useMemo } from "react";
import "../blocks/ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const isC = currentTemperatureUnit === "C";

  const title = useMemo(
    () => (isC ? "Switch to °F" : "Switch to °C"),
    [isC]
  );

  function toggle() {
    setCurrentTemperatureUnit(isC ? "F" : "C");
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    if (e.key === "ArrowLeft") setCurrentTemperatureUnit("F");
    if (e.key === "ArrowRight") setCurrentTemperatureUnit("C");
  }

  return (
    <div className="toggle" aria-label="Temperature unit toggle">
      <button
        type="button"
        className={`toggle__track ${isC ? "toggle__track--c" : "toggle__track--f"}`}
        role="switch"
        aria-checked={isC}
        title={title}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}
