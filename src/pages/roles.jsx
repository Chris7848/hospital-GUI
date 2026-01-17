import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Syringe, TestTube, Pill, GraduationCap, ChevronLeft } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    { id: 'patient', title: 'Patient', icon: <User />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'doctor', title: 'Doctor', icon: <Stethoscope />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'nurse', title: 'Nurse', icon: <Syringe />, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'lab', title: 'Lab Tech', icon: <TestTube />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'pharmacy', title: 'Pharmacist', icon: <Pill />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleSelection = (roleId) => {
    localStorage.setItem('role', roleId);
    navigate('/register', { state: { role: roleId } });
  };

  return (
    <div className="flex min-h-screen bg-white lg:bg-slate-50 font-sans">
      {/* LEFT SIDE: ABUAD BRANDING */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#0F766E] flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        {/* UPDATED LOGO: Match the dashboard "Teal on Light" style */}
        <div className="flex items-center gap-3 text-2xl font-black relative z-10">
          <div className="bg-teal-400/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/10">
            <GraduationCap size={32} className="text-teal-300" />
          </div>
          <div className="leading-tight tracking-tighter">
            ABUAD <br />
            <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">Hospital</span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl font-black leading-tight mb-6 tracking-tighter">
            Where care <br />meets excellence.
          </h1>
          <p className="text-teal-100/70 text-lg leading-relaxed font-medium max-w-md">
            Welcome to ABUAD Multisystem Hospital. Please select your professional designation to access your specialized workspace.
          </p>
        </div>

        <div className="text-teal-200/30 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">
          Secured by ABUAD Health Systems • 2026
        </div>
      </div>

      {/* RIGHT SIDE: ROLE SELECTOR */}
      <div className="w-full lg:w-3/5 flex flex-col p-6 md:p-12 lg:p-20 justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-slate-400 hover:text-[#0F766E] font-bold text-sm mb-12 transition-colors group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Launch
          </button>

          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Identity Access</h2>
            <p className="text-[#0F766E] font-black text-xs uppercase tracking-[0.2em] mt-2">
              Select your department to continue
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelection(role.id)}
                className="group flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-900/10 transition-all active:scale-95"
              >
                <div className={`p-5 rounded-3xl mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${role.bg} ${role.color}`}>
                  {React.cloneElement(role.icon, { size: 36 })}
                </div>
                <span className="font-black text-slate-700 tracking-tight">{role.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-100/50 rounded-[2.5rem] border border-slate-100 text-center">
            <p className="text-slate-500 font-bold mb-4">Already registered in our system?</p>
            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-white text-[#0F766E] border-2 border-[#0F766E]/10 py-4 rounded-2xl font-black hover:bg-[#0F766E] hover:text-white transition-all shadow-sm"
            >
              Sign In to Your Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}