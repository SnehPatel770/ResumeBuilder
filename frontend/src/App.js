import React from 'react';
import { Routes, Route } from 'react-router-dom';
// We'll assume HomePage is a simple landing page component
// import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import EditorPage from './EditorPage';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<div>Home Page - <a href="/login">Login</a></div>} /> {/* Placeholder for HomePage */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Route */}
      <Route path="/editor" element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
