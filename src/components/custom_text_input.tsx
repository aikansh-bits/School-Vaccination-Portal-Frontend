// src/components/CustomTextInput.tsx
import React, { ChangeEvent, ReactNode } from "react";

interface CustomTextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  suffixIconOnClick?: () => void;
  fullWidth?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  label,
  type = "text",
  disabled = false,
  prefixIcon,
  suffixIcon,
  suffixIconOnClick,
  fullWidth = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-[300px]'}`}>
      {label && (
        <label className="text-black text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {prefixIcon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            ${prefixIcon ? 'pl-10' : 'pl-2'} 
            ${suffixIcon ? 'pr-10' : 'pr-2'}
            py-2
            rounded-lg
            border
            border-borderSubtleGray
            text-black
            text-sm
            placeholder:text-graySoft
            focus:outline-none
            focus:ring-1
            focus:ring-lightBlue
            focus:border-lightBlue
            w-full
            disabled:bg-graybackground
            disabled:cursor-not-allowed
          `}
        />

        {/* Suffix Icon */}
        {suffixIcon && (
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={suffixIconOnClick}
          >
            {suffixIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextInput;
