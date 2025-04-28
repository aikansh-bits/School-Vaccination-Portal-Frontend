import React from "react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  fullWidth = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-[300px]'}`}>
      {label && (
        <label className="text-black text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            appearance-none  /* Hide the native arrow */
            bg-white
            border border-borderSubtleGray
            text-black
            text-sm
            rounded-lg
            py-2 pl-2 pr-10 
            focus:outline-none
            focus:ring-1
            focus:ring-lightBlue
            focus:border-lightBlue
            placeholder-graySoft
            disabled:bg-graybackground
            disabled:cursor-not-allowed
            w-full
          `}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, idx) => (
            <option key={idx} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>

        {/* Custom Material Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <span className="material-symbols-outlined text-black text-[20px]">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
