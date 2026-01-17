// src/PatientsList.jsx
import React, { useEffect, useState } from 'react';
import { getPatients } from './api';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <ul>
        {patients.map((p) => (
          <li key={p._id} className="mb-2 p-2 border rounded">
            <strong>{p.name}</strong> — {p.age} years — {p.gender} — {p.condition}
          </li>
        ))}
      </ul>
    </div>
  );
}
