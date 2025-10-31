import PropTypes from "prop-types";
import "../blocks/ToggleSwitch.css";

export default function ToggleSwitch({ value, onToggle }) {
  return (
    <div className="toggle">
      <button
        type="button"
        className={`toggle__option ${value === "F" ? "is-active" : ""}`}
        onClick={() => onToggle("F")}
        aria-pressed={value === "F"}
      >
        F
      </button>
      <button
        type="button"
        className={`toggle__option ${value === "C" ? "is-active" : ""}`}
        onClick={() => onToggle("C")}
        aria-pressed={value === "C"}
      >
        C
      </button>
      <span
        className={`toggle__thumb ${value === "F" ? "at-f" : "at-c"}`}
        aria-hidden="true"
      />
    </div>
  );
}

ToggleSwitch.propTypes = {
  value: PropTypes.oneOf(["F", "C"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};
