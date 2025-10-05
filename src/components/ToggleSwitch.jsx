import { useId } from "react";
import "../blocks/ToggleSwitch.css";

export default function ToggleSwitch({ value, onChange, disabled = false }) {
  const id = useId();
  const isC = value === "C";
  const toggle = () => { if (!disabled) onChange(isC ? "F" : "C"); };
  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    if (e.key === "ArrowLeft") onChange("F");
    if (e.key === "ArrowRight") onChange("C");
  };
  return (
    <div className="temp-toggle">
      <button
        id={`temp-toggle-${id}`}
        className="temp-toggle__button"
        type="button"
        role="switch"
        aria-checked={isC}
        aria-label={value === "F" ? "Temperature in Fahrenheit" : "Temperature in Celsius"}
        data-state={isC ? "C" : "F"}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span className="temp-toggle__track" />
        <span className="temp-toggle__label temp-toggle__label--f">F</span>
        <span className="temp-toggle__label temp-toggle__label--c">C</span>
        <span className="temp-toggle__knob" />
      </button>
    </div>
  );
}
