import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert, CheckCircle, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, error, clearError, loading, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => clearError();
  }, [user, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');

    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      setSuccessMsg('Authentication successful! Accessing gateway...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="w-full max-w-md relative group">
        {/* Glow behind the card */}
        <div className="glow-indigo"></div>

        <div className="glass-panel rounded-2xl p-8 relative flex flex-col w-full z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
              Welcome to AuthSphere
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Secure Gateway Access
            </p>
          </div>

          {/* Messages */}
          {localError && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{localError}</span>
            </div>
          )}

          {error && !localError && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-11"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  Password
                </label>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button-primary flex items-center justify-center gap-2 group/btn mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></div>
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 text-indigo-200 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-slate-400">
            No access credential yet?{' '}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline decoration-indigo-500/50 underline-offset-4 hover:decoration-indigo-400 transition-all duration-300"
            >
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
