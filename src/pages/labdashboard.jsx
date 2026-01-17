import React, { useState } from 'react';
import { TestTube, FlaskConical, Search, Filter, Menu, Bell, Settings, LogOut, LayoutDashboard, Beaker, ChevronRight } from 'lucide-react';

export default function LabDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const testOrders = [
    { id: "LAB-901", patient: "Alice Zhang", test: "Complete Blood Count", status: "In Progress", priority: "High", time: "10 mins ago" },
    { id: "LAB-902", patient: "Robert Fox", test: "Lipid Profile", status: "Pending", priority: "Normal", time: "25 mins ago" },
    { id: "LAB-903", patient: "Elena G.", test: "Urinalysis", status: "Completed", priority: "Normal", time: "1 hr ago" },
    { id: "LAB-904", patient: "James Wilson", test: "Blood Glucose", status: "Pending", priority: "High", time: "2 hrs ago" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. PERMANENT SIDEBAR (Laptop) */}
      <aside className="hidden lg:flex w-72 bg-indigo-900 flex-col p-6 text-white fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 font-bold text-2xl tracking-tight">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <FlaskConical size={24} />
          </div>
          LabCore
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Queue Overview" active />
          <NavItem icon={<TestTube size={20}/>} label="Active Tests" />
          <NavItem icon={<Beaker size={20}/>} label="Equipment Status" />
          <NavItem icon={<Bell size={20}/>} label="Alerts" badge="4" />
        </nav>

        <div className="pt-6 border-t border-indigo-800 space-y-1">
          <NavItem icon={<Settings size={20}/>} label="Settings" />
          <NavItem icon={<LogOut size={20}/>} label="Sign Out" />
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        
        {/* Responsive Header */}
        <header className="bg-indigo-700 lg:bg-white p-4 md:p-6 lg:border-b border-slate-200 text-white lg:text-slate-800 sticky top-0 z-10 transition-colors">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold">Lab Station 04</h1>
                <p className="text-xs lg:text-slate-500 opacity-80 lg:opacity-100">Main Pathology Wing</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center bg-indigo-800/50 lg:bg-slate-100 rounded-xl px-4 py-2">
                <Search size={18} className="text-indigo-300 lg:text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Test ID or Patient..." 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder:text-indigo-300 lg:placeholder:text-slate-400" 
                />
              </div>
              <button className="p-2 bg-white/10 lg:bg-slate-100 rounded-full">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Lab Content */}
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Lab Metrics (Horizontal on Laptop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <LabStat label="In Queue" value="24" color="bg-indigo-600" />
            <LabStat label="Processing" value="08" color="bg-amber-500" />
            <LabStat label="Urgent" value="03" color="bg-rose-600" />
            <LabStat label="Completed" value="42" color="bg-emerald-600" />
          </div>

          {/* Test Orders Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Recent Test Orders</h2>
                <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Filter size={16} /> Filter
                </button>
              </div>

              <div className="space-y-3">
                {testOrders.map((order) => (
                  <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${
                        order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        <TestTube size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{order.test}</h4>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          {order.patient} <span className="mx-2">•</span> {order.id}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${
                          order.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {order.priority}
                        </span>
                        <p className="text-[10px] mt-1 text-slate-400 font-bold">{order.time}</p>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Tools (Desktop Only) */}
            <div className="hidden xl:block space-y-6">
              <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Station Integrity</h3>
                <div className="space-y-4">
                  <ProgressItem label="Centrifuge 01" value={85} />
                  <ProgressItem label="Reagent Stock" value={30} warning />
                  <ProgressItem label="Analyzer 04" value={100} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active = false, badge }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-white/10 text-white' : 'text-indigo-200 hover:bg-white/5 hover:text-white'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {badge && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{badge}</span>}
    </div>
  );
}

function LabStat({ label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative group">
      <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
      <p className="text-2xl font-black text-slate-800">{value}</p>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{label}</p>
    </div>
  );
}

function ProgressItem({ label, value, warning }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wide">
        <span className="text-slate-500">{label}</span>
        <span className={warning ? 'text-rose-500' : 'text-indigo-600'}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${warning ? 'bg-rose-500' : 'bg-indigo-600'}`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}