import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, EyeOff, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Simulate a short delay for a professional feel
    setTimeout(() => {
      try {
        // 2. Access the temporary "Database" 
        const existingUsers = JSON.parse(sessionStorage.getItem('temp_db_users') || '[]');

        // 3. Authenticate against the temporary session storage
        const userFound = existingUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (userFound) {
          // 4. Update Global Auth State
          if (setUser) {
            setUser({
              isAuthenticated: true,
              role: userFound.role,
              name: userFound.name
            });
          }

          // 5. Save the active session
          sessionStorage.setItem('activeUser', JSON.stringify(userFound));

          // 6. Navigate to the specific ABUAD dashboard
          // Matches the dynamic routes: /doctor-dashboard, /nurse-dashboard, etc.
          navigate(`/${userFound.role}-dashboard`);
          
        } else {
          setError('Access Denied. Please check your institutional credentials.');
        }
      } catch (err) {
        setError('An error occurred during authentication.');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-white lg:bg-slate-50 font-sans">
      
      {/* LEFT SIDE: ABUAD BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F766E] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="text-center text-white relative z-10">
          <GraduationCap size={70} className="mx-auto mb-6 text-teal-300" />
          <h1 className="text-5xl font-black tracking-tighter">ABUAD</h1>
          <p className="text-teal-100/70 mt-2 text-xl font-medium">Multisystem Hospital</p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-teal-200/50 uppercase tracking-[0.3em] font-bold">Secure Staff Portal</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Enter your ABUAD credentials</p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl text-sm font-bold">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="Institutional Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-100 bg-slate-50 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-100 bg-slate-50 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                  <EyeOff size={18} />
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#0F766E] text-white py-5 rounded-2xl font-black shadow-xl shadow-teal-900/20 hover:bg-[#0D665F] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
              {!loading && <ArrowRight size={20} />}
            </button>

            <div className="flex flex-col items-center gap-6 mt-10">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} />
                ABUAD Encrypted Session
              </div>
              
              <p className="text-sm font-bold text-slate-500">
                New staff member? 
                <button 
                  type="button"
                  onClick={() => navigate('/select-role')} 
                  className="text-[#0F766E] ml-2 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}