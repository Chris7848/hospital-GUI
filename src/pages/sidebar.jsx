import React from 'react';
import { X, LayoutDashboard, Users, Pill, Activity, LogOut, GraduationCap, Microscope } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, userRole, navigate }) {
  
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('role');
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    { id: 'doctor', label: 'Doctor Hub', icon: <Users size={20} />, path: '/doctor-dashboard' },
    { id: 'nurse', label: 'Nursing Station', icon: <Activity size={20} />, path: '/nurse-dashboard' },
    { id: 'lab', label: 'Laboratory', icon: <Microscope size={20} />, path: '/lab-dashboard' },
    { id: 'pharmacy', label: 'Pharmacy', icon: <Pill size={20} />, path: '/pharmacy-dashboard' },
    { id: 'patient', label: 'My Health', icon: <LayoutDashboard size={20} />, path: '/patient-dashboard' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3 font-black text-xl text-[#0F766E] tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
              <GraduationCap size={32} className="text-[#0F766E]" />
              <div className="leading-tight">
                ABUAD <br />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hospital</span>
              </div>
            </div>
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsOpen(false)}>
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            {menuItems.map((item) => {
              // Logic to check if this button is the current page
              const isCurrentPage = window.location.pathname === item.path;
              const isActive = userRole === item.id || isCurrentPage;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { 
                    setIsOpen(false);
                    // ONLY navigate if we aren't already there
                    if (!isCurrentPage) {
                      navigate(item.path); 
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all active:scale-95 ${
                    isActive 
                      ? 'bg-[#0F766E] text-white shadow-lg shadow-teal-900/20' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#0F766E]'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 transition-all active:scale-95"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}