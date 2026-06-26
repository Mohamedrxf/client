import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShieldCheck, Key, Database, Cpu, Globe, Server, Activity, Copy, Check } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);

  // Retrieve token from LocalStorage to display and inspect
  const token = localStorage.getItem('token') || '';

  // Decode JWT payload helper
  const decodeToken = () => {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      return { header, payload };
    } catch (e) {
      console.error('Failed decoding token', e);
      return null;
    }
  };

  const decoded = decodeToken();

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Navbar */}
      <nav className="glass-panel border-x-0 border-t-0 py-4 px-6 md:px-12 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
              AuthSphere
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
              Secure Session
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5 active:scale-95 transition-all duration-300 cursor-pointer text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Disconnect Gateway</span>
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 z-10">
        
        {/* Left: User Profile Dashboard Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
            {/* Background spotlight */}
            <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>

            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-5">
              Active User Identity
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{user?.name}</h2>
                <p className="text-xs text-indigo-400 font-medium">Session Operator</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800/60 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Database ID:</span>
                <span className="font-mono text-slate-200 select-all">{user?.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Email Address:</span>
                <span className="text-slate-200 select-all">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Registered:</span>
                <span className="text-slate-200">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Server Status</span>
              </div>
              <span className="text-lg font-bold text-emerald-400">ONLINE</span>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Activity className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Protocol</span>
              </div>
              <span className="text-lg font-bold text-indigo-400 font-mono">JWT-SHA256</span>
            </div>
          </div>
        </div>

        {/* Right: JWT Debugger / Console view (Takes 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  JWT Session Signature Token
                </h3>
              </div>
              
              <button
                onClick={handleCopyToken}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Raw Token'}</span>
              </button>
            </div>

            {/* Token String Preview */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 font-mono text-xs break-all max-h-24 overflow-y-auto mb-6 scrollbar-thin text-slate-400 select-all leading-relaxed">
              {token.split('.').map((part, i) => {
                const colors = ['text-indigo-400', 'text-violet-400', 'text-slate-500'];
                return (
                  <span key={i} className={colors[i]}>
                    {part}{i < 2 ? '.' : ''}
                  </span>
                );
              })}
            </div>

            {/* Decoded Token Fields */}
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Client Decoded Token Structure
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {/* Header Card */}
              <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 flex flex-col">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-900 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Token Header (JWT Meta)</span>
                </div>
                <pre className="font-mono text-xs text-indigo-200 flex-1 overflow-x-auto">
                  {JSON.stringify(decoded?.header || { alg: 'HS256', typ: 'JWT' }, null, 2)}
                </pre>
              </div>

              {/* Payload Card */}
              <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 flex flex-col">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-900 text-violet-400 font-semibold text-xs uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>Token Payload (Claims)</span>
                </div>
                <pre className="font-mono text-xs text-violet-200 flex-1 overflow-x-auto">
                  {JSON.stringify(decoded?.payload || { id: user?.id, name: user?.name, email: user?.email }, null, 2)}
                </pre>
              </div>
            </div>

            {/* JWT Note Alert */}
            <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-3 text-xs text-slate-400">
              <Globe className="w-4 h-4 text-slate-500 mt-0.5" />
              <p>
                This signature payload is encrypted on the server side using your <code className="text-slate-200">JWT_SECRET</code>. 
                Any client-side manipulation of this session token instantly invalidates server authorization requests.
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
