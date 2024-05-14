import React from "react";

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-60">
        <p className="text-center mb-4">{message}</p>
        <div className="flex justify-center">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mr-2" onClick={onConfirm}>
            Confirmer
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
