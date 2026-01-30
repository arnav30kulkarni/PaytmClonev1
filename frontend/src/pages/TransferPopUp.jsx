import React from "react";

const TransferPopup = ({ open, currStatus, message, onClose, onBack }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-63 flex flex-col">
        <div className="text-2xl font-bold text-center">{currStatus}</div>
        <div className="text-lg text-center mt-3">{message}</div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={onBack}
            className="w-full bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;
