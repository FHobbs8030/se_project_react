import "../blocks/ToggleSwitch.css";

export default function ToggleSwitch({ checked, onChange, labelLeft = "°F", labelRight = "°C" }) {
  return (
    <div className="toggle" role="group" aria-label="Temperature unit toggle">
      <span aria-hidden="true">{labelLeft}</span>
      <button
        type="button"
        className="toggle__thumb"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
      />
      <span aria-hidden="true">{labelRight}</span>
    </div>
  );
}
