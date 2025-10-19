import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        {children}
      </div>

      {/* Branding/Image Section (visible on large screens) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-blue-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">ResumeBuilder</h1>
        <p className="text-xl text-blue-200">
          Craft your professional story, effortlessly.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;