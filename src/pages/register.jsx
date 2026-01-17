import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Lock, ShieldCheck, Calendar, GraduationCap } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [staffId, setStaffId] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  // Get role from previous page or localStorage
  useEffect(() => {
    const roleFromState = location.state?.role;
    const roleFromStorage = localStorage.getItem('role');
    const finalRole = roleFromState || roleFromStorage;

    if (!finalRole) {
      navigate('/select-role'); 
      return;
    }
    setRole(finalRole);
  }, [location, navigate]);

  if (!role) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      name,
      email,
      password,
      role,
      staffId: ['doctor', 'nurse', 'lab', 'pharmacy'].includes(role) ? staffId : null,
      dob: role === 'patient' ? dob : null,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      try {
        const existingUsers = JSON.parse(sessionStorage.getItem('temp_db_users') || '[]');
        const alreadyExists = existingUsers.find(u => u.email === email);
        
        if (alreadyExists) {
          throw new Error('This email is already registered in the ABUAD system.');
        }

        existingUsers.push(newUser);
        sessionStorage.setItem('temp_db_users', JSON.stringify(existingUsers));

        alert(`✅ Registration successful, ${name}! Redirecting to login.`);
        navigate('/login');
      } catch (err) {
        alert('❌ ' + err.message);
      } finally {
        setLoading(false);
      }
    }, 800); 
  };

  return (
    <div className="flex min-h-screen bg-white lg:bg-slate-50 font-sans">

      {/* LEFT SIDE: ABUAD BRANDING PANEL */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#0F766E] flex-col p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 text-xl font-black mb-20 relative z-10 tracking-tight">
          <GraduationCap size={32} className="text-teal-300" /> ABUAD Hospital
        </div>
        
        <div className="space-y-6 relative z-10 mt-auto">
          <div className="bg-white/10 p-4 rounded-3xl inline-block backdrop-blur-md border border-white/10">
            <ShieldCheck size={40} className="text-teal-200" />
          </div>
          <h1 className="text-4xl font-black leading-tight">
            Join the <br />
            <span className="capitalize text-teal-300">{role}</span> Team.
          </h1>
          <p className="text-teal-100/60 text-lg leading-relaxed font-medium">
            Register your credentials to access the ABUAD Multisystem clinical network.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-5 mb-10">
            <button 
              onClick={() => navigate('/select-role')} 
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors text-[#0F766E]"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Hospital Verification Portal</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full legal name"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@abuad.edu.ng"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Role-specific fields */}
            {['doctor', 'nurse', 'lab', 'pharmacy'].includes(role) && (
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0F766E] ml-4 mb-1 block">ABUAD Staff Credentials</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F766E]" size={20} />
                  <input
                    type="text"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder={role === 'doctor' ? 'Medical License ID' : 'Employee Staff ID'}
                    required
                    className="w-full bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-bold text-[#0F766E]"
                  />
                </div>
              </div>
            )}

            {role === 'patient' && (
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="MM / DD / YYYY"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Portal Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 focus:bg-white focus:border-[#0F766E] outline-none transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F766E] text-white font-bold py-5 rounded-2xl mt-8 shadow-xl shadow-teal-900/20 hover:bg-[#0D665F] hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? 'Submitting to Registry...' : 'Register as ABUAD Staff'}
            </button>
          </form>
          
          <p className="text-center mt-8 text-xs text-slate-400 font-medium">
            By registering, you agree to the <span className="text-[#0F766E] underline cursor-pointer">ABUAD Clinical Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}