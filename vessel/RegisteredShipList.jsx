import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/Firebase';
import { Link } from 'react-router-dom';

const RegisteredShipList = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      const snapshot = await getDocs(collection(fireDB, 'ships'));
      const shipList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShips(shipList);
    };
    fetchShips();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Select a Ship for Inspection</h2>
      <div className="grid gap-4">
        {ships.map((ship) => (
          <Link
            to={`/admin/inspection/${ship.id}`}
            key={ship.id}
            className="bg-white p-4 rounded shadow hover:bg-blue-50 border flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{ship.name}</h3>
              <p className="text-sm text-gray-600">{ship.imoNumber} - {ship.type}</p>
            </div>
            <span className="text-blue-600 font-medium">Inspect →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegisteredShipList;
