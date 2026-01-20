import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestTube, FlaskConical, Search, Filter, Menu, Bell, Settings, LogOut, LayoutDashboard, Beaker, ChevronRight, GraduationCap } from 'lucide-react';

export default function LabDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. UPDATED: Default to 'Lab Staff' so the UI stays stable if session is empty
  const [labStaffName, setLabStaffName] = useState('Lab Staff');
  const navigate = useNavigate();

  // 2. UPDATED: Removed navigate('/login') so you stay on the page
  useEffect(() => {
    try {
      const sessionData = sessionStorage.getItem('activeUser');
      if (sessionData) {
        const user = JSON.parse(sessionData);
        if (user && user.name) {
          setLabStaffName(user.name);
        }
      }
    } catch (error) {
      console.error("Session parse error:", error);
    }
  }, []); // Run once on mount

  const handleSignOut = () => {
    sessionStorage.removeItem('activeUser');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const testOrders = [
    { id: "LAB-901", patient: "Alice Zhang", test: "Complete Blood Count", status: "In Progress", priority: "High", time: "10 mins ago" },
    { id: "LAB-902", patient: "Robert Fox", test: "Lipid Profile", status: "Pending", priority: "Normal", time: "25 mins ago" },
    { id: "LAB-903", patient: "Elena G.", test: "Urinalysis", status: "Completed", priority: "Normal", time: "1 hr ago" },
    { id: "LAB-904", patient: "James Wilson", test: "Blood Glucose", status: "Pending", priority: "High", time: "2 hrs ago" },
  ];

  const filteredOrders = testOrders.filter(order => 
    order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <div className="bg-[#0F766E]/10 p-2.5 rounded-xl">
            <GraduationCap size={28} className="text-[#0F766E]" />
          </div>
          <div className="leading-tight tracking-tighter font-black text-[#0F766E] text-xl">
            ABUAD <br />
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block -mt-1">Hospital</span>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1">
          <SidebarLink icon={<LayoutDashboard size={20}/>} label="Queue Overview" active />
          <SidebarLink icon={<TestTube size={20}/>} label="Active Tests" />
          <SidebarLink icon={<Beaker size={20}/>} label="Equipment" />
          <SidebarLink icon={<Bell size={20}/>} label="Alerts" badge="4" />
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-1">
          <SidebarLink icon={<Settings size={20}/>} label="Station Settings" />
          <div onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer text-rose-500 hover:bg-rose-50 transition-all">
            <LogOut size={20} />
            <span className="font-bold text-sm">Sign Out</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        
        <header className="bg-white px-6 py-4 lg:py-8 flex justify-between items-center sticky top-0 z-10 lg:static border-b lg:border-none border-slate-200">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-lg">
              <Menu size={24} className="text-slate-600" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-sm text-slate-500 font-medium tracking-wide">Pathology Wing • Station 04</h1>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Welcome, {labStaffName}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2.5 mr-2 shadow-sm focus-within:border-[#0F766E] transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Find Patient or Test ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm ml-2 w-48 lg:w-64 font-medium" 
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl relative shadow-sm hover:bg-slate-50">
              <Bell size={22} className="text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0F766E] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <LabStat label="In Queue" value="24" color="bg-[#0F766E]" />
            <LabStat label="Processing" value="08" color="bg-amber-500" />
            <LabStat label="Urgent" value="03" color="bg-rose-600" />
            <LabStat label="Completed" value="42" color="bg-emerald-600" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <div className="w-2 h-6 bg-[#0F766E] rounded-full"></div> 
                  Recent Test Orders
                </h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#0F766E] flex items-center gap-2">
                  <Filter size={14} /> Filter Queue
                </button>
              </div>

              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0F766E]/20 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl transition-all group-hover:bg-[#0F766E] group-hover:text-white ${
                        order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <TestTube size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 group-hover:text-[#0F766E] transition-colors">{order.test}</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mt-1">
                          {order.patient} <span className="mx-2 text-slate-200">•</span> {order.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <span className={`text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest ${
                          order.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {order.priority} Priority
                        </span>
                        <p className="text-[10px] mt-1 text-slate-400 font-bold">{order.time}</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-200 group-hover:text-[#0F766E] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR TOOLS */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 mb-6 text-sm uppercase tracking-widest">Station Integrity</h3>
                <div className="space-y-6">
                  <ProgressItem label="Centrifuge 01" value={85} />
                  <ProgressItem label="Reagent Stock" value={30} warning />
                  <ProgressItem label="Auto-Analyzer" value={100} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
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
      {badge && <span className="bg-[#0F766E] text-white text-[10px] px-2 py-0.5 rounded-lg font-black">{badge}</span>}
    </div>
  );
}

function LabStat({ label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative group cursor-default">
      <div className={`absolute top-6 left-0 w-1.5 h-8 rounded-r-full ${color}`} />
      <p className="text-3xl font-black text-slate-800 tracking-tighter">{value}</p>
      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1">{label}</p>
    </div>
  );
}

function ProgressItem({ label, value, warning }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className={warning ? 'text-rose-500' : 'text-[#0F766E]'}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${warning ? 'bg-rose-500' : 'bg-[#0F766E]'}`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}