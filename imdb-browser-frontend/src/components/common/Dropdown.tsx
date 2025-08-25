import { type ChangeEvent, useState } from "react";

interface DropdownProps {
  title?: string;
  placeholder?: string;
  selected: string;
  setSelected: (value: string) => void;
  options: string[];
}

function Dropdown({
  title = "",
  placeholder = "",
  selected,
  setSelected,
  options,
}: DropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <label>
      {title ? <span className="text-base-lg mr-3">{title}</span> : <></>}
      <select
        className="text-base-lg px-3 py-2 bg-grey rounded cursor-pointer"
        value={selected}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Dropdown;
