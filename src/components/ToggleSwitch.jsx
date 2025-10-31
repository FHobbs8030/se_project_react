import { useEffect, useState } from "react";

export default function ToggleSwitch({ value, onChange }) {
  const [unit, setUnit] = useState(
    value || localStorage.getItem("wtwr_unit") || "F"
  );

  useEffect(() => {
    if (value === "F" || value === "C") setUnit(value);
  }, [value]);

  useEffect(() => {
    localStorage.setItem("wtwr_unit", unit);
    if (typeof onChange === "function") onChange(unit);
  }, [unit, onChange]);

  return (
    <div className="toggle">
      <button
        type="button"
        className={`toggle__option ${unit === "F" ? "is-active" : ""}`}
        onClick={() => setUnit("F")}
        aria-pressed={unit === "F"}
      >
        F
      </button>
      <button
        type="button"
        className={`toggle__option ${unit === "C" ? "is-active" : ""}`}
        onClick={() => setUnit("C")}
        aria-pressed={unit === "C"}
      >
        C
      </button>
      <span
        className={`toggle__thumb ${unit === "F" ? "at-f" : "at-c"}`}
        aria-hidden="true"
      />
    </div>
  );
}
