// src/data/db.js
export const mockDatabase = {
  patients: [
    {
      id: "AB-2024-001",
      name: "Enearu Christopher",
      age: 45,
      gender: "Male",
      room: "302",
      status: "Stable",
      bloodType: "O+",
      hr: 72,
      bp: "120/80",
      temp: "36.5°C",
      contact: "+234 801 234 5678",
      allergies: ["Penicillin"],
      history: ["Hypertension diagnosed 2021", "Appendectomy 2018"]
    },
    {
      id: "AB-2024-002",
      name: "Ali Zukrillah",
      age: 29,
      gender: "Female",
      room: "ICU-04",
      status: "Critical",
      bloodType: "A-",
      hr: 110,
      bp: "145/95",
      temp: "38.2°C",
      contact: "+234 703 111 2222",
      allergies: ["Peanuts", "Sulfa"],
      history: ["Acute Respiratory Distress", "Asthma"]
    },
    {
      id: "AB-2024-003",
      name: "Iyortum Shannel",
      age: 62,
      gender: "Male",
      room: "215",
      status: "Stable",
      bloodType: "B+",
      hr: 68,
      bp: "118/75",
      temp: "36.8°C",
      contact: "+234 812 333 4444",
      allergies: [],
      history: ["Type 2 Diabetes", "Knee Replacement"]
    }
  ],
  inventory: [
    { id: "M001", name: "Paracetamol", stock: 500, unit: "Tablets" },
    { id: "M002", name: "Amoxicillin", stock: 120, unit: "Capsules" }
  ],
  labOrders: [
    { id: "L991", patientName: "John Olumide", test: "Blood Glucose", status: "Pending" }
  ]
};