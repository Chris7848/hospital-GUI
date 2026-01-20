import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Package, AlertTriangle, Search, ShoppingBag, Plus, Menu, Bell, Settings, LogOut, LayoutDashboard, History, ClipboardCheck, GraduationCap } from 'lucide-react';
import DashboardLayout from './dashboardlayout'; // Using your standard layout

export default function PharmacyDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacyStaffName, setPharmacyStaffName] = useState('Pharmacist');
  const navigate = useNavigate();

  // 1. DYNAMIC SESSION HANDLING
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('activeUser'));
    if (user && user.name) {
      setPharmacyStaffName(user.name);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const stockData = [
    { id: 1, name: "Amoxicillin", qty: "42 Units", status: "Optimal", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 2, name: "Paracetamol", qty: "12 Units", status: "Low Stock", color: "text-rose-500", bg: "bg-rose-50" },
    { id: 3, name: "Metformin", qty: "115 Units", status: "Optimal", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 4, name: "Ibuprofen", qty: "8 Units", status: "Critical", color: "text-rose-600", bg: "bg-rose-100" },
    { id: 5, name: "Insulin", qty: "25 Units", status: "Optimal", color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  // 2. SEARCH FILTERING LOGIC
  const filteredStock = stockData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userRole="pharmacy" title="Pharmacy Hub">
      
      {/* 3. URGENT ALERTS STRIP */}
      <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-5 flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="bg-amber-500 p-2.5 rounded-xl text-white shadow-lg shadow-amber-500/20">
          <AlertTriangle size={20} />
        </div>
        <div>
          <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Prescription Verification Required</p>
          <p className="text-xs text-amber-700 font-medium">You have 2 pending physician orders awaiting approval.</p>
        </div>
        <button className="ml-auto bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-amber-700 transition-colors">
          Verify Now
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 4. INVENTORY CONTROL SECTION */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="font-black text-slate-800 text-xl tracking-tight">Inventory Registry</h2>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Integrated Search Bar */}
              <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E]" size={18} />
                <input 
                  type="text"
                  placeholder="Filter stock..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 outline-none focus:border-[#0F766E] shadow-sm transition-all text-sm font-bold"
                />
              </div>
              <button className="bg-[#0F766E] text-white p-3 rounded-2xl shadow-lg shadow-teal-900/20 hover:scale-105 active:scale-95 transition-all">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStock.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0F766E]/20 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl transition-all ${item.bg} text-slate-400 group-hover:bg-[#0F766E] group-hover:text-white`}>
                    <Pill size={24} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-slate-800 group-hover:text-[#0F766E] transition-colors">{item.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">{item.qty} Remaining</p>
                </div>
              </div>
            ))}
            
            {filteredStock.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-bold italic">No matching medicine in registry</p>
              </div>
            )}
          </div>
        </div>

        {/* 5. REQUEST QUEUE SIDEBAR */}
        <aside className="space-y-6">
          <h2 className="font-black text-slate-800 text-xl tracking-tight">Prescription Queue</h2>
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center shadow-inner bg-slate-50/30">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl mb-6 relative group">
              <Package className="text-slate-200 group-hover:text-[#0F766E] transition-colors" size={48} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full border-4 border-white animate-pulse" />
            </div>
            <h3 className="text-slate-800 font-black mb-2 text-sm">Awaiting Dispatch</h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest max-w-[200px] leading-relaxed">
              Scan for new physician orders is active.
            </p>
            <button className="mt-8 text-[10px] font-black text-[#0F766E] uppercase tracking-widest border-b-2 border-teal-100 hover:border-[#0F766E] transition-all">
              View History
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#0F766E] to-teal-900 p-6 rounded-[2rem] text-white shadow-xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-lg"><ClipboardCheck size={20}/></div>
                <h4 className="font-bold text-sm">Shift Summary</h4>
             </div>
             <div className="space-y-3">
                <SummaryStat label="Orders Filled" value="14" />
                <SummaryStat label="Low Stock Items" value="03" />
             </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

// Sidebar logic is now handled by DashboardLayout. NavItem removed to prevent duplication.

function SummaryStat({ label, value }) {
  return (
    <div className="flex justify-between items-center text-[11px] font-bold">
      <span className="opacity-60 uppercase tracking-widest">{label}</span>
      <span className="bg-white/10 px-2 py-0.5 rounded-md">{value}</span>
    </div>
  );
}