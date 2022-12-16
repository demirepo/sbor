import React from "react";

export default function SelectWithLabel({
  label,
  name,
  placeholder,
  onSelect,
  optionsList,
  disabled,
}) {
  const localOptionsList = [`${placeholder}`, ...optionsList];

  const handleSelect = (e) => onSelect(e.target.selectedIndex) || null;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select onChange={handleSelect} name={name} id={name} disabled={disabled}>
        {localOptionsList.map((option, index) => {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        })}
      </select>

      <style jsx>{`
        select {
          --space: 0.3rem;
        }
      `}</style>
    </>
  );
}
