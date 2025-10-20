import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Form Section */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        {children}
      </div>

      {/* Branding/Image Section (visible on large screens) */}
      <div className="hidden lg:flex flex-col items-center justify-center auth-layout-branding p-12 text-center">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          ResumeBuilder
        </h1>
        <p className="text-xl text-gray-300">
          Craft your professional story, effortlessly.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
