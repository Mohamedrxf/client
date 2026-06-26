import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative flex flex-col items-center">
          {/* Outer glowing ring */}
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin mb-4"></div>
          
          {/* Pulsing inner dot */}
          <div className="w-3 h-3 bg-violet-500 rounded-full absolute top-[26px] animate-ping"></div>

          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent animate-pulse">
            Verifying Credentials...
          </h2>
          <p className="text-sm text-slate-500 mt-1">AuthSphere Gateway</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
