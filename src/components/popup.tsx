import React, { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-6 relative shadow-lg ">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <span className="material-symbols-outlined cursor-pointer" onClick={onClose}>
            close
          </span>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
