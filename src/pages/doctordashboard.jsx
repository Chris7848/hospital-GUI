import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, UserRound, GraduationCap, Microscope, ClipboardList, Users, Activity } from 'lucide-react';
import DashboardLayout from './dashboardlayout'; 
import { mockDatabase } from '../data/db'; 
import PatientModal from './patientmodel'; 

export default function DoctorDashboard() {
  
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('Doctor');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('activeUser'));
    if (user && user.name) setDoctorName(user.name);
  }, []);

  
  const filteredPatients = mockDatabase.patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.room.includes(search) 
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout userRole="doctor" title="Clinical Overview">
      
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Hello, Dr. {doctorName.split(' ')[0]}</h1>
          <p className="text-[#0F766E] font-bold text-sm flex items-center gap-2 mt-1">
            <Activity size={16} /> 12 Patients assigned to you today
          </p>
        </div>
        
        {/* THE SEARCH INPUT */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" size={20} />
            <input
              className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] py-4 pl-12 pr-4 outline-none focus:border-[#0F766E] shadow-sm transition-all font-medium text-slate-700"
              placeholder="Search by name, ID or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-[#0F766E] text-white p-4 rounded-[1.5rem] shadow-lg shadow-teal-900/20 hover:scale-105 active:scale-95 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Users />} label="Your Patients" value={filteredPatients.length} color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={<ClipboardList />} label="Pending Labs" value="04" color="text-amber-600" bg="bg-amber-50" />
        <StatCard icon={<Microscope />} label="Reports Ready" value="02" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {/* RESULTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredPatients.map((p) => (
          <div
            key={p.id}
            onClick={() => handlePatientClick(p)}
            className="bg-white p-8 rounded-[2.5rem] border-2 border-transparent hover:border-[#0F766E]/20 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Design element: subtle background ID */}
            <span className="absolute -right-4 -bottom-2 text-slate-50 font-black text-6xl pointer-events-none uppercase">{p.bloodType}</span>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all">
                <UserRound size={28} />
              </div>
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${
                p.status === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                {p.status}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-slate-800 text-xl tracking-tight mb-1">{p.name}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Room {p.room} <span className="text-slate-200">|</span> {p.id}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
               <div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Heart Rate</p>
                  <p className="font-black text-rose-500">{p.hr} <span className="text-[10px] text-slate-400">BPM</span></p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Blood Pressure</p>
                  <p className="font-black text-slate-700">{p.bp}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* IF NO RESULTS FOUND */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No patients found</h3>
          <p className="text-slate-400 font-medium max-w-xs mx-auto">We couldn't find any results for "{search}". Try searching by Name or Hospital ID.</p>
        </div>
      )}

      <PatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        patient={selectedPatient} 
      />
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
      </div>
    </div>
  );
}