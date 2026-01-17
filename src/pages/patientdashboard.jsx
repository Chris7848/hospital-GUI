import React, { useState } from 'react';
import { Search, Bell, Calendar, FileText, Activity, MessageSquare, MapPin, User, Menu, X, ChevronRight, Settings, LogOut } from 'lucide-react';

export default function PatientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-2 mb-10 font-black text-2xl text-[#0F766E]">
          <Activity size={32} /> MediGate
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
          <SidebarLink icon={<LogOut size={20}/>} label="Sign Out" />
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        
        {/* Responsive Top Header */}
        <header className="bg-white lg:bg-transparent px-6 py-4 lg:py-8 flex justify-between items-center sticky top-0 z-10 lg:static">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-lg">
              <Menu size={24} className="text-slate-600" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-sm text-slate-500 font-medium">Hello,</h1>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">James Sullivan</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2 mr-2 shadow-sm">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search medical info..." className="bg-transparent border-none outline-none text-sm ml-2 w-48 lg:w-64" />
            </div>
            
            <button className="p-2 bg-white border border-slate-200 rounded-xl relative shadow-sm">
              <Bell size={22} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl overflow-hidden border-2 border-white shadow-sm cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=James+Sullivan&background=10b981&color=fff" alt="Profile" />
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Mobile Welcome (Only visible on phone) */}
          <div className="lg:hidden">
             <h1 className="text-sm text-slate-500 font-medium">Hello,</h1>
             <h2 className="text-2xl font-bold text-slate-800 tracking-tight">James Sullivan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Appointment & Actions */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Appointment Card */}
              <div className="bg-[#0F766E] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-teal-900/30 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-6">
                    <div className="bg-white/20 w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Upcoming Appointment
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">Dr. Alisa Johnson</h3>
                      <p className="text-teal-100/80 text-lg mt-1">Dermatologist • Monday, 10:30 AM</p>
                    </div>
                    <div className="flex gap-3">
                       <button className="bg-white text-[#0F766E] px-8 py-3 rounded-2xl font-bold hover:bg-teal-50 active:scale-95 transition-all shadow-lg">
                        Join Video Call
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl transition-all">
                        <Calendar size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-4xl backdrop-blur-md hidden md:block">
                    <Calendar size={64} className="text-white opacity-90" />
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
              </div>

              {/* Action Grid */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
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

            {/* Right Column: Reports */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Latest Reports</h3>
                <button className="text-xs font-bold text-[#0F766E] hover:underline">See All</button>
              </div>
              
              <div className="space-y-4">
                <ReportItem title="Blood Analysis" date="12 Jan 2026" status="Normal" color="emerald" />
                <ReportItem title="COVID-19 Test" date="08 Jan 2026" status="Negative" color="blue" />
                <ReportItem title="X-Ray Chest" date="02 Jan 2026" status="Clear" color="purple" />
              </div>

              {/* Health Tip Card (Laptop Only) */}
              <div className="hidden lg:block bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl">
                 <h4 className="font-bold mb-2 flex items-center gap-2 italic">Health Tip of the Day</h4>
                 <p className="text-sm opacity-80 leading-relaxed">Drinking 2 liters of water daily helps maintain skin elasticity and kidney function.</p>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAV (Hidden on Laptop) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-5 flex justify-between items-center z-20">
        <Activity className="text-[#0F766E]" size={26} />
        <Calendar className="text-slate-300" size={26} />
        <MessageSquare className="text-slate-300" size={26} />
        <User className="text-slate-300" size={26} />
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
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      {badge && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">{badge}</span>}
    </div>
  );
}

function ActionButton({ icon, label, color }) {
  return (
    <button className="flex flex-col items-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-[#0F766E]/20 transition-all group">
      <div className={`${color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ReportItem({ title, date, status, color }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-colors`}>
          <FileText size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{date}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-200 group-hover:text-[#0F766E]" />
    </div>
  );
}