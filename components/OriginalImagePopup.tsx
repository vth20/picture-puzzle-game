import { TData } from '@/constants';
import React from 'react';

// OriginalImagePopup Component
const OriginalImagePopup: React.FC<{ imageUrl: TData; onClose: () => void }> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-800 p-4 rounded-lg shadow-2xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold z-10 transition-transform transform hover:scale-110"
          aria-label="Close original image view"
        >
          &times;
        </button>
        <div className="overflow-hidden rounded-md">
          <img
            src={imageUrl.original}
            alt="Original Revealed"
            className="w-full h-auto object-contain rounded-md"
            style={{ maxHeight: '85vh' }}
          />
        </div>
      </div>
    </div>
  );
};

export default OriginalImagePopup;