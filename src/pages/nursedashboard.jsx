import React, { useState, useEffect } from 'react';
import { Activity, Clock, Plus, Search, Thermometer, CheckCircle2, HeartPulse, Filter } from 'lucide-react';
import DashboardLayout from './dashboardlayout'; 
import { mockDatabase } from '../data/db'; 
import PatientModal from './patientmodel';

export default function NurseDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nurseName, setNurseName] = useState('Nurse');

  // Load actual nurse name from session
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('activeUser'));
    if (user && user.name) setNurseName(user.name);
  }, []);

  // SEARCH LOGIC: Filter by Name, ID, or Room Number
  const filteredPatients = mockDatabase.patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.room.includes(searchTerm)
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout userRole="nurse" title="Nursing Station">
      
      {/* 1. WELCOME & QUICK SEARCH STRIP */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Shift Overview</h1>
          <p className="text-[#0F766E] font-bold text-xs uppercase tracking-[0.2em] mt-1">Ward B • General Wing • Floor 2</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" size={18} />
            <input
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#0F766E] shadow-sm transition-all font-medium text-sm text-slate-700"
              placeholder="Quick find by room or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-[#0F766E] transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 2. MAIN WARD MONITORING GRID */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Activity className="text-[#0F766E]" size={20} /> Live Triage Monitor
            </h2>
            <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">
              {filteredPatients.length} Patients Shown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id} 
                onClick={() => handlePatientClick(patient)} 
                className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-[#0F766E]/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                {/* Status Indicator Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${patient.status === 'Critical' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="pl-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Room {patient.room}</p>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#0F766E] transition-colors leading-tight">{patient.name}</h3>
                  </div>
                  <div className={`p-2 rounded-xl ${patient.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    <HeartPulse size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pl-2">
                  <VitalsCard label="Heart Rate" value={`${patient.hr} BPM`} color="rose" />
                  <VitalsCard label="Temp" value={patient.temp} color="amber" />
                </div>
              </div>
            ))}

            {/* Empty Search State */}
            {filteredPatients.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-bold italic">No patients found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. SHIFT AGENDA SIDEBAR */}
        <aside className="space-y-6">
           <h2 className="text-xl font-bold text-slate-800 tracking-tight">Shift Agenda</h2>
           <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-8">
              <div className="flex items-center justify-between bg-amber-50/50 p-5 rounded-3xl border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 p-2.5 rounded-xl text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-amber-600 tracking-widest">Next Meds Round</p>
                    <p className="font-bold text-slate-800 text-sm">Room 302 • 12:00 PM</p>
                  </div>
                </div>
                <CheckCircle2 className="text-slate-200" size={24} />
              </div>

              <div className="space-y-5">
                <AgendaItem time="22:00" task="Initial Round Checks" done />
                <AgendaItem time="00:00" task="Vital Signs Batch" />
                <AgendaItem time="02:00" task="IV Fluid Review" />
                <AgendaItem time="04:00" task="Pre-Morning Prep" />
              </div>

              <button className="w-full bg-[#0F766E] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-teal-900/20 hover:scale-[1.02] transition-all">
                Add Shift Note
              </button>
           </div>
        </aside>
      </div>

      <PatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        patient={selectedPatient} 
      />
    </DashboardLayout>
  );
}

// Helper Components
function VitalsCard({ label, value, color }) {
  const colorMap = {
    rose: 'text-rose-600 bg-rose-50',
    amber: 'text-amber-600 bg-amber-50'
  };
  return (
    <div className={`p-4 rounded-2xl ${colorMap[color]} flex flex-col`}>
      <span className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</span>
      <span className="font-black text-sm">{value}</span>
    </div>
  );
}

function AgendaItem({ time, task, done = false }) {
  return (
    <div className="flex items-center gap-4 group">
      <span className={`text-xs font-black ${done ? 'text-slate-300 line-through' : 'text-slate-400'}`}>{time}</span>
      <div className={`h-10 w-0.5 ${done ? 'bg-slate-100' : 'bg-[#0F766E]'} rounded-full`} />
      <span className={`text-sm font-bold ${done ? 'text-slate-300' : 'text-slate-600'}`}>{task}</span>
      {done && <CheckCircle2 size={16} className="ml-auto text-emerald-500" />}
    </div>
  );
}