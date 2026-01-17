import React, { useState } from 'react';
import { Pill, Package, AlertTriangle, Search, ShoppingBag, Plus, Menu, Bell, Settings, LogOut, LayoutDashboard, History, ClipboardCheck } from 'lucide-react';

export default function PharmacyDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stock = [
    { name: "Amoxicillin", qty: "42 Units", status: "Optimal", color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Paracetamol", qty: "12 Units", status: "Low Stock", color: "text-rose-500", bg: "bg-rose-50" },
    { name: "Metformin", qty: "115 Units", status: "Optimal", color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Ibuprofen", qty: "8 Units", status: "Critical", color: "text-rose-600", bg: "bg-rose-100" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. PERMANENT SIDEBAR (Laptop/Desktop) */}
      <aside className="hidden lg:flex w-72 bg-amber-700 flex-col p-6 text-white fixed h-full z-20 shadow-xl">
        <div className="flex items-center gap-3 mb-10 font-black text-2xl uppercase tracking-tighter">
          <div className="bg-white text-amber-700 p-2 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          PharmaLink
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<Pill size={20}/>} label="Inventory" />
          <NavItem icon={<ClipboardCheck size={20}/>} label="Prescriptions" badge="2" />
          <NavItem icon={<History size={20}/>} label="Order History" />
        </nav>

        <div className="pt-6 border-t border-amber-600 space-y-1">
          <NavItem icon={<Settings size={20}/>} label="Pharmacy Settings" />
          <NavItem icon={<LogOut size={20}/>} label="Sign Out" />
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        
        {/* Header Section */}
        <header className="bg-amber-600 lg:bg-white p-4 md:p-6 lg:border-b border-slate-200 text-white lg:text-slate-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold">Main Pharmacy</h1>
                <p className="text-xs lg:text-slate-500 opacity-80">Central Distribution Hub</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-amber-700 lg:bg-slate-100 rounded-xl px-4 py-2">
                <Search size={18} className="text-amber-200 lg:text-slate-400" />
                <input type="text" placeholder="Search medicines..." className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder:text-amber-200 lg:placeholder:text-slate-400" />
              </div>
              <button className="p-2 bg-white/10 lg:bg-slate-100 rounded-full"><Bell size={20}/></button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Urgent Alerts (Full Width) */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-amber-500 p-2 rounded-lg text-white">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">Urgent Verification Needed</p>
              <p className="text-xs text-amber-700">2 prescriptions are awaiting pharmacist approval.</p>
            </div>
            <button className="ml-auto text-xs font-black uppercase text-amber-600 hover:underline">Verify Now</button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Inventory Section (Takes 2/3 width) */}
            <div className="xl:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg uppercase tracking-tight">Inventory Overview</h2>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-amber-600/20">
                  <Plus size={18} /> <span className="hidden sm:inline">Add Stock</span>
                </button>
              </div>

              {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on large laptop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stock.map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl flex flex-col justify-between border border-slate-200 shadow-sm hover:border-amber-500/50 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl transition-colors ${item.bg} text-slate-400 group-hover:bg-amber-500 group-hover:text-white`}>
                        <Pill size={24} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-amber-700 transition-colors">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Queue Section (Laptop Sidebar) */}
            <div className="space-y-6">
              <h2 className="font-bold text-slate-800 text-lg uppercase tracking-tight">New Requests</h2>
              <div className="bg-white p-8 rounded-[2.5rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-50 p-6 rounded-full mb-4">
                  <Package className="text-slate-200" size={48} />
                </div>
                <h3 className="text-slate-800 font-bold mb-1 text-sm">Waiting for Orders</h3>
                <p className="text-xs text-slate-400 max-w-[180px]">Automated scan for new physician prescriptions is active.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Nav Component
function NavItem({ icon, label, active = false, badge }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-white text-amber-700 shadow-lg shadow-amber-900/20' : 'text-amber-100 hover:bg-amber-600'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      {badge && <span className="bg-white text-amber-700 text-[10px] px-2 py-0.5 rounded-lg font-black">{badge}</span>}
    </div>
  );
}