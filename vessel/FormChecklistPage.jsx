import { useParams } from 'react-router-dom';
import { FaPlus, FaCamera } from 'react-icons/fa';
import React, { useState } from 'react';
import RemarkModal from './RemarkModal';

const mockChecklist = [
  "air pollution certificate - vessels of 400gt or more",
  "anti-fouling certificate - vessels of 400gt or more",
  "anti-fouling declaration - less than 24m and 400gt",
  "international fishing vessel certificate - ≥ 24m",
  "international tonnage certificate - ≥ 400gt",
  "oil pollution prevention certificate"
];

const ratingOptions = ["Good", "Repair", "Replace", "NA"];

export default function FormChecklistPage() {
  const { formId, shipId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const handleRatingClick = (item, rating) => {
    setSelectedItem(item);
    setSelectedRating(rating);
    setShowModal(true);
  };

  const handleSubmitRemark = ({ item, rating, remark }) => {
    console.log("Submitted Remark:", { item, rating, remark });
    // You can save this to Firebase here if needed
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Form {formId} Inspection</h2>
      <p className="text-gray-600 mb-4">Ship ID: {shipId}</p>

      <div className="bg-white shadow-md rounded p-4">
        {mockChecklist.map((item, idx) => (
          <div key={idx} className="mb-4 border-b pb-2">
            <div className="flex justify-between items-center mb-2">
              <span>{idx + 1}. {item}</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaPlus />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaCamera />
                </button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {ratingOptions.map(opt => (
                <button
                  key={opt}
                  className="bg-gray-100 px-4 py-1 rounded border hover:bg-gray-200"
                  onClick={() => handleRatingClick(item, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <RemarkModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitRemark}
        item={selectedItem}
        rating={selectedRating}
      />
    </div>
  );
}
