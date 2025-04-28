// src/components/RightSlider.tsx
import React, { ReactNode } from "react";

interface RightSliderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const RightSlider: React.FC<RightSliderProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 p-[16px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Header */}
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={onClose}>
            close
          </span>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-80px)] flex flex-col overflow-y-auto gap-[16px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default RightSlider;
