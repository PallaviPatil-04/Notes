import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/Firebase';

const StartInspection = () => {
  const { shipId } = useParams();
  const navigate = useNavigate(); // <== NEW
  const [ship, setShip] = useState(null);

  const inspectionForms = [
    "1. Bulk Carrier - Annual Survey",
    "2. Certificates and Documents - General UK Vessels",
    "3. Certificates and Documents - Checklist - Singapore Port Clearance",
    "4. Chemical Tanker - Annual Survey",
    "5. Combined Internal ISM ISO ISPS Audit",
    "6. Commercial Vessel Safety and Compliance Audit",
  ];

  useEffect(() => {
    const fetchShip = async () => {
      const docRef = doc(fireDB, 'ships', shipId);
      const shipSnap = await getDoc(docRef);
      if (shipSnap.exists()) {
        setShip(shipSnap.data());
      }
    };
    fetchShip();
  }, [shipId]);

  if (!ship) return <div className="text-center mt-10">Loading ship data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Inspection Forms for {ship.name}</h2>
      <p className="text-gray-600 mb-2">IMO: {ship.imoNumber}</p>
      <p className="text-gray-600 mb-6">Type: {ship.type}</p>

      <div className="bg-white rounded-lg shadow-lg p-4 border max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Inspection Forms</h3>
        <div className="space-y-3">
          {inspectionForms.map((form, index) => (
            <div
              key={index}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={() => navigate(`/inspection/${shipId}/form/${index + 1}`)} // 👈 Go to detailed form
            >
              {form}
            </div>
          ))}
        </div>

        <button
          className="mt-6 text-blue-600 font-semibold hover:underline"
          onClick={() => window.history.back()}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default StartInspection;
