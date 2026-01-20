import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages & Dashboards
import Launch from './pages/launch';
import RoleSelection from './pages/roles';
import Register from './pages/register';
import Login from './pages/login';
import DoctorDashboard from './pages/doctordashboard';
import PatientDashboard from './pages/patientdashboard';
import NurseDashboard from './pages/nursedashboard';
import LabDashboard from './pages/labdashboard';
import PharmacyDashboard from './pages/pharmdashboard';

export default function App() {
  // 1. CRITICAL: Initialize state from sessionStorage immediately
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('activeUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return { isAuthenticated: true, role: parsed.role };
    }
    return { isAuthenticated: false, role: null };
  });

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Launch />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser} />} />

      {/* 2. PROTECTED ROUTES: Only check if authenticated, not the specific role 
          This prevents the "Nurse clicking Lab" redirect loop. */}
      <Route
        path="/doctor-dashboard"
        element={user.isAuthenticated ? <DoctorDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/nurse-dashboard"
        element={user.isAuthenticated ? <NurseDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/patient-dashboard"
        element={user.isAuthenticated ? <PatientDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/lab-dashboard"
        element={user.isAuthenticated ? <LabDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/pharmacy-dashboard"
        element={user.isAuthenticated ? <PharmacyDashboard /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}