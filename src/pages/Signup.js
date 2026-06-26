import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, UserPlus, ShieldAlert, CheckCircle, ShieldCheck } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { signup, error, clearError, loading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
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

    // Client-side Validations
    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please complete all form fields.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      setSuccessMsg('Account registered successfully! Welcome aboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="w-full max-w-md relative group">
        <div className="glow-indigo"></div>

        <div className="glass-panel rounded-2xl p-8 relative flex flex-col w-full z-10">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
              Create Credentials
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Join the Secure Network
            </p>
          </div>

          {/* Feedback Messages */}
          {localError && (
            <div className="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{localError}</span>
            </div>
          )}

          {error && !localError && (
            <div className="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 flex items-start gap-3 text-sm animate-fadeIn">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input pl-11"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-11"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="•••••••• (Min 6 chars)"
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
              
              {/* Password indicator */}
              {password && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <div className={`h-1 w-12 rounded-full transition-all duration-300 ${password.length >= 6 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                  <span className={password.length >= 6 ? 'text-emerald-400' : 'text-rose-400'}>
                    {password.length >= 6 ? 'Passes length check' : 'Must be 6+ characters'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full glass-input pl-11 ${
                    confirmPassword && (password === confirmPassword ? 'border-emerald-800 focus:ring-emerald-500/50' : 'border-rose-800 focus:ring-rose-500/50')
                  }`}
                  required
                />
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
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 text-indigo-200 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline decoration-indigo-500/50 underline-offset-4 hover:decoration-indigo-400 transition-all duration-300"
            >
              Authenticate here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
