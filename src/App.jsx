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
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
  });

  // EFFECTIVE FIX: Check for session on load
  useEffect(() => {
    const savedUser = sessionStorage.getItem('activeUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser({
        isAuthenticated: true,
        role: parsed.role,
      });
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Launch />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser} />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/doctor-dashboard"
        element={
          user.isAuthenticated && user.role === 'doctor' 
            ? <DoctorDashboard /> 
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/nurse-dashboard"
        element={
          user.isAuthenticated && user.role === 'nurse' 
            ? <NurseDashboard /> 
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/patient-dashboard"
        element={
          user.isAuthenticated && user.role === 'patient' 
            ? <PatientDashboard /> 
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/lab-dashboard"
        element={
          user.isAuthenticated && user.role === 'lab' 
            ? <LabDashboard /> 
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/pharmacy-dashboard"
        element={
          user.isAuthenticated && user.role === 'pharmacy' 
            ? <PharmacyDashboard /> 
            : <Navigate to="/login" replace />
        }
      />

      {/* Fallback to Launch if no route matches */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}