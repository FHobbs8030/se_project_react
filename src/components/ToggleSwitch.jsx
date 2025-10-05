import { useEffect, useState } from "react";
import "../blocks/ToggleSwitch.css";

export default function ToggleSwitch({ value, onChange }) {
  const [unit, setUnit] = useState(
    value || localStorage.getItem("tempUnit") || "F"
  );

  useEffect(() => {
    localStorage.setItem("tempUnit", unit);
    if (onChange) onChange(unit);
  }, [unit, onChange]);

  const handleToggle = () => setUnit((u) => (u === "F" ? "C" : "F"));

  return (
    <div className="temp-toggle">
      <button
        type="button"
        className="temp-toggle__button"
        data-state={unit}
        aria-pressed={unit === "C"}
        aria-label={`Switch to ${unit === "F" ? "Celsius" : "Fahrenheit"}`}
        onClick={handleToggle}
      >
        <span className="temp-toggle__track" />
        <span className="temp-toggle__label temp-toggle__label--f">F</span>
        <span className="temp-toggle__label temp-toggle__label--c">C</span>
        <span className="temp-toggle__knob" />
      </button>
    </div>
  );
}
