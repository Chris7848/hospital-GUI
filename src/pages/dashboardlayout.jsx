import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
// Added 'User' to the imports below
import { Menu, Bell, Search, GraduationCap, User } from 'lucide-react';

export default function DashboardLayout({ children, userRole, title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('activeUser'));
    if (!user) {
      navigate('/login');
    } else {
      setActiveUser(user);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 1. Sidebar - Ensure the component name is capitalized if the file is 'Sidebar.jsx' */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        userRole={userRole || activeUser?.role} 
        navigate={navigate} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Top Navigation Bar */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-20">
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-50 rounded-xl lg:hidden transition-colors"
            >
              <Menu size={24} className="text-slate-600" />
            </button>

            {/* ABUAD Branding in Nav (Mobile Only) */}
            <div className="flex lg:hidden items-center gap-2 text-[#0F766E]">
               <GraduationCap size={24} />
            </div>

            <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight truncate">
              {title || "Clinical Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Global Search Bar */}
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 group focus-within:border-[#0F766E] focus-within:bg-white transition-all">
              <Search size={18} className="text-slate-400 group-focus-within:text-[#0F766E]" />
              <input 
                type="text" 
                placeholder="Global Registry Search..." 
                className="bg-transparent border-none outline-none ml-3 text-sm lg:w-72 font-medium" 
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-slate-400 hover:text-[#0F766E] hover:bg-teal-50 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile Action */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
              <div className="hidden md:block text-right">
                <p className="text-xs font-black text-slate-800 uppercase tracking-tighter leading-tight">
                  {activeUser?.name || "Staff User"}
                </p>
                <p className="text-[9px] font-bold text-[#0F766E] uppercase tracking-[0.2em]">
                  {activeUser?.role || "Authorized"}
                </p>
              </div>
              
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-teal-900/20 hover:scale-105 active:scale-95 transition-all overflow-hidden"
              >
                {/* Fixed the missing User reference here */}
                {activeUser?.name ? activeUser.name[0].toUpperCase() : <User size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}