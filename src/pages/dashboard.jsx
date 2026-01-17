import DoctorDashboard from './doctor/DoctorDashboard';
import PatientDashboard from './patient/PatientDashboard';
import NurseDashboard from './nurse/NurseDashboard';

export default function DashboardHome({ userRole }) {
  // This logic determines which "Main Page" the user sees
  switch (userRole) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'nurse':
      return <NurseDashboard />;
    default:
      return <div>Access Denied or Role Not Found</div>;
  }
}