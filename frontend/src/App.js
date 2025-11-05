import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { TemplateProvider } from './contexts/TemplateContext';
import Layout from './components/Layout/Layout';
import HomePage from './HomePage';
import EditorPage from './EditorPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ThemesPage from './pages/ThemesPage/ThemesPage';
import TemplatesPage from './pages/TemplatesPage/TemplatesPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TemplateProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/themes" element={<ThemesPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
              </Routes>
            </Layout>
          </Router>
        </TemplateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
