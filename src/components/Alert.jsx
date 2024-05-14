import React from "react";

const Alert = ({ message, type, onClose }) => {
  const getImage = () => {
    if (type === "success") {
      return (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      );
    } else if (type === "error") {
      return (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-60 text-center">
        <div className="flex justify-center mb-4">{getImage()}</div>
        <p className="text-gray-700 mb-4">{message}</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
