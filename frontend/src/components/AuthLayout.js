import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AuthLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="auth-page-bg flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-transparent relative z-10">
        <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
