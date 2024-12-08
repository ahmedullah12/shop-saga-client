import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SSModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SSModal;
