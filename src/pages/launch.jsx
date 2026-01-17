import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, ShieldCheck, Heart, Lock } from 'lucide-react';

export default function Launch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F766E] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* 1. CLEAN BACKGROUND ELEMENTS */}
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-7xl px-12 md:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-16 z-10">
        
        {/* LEFT: ABUAD BRANDING */}
        <div className="flex-1 text-center lg:text-left space-y-10">
          <div className="inline-flex bg-white/10 p-5 rounded-3xl backdrop-blur-sm border border-white/20 lg:mx-0">
            {/* Logo changed to GraduationCap */}
            <GraduationCap size={48} className="text-white" />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight">
              ABUAD <br />
              <span className="text-teal-300">Multisystem</span> <br />
              Hospital.
            </h1>
            <p className="text-teal-50/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience the pinnacle of clinical excellence and medical education. Secure, research-driven, and patient-centered.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 text-teal-200/50 text-xs font-black uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure</div>
            <div className="flex items-center gap-2"><Lock size={16} /> Encrypted</div>
            <div className="flex items-center gap-2"><Heart size={16} /> Certified</div>
          </div>
        </div>

        {/* RIGHT: ACTION CARD */}
        <div className="w-full max-w-md">
          <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-none border-none relative">
            
            <div className="space-y-10">
              <div className="text-center lg:text-left space-y-2">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Access Portal</h2>
                <p className="text-slate-400 font-medium">Clinical & Academic secure login</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/select-role')}
                  className="w-full bg-[#0F766E] text-white font-bold py-5 rounded-2xl hover:bg-[#0D665F] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
                >
                  Get Started
                  <ArrowRight size={22} />
                </button>
                
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-600 font-bold py-5 rounded-2xl hover:bg-slate-100 transition-all text-lg"
                >
                  Sign In
                </button>
              </div>

              <div className="pt-8 flex items-center justify-center gap-3 opacity-30">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                  AMSH Multisystem Health Network
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}