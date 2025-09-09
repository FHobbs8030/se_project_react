import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contextStore/CurrentTemperatureUnitContext";
import "../blocks/ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span className="slider">
        <span className={`unit unit--f ${currentTemperatureUnit === "F" ? "active" : ""}`}>F</span>
        <span className={`unit unit--c ${currentTemperatureUnit === "C" ? "active" : ""}`}>C</span>
        <span className="circle" />
      </span>
    </label>
  );
}

export default ToggleSwitch;


