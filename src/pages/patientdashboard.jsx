import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Calendar, FileText, Activity, MessageSquare, MapPin, User, Menu, ChevronRight, Settings, LogOut, GraduationCap } from 'lucide-react';

export default function PatientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patientName, setPatientName] = useState('Patient');
  const navigate = useNavigate();

  // 1. SYNC NAME ON LOGIN
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('activeUser'));
    if (user && user.name) {
      setPatientName(user.name);
    } else {
      // Security: If no user session, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // 2. SIGN OUT FUNCTION
  const handleSignOut = () => {
    sessionStorage.removeItem('activeUser');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col p-6 fixed h-full z-20">
        {/* UPDATED LOGO: Match the RoleSelection style */}
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <div className="bg-[#0F766E]/10 p-2 rounded-xl">
            <GraduationCap size={28} className="text-[#0F766E]" />
          </div>
          <div className="leading-tight tracking-tighter font-black text-[#0F766E] text-xl">
            ABUAD <br />
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block -mt-1">Hospital</span>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1">
          <SidebarLink icon={<Activity size={20}/>} label="Overview" active />
          <SidebarLink icon={<Calendar size={20}/>} label="Appointments" />
          <SidebarLink icon={<FileText size={20}/>} label="Medical Records" />
          <SidebarLink icon={<MessageSquare size={20}/>} label="Messages" badge="3" />
          <SidebarLink icon={<MapPin size={20}/>} label="Find Doctors" />
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-1">
          <SidebarLink icon={<Settings size={20}/>} label="Settings" />
          {/* Linked handleSignOut */}
          <div onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer text-rose-500 hover:bg-rose-50 transition-all">
            <LogOut size={20} />
            <span className="font-bold text-sm">Sign Out</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        
        <header className="bg-white lg:bg-transparent px-6 py-4 lg:py-8 flex justify-between items-center sticky top-0 z-10 lg:static">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-lg">
              <Menu size={24} className="text-slate-600" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-sm text-slate-500 font-medium">Welcome back,</h1>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{patientName}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2 mr-2 shadow-sm focus-within:border-[#0F766E] transition-all">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search records..." className="bg-transparent border-none outline-none text-sm ml-2 w-48 lg:w-64 font-medium" />
            </div>
            
            <button className="p-2 bg-white border border-slate-200 rounded-xl relative shadow-sm hover:bg-slate-50 transition-colors">
              <Bell size={22} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-teal-900/20">
              {patientName[0]}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          {/* Mobile Welcome */}
          <div className="lg:hidden mb-4">
             <h1 className="text-sm text-slate-500 font-medium">Welcome back,</h1>
             <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{patientName}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0F766E] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-teal-900/30 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-6">
                    <div className="bg-white/20 w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Upcoming Appointment
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Dr. Alisa Johnson</h3>
                      <p className="text-teal-100/80 text-lg mt-1">Dermatologist • Monday, 10:30 AM</p>
                    </div>
                    <div className="flex gap-3">
                       <button className="bg-white text-[#0F766E] px-8 py-3.5 rounded-2xl font-black hover:bg-teal-50 active:scale-95 transition-all shadow-lg text-sm">
                        Join Video Call
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 px-4 py-3.5 rounded-2xl transition-all">
                        <Calendar size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-[2rem] backdrop-blur-md hidden md:block">
                    <GraduationCap size={64} className="text-white opacity-40" />
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
                  <div className="w-2 h-6 bg-[#0F766E] rounded-full"></div> Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <ActionButton icon={<MessageSquare size={24} />} label="Chat" color="bg-blue-50 text-blue-600" />
                  <ActionButton icon={<FileText size={24} />} label="Records" color="bg-purple-50 text-purple-600" />
                  <ActionButton icon={<MapPin size={24} />} label="Nearby" color="bg-rose-50 text-rose-600" />
                  <ActionButton icon={<Activity size={24} />} label="Vitals" color="bg-emerald-50 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Latest Reports</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#0F766E] hover:underline">See All</button>
              </div>
              
              <div className="space-y-4">
                <ReportItem title="Blood Analysis" date="12 Jan 2026" status="Normal" color="emerald" />
                <ReportItem title="COVID-19 Test" date="08 Jan 2026" status="Negative" color="blue" />
                <ReportItem title="X-Ray Chest" date="02 Jan 2026" status="Clear" color="purple" />
              </div>

              <div className="hidden lg:block bg-gradient-to-br from-[#0F766E] to-teal-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                    <h4 className="font-black text-xs uppercase tracking-widest mb-2 opacity-60">Health Tip</h4>
                    <p className="text-sm font-bold leading-relaxed italic">"Drinking 2 liters of water daily helps maintain skin elasticity and kidney function."</p>
                 </div>
                 <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Activity size={80} />
                 </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-5 flex justify-between items-center z-20">
        <Activity className="text-[#0F766E]" size={26} />
        <Calendar className="text-slate-300" size={26} />
        <div className="w-12 h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-teal-900/20">
          {patientName[0]}
        </div>
        <MessageSquare className="text-slate-300" size={26} />
        <LogOut onClick={handleSignOut} className="text-rose-400" size={26} />
      </nav>
    </div>
  );
}

// Sub-components
function SidebarLink({ icon, label, active = false, badge }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-[#0F766E]/5 text-[#0F766E]' : 'text-slate-500 hover:bg-slate-50'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-black text-sm tracking-tight">{label}</span>
      </div>
      {badge && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">{badge}</span>}
    </div>
  );
}

function ActionButton({ icon, label, color }) {
  return (
    <button className="flex flex-col items-center gap-3 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-[#0F766E]/20 transition-all group">
      <div className={`${color} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">{label}</span>
    </button>
  );
}

function ReportItem({ title, date, status, color }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#0F766E] group-hover:text-white transition-colors`}>
          <FileText size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#0F766E] transition-colors">{title}</h4>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{date}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-200 group-hover:text-[#0F766E] transition-colors" />
    </div>
  );
}