// components/RemarkModal.js
import React, { useState } from 'react';

const RemarkModal = ({ isOpen, onClose, onSubmit, item, rating }) => {
  const [remark, setRemark] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Remark for: {item}</h2>
        <p className="mb-2 text-sm text-gray-600">Rating: <strong>{rating}</strong></p>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={4}
          placeholder="Write your remark..."
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={() => {
              onSubmit({ item, rating, remark });
              setRemark('');
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
