import React from 'react';

const Chip = ({ label, onClose }) => {
  return (
    <div className="flex items-center bg-gray-200 text-gray-700 rounded-md px-3 py-1 mr-2 mb-2">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        className="ml-2 focus:outline-none"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500 hover:text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Chip;
