import React from "react";

export default function DynamicList({
  label,
  items,
  placeholder = "",
  onChangeItem,
  onAddAfter,
  onRemoveAt,
  inputType = "text",
}) {
  return (
    <div className="fieldBlock">
      <div className="fieldLabel">{label}</div>
      {items.map((value, idx) => (
        <div className="lineRow" key={idx}>
          <input
            className="textInput"
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChangeItem(idx, e.target.value)}
          />
          <button className="miniBtn" type="button" onClick={() => onAddAfter(idx)} aria-label="Add">
            +
          </button>
          <button
            className="miniBtn"
            type="button"
            onClick={() => onRemoveAt(idx)}
            aria-label="Remove"
            disabled={items.length === 1 && value === ""}
          >
            −
          </button>
        </div>
      ))}
    </div>
  );
}
