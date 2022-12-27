import React from 'react';

interface SelectWithLabelProps {
  label: string;
  name: string;
  placeholder: string;
  onSelect: (selecteIndex: number) => void;
  optionsList: string[];
  disabled: boolean;
}

export default function SelectWithLabel({
  label,
  name,
  placeholder,
  onSelect,
  optionsList,
  disabled,
}: SelectWithLabelProps) {
  const localOptionsList = [`${placeholder}`, ...optionsList];

  const handleSelect = (e: React.SyntheticEvent) => {
    onSelect((e.target as HTMLSelectElement).selectedIndex);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        onChange={handleSelect}
        name={name}
        id={name}
        disabled={disabled}
      >
        {localOptionsList.map((option, index) => {
          return (
            <option
              key={index}
              value={index}
            >
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
