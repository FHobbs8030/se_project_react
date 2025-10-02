import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext.jsx";

export default function ToggleSwitch() {
  const { unit, setUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={unit === "C"}
        onChange={(e) => setUnit(e.target.checked ? "C" : "F")}
        aria-label="Toggle temperature unit"
      />
      <span className="toggle__slider" />
    </label>
  );
}
