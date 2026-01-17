import React, { useState } from 'react';
import { X, Activity, Thermometer, Droplets, Pill, FileText, Send, CheckCircle2 } from 'lucide-react';

export default function PatientModal({ isOpen, onClose, patient }) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'prescribe'
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !patient) return null;

  const handleAction = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setNote('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[650px] animate-in zoom-in-95 duration-300">
        
        {/* LEFT SIDE: ABUAD PATIENT PROFILE */}
        <div className="w-full md:w-1/3 bg-[#0F766E] p-8 text-white flex flex-col relative">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-4xl flex items-center justify-center text-3xl font-black backdrop-blur-xl border border-white/20 shadow-inner">
              {patient.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{patient.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="bg-teal-400/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-white/10">
                  {patient.id}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <VitalRow icon={<Activity size={16}/>} label="Heart Rate" value={`${patient.hr} BPM`} color="bg-rose-500" />
            <VitalRow icon={<Droplets size={16}/>} label="Blood Pressure" value={patient.bp} color="bg-blue-500" />
            <VitalRow icon={<Thermometer size={16}/>} label="Temperature" value={patient.temp} color="bg-amber-500" />
          </div>

          <div className="mt-auto pt-6">
             <p className="text-[10px] font-black text-teal-200/50 uppercase tracking-[0.2em] mb-2 text-center">Assigned Ward</p>
             <p className="text-center font-bold text-sm bg-white/5 py-2 rounded-xl border border-white/5">ABUAD Main • Room {patient.room}</p>
          </div>
        </div>

        {/* RIGHT SIDE: TABS & CLINICAL ACTIONS */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header & Tab Toggle */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              <TabBtn active={activeTab === 'history'} onClick={() => setActiveTab('history')} label="Medical History" icon={<FileText size={16}/>} />
              <TabBtn active={activeTab === 'prescribe'} onClick={() => setActiveTab('prescribe')} label="Prescribe" icon={<Pill size={16}/>} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
              <X size={24} className="text-slate-300 group-hover:text-rose-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            {activeTab === 'history' ? (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <InfoBlock label="Age / Gender" value={`${patient.age} / ${patient.gender}`} />
                  <InfoBlock label="Blood Type" value={patient.bloodType} />
                  <InfoBlock label="Contact" value={patient.contact} />
                </div>

                <div className="space-y-4">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle2 size={14} className="text-[#0F766E]" /> Recent Diagnosis
                   </h4>
                   <div className="space-y-3">
                      {patient.history.map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 font-medium flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                          {item}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAction} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Clinical Notes & Prescription</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                    placeholder="Type diagnosis or medication dosage here..."
                    className="w-full h-40 bg-slate-50 border border-slate-100 rounded-3xl p-5 outline-none focus:bg-white focus:border-[#0F766E] transition-all font-medium text-slate-700"
                  />
                </div>
                
                {success ? (
                  <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold animate-bounce">
                    <CheckCircle2 size={20} /> Prescribed Successfully
                  </div>
                ) : (
                  <button type="submit" className="w-full bg-[#0F766E] text-white py-5 rounded-2xl font-black shadow-lg shadow-teal-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Send size={18} /> Update Patient Record
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for clean code
function TabBtn({ active, onClick, label, icon }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
        active ? 'bg-white text-[#0F766E] shadow-sm' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function VitalRow({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className={`${color} p-2 rounded-lg text-white shadow-sm`}>{icon}</div>
        <span className="text-xs font-bold text-teal-50 tracking-tight">{label}</span>
      </div>
      <span className="font-black text-white">{value}</span>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-slate-800 font-bold text-sm">{value}</p>
    </div>
  );
}