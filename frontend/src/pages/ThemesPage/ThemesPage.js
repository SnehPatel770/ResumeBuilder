import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header/Header';
import ThemePreview from '../../components/ThemePreview/ThemePreview';
import './ThemesPage.css';

const ThemesPage = () => {
  const { theme, getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();

  return (
    <>
      <Header />
      <div className={`themes-page ${theme}`}>
        <div className="themes-hero">
          <h1>Customize Your Experience</h1>
          <p>Choose from our collection of beautiful themes to personalize your resume builder</p>
          <div className="current-theme-info">
            <span>Current Theme: <strong>{currentTheme.name}</strong></span>
          </div>
        </div>
        
        <ThemePreview />
        
        <div className="theme-features">
          <h3>Theme Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h4>Dynamic Colors</h4>
              <p>Each theme includes carefully selected color palettes that work across all components</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌊</div>
              <h4>Animated Backgrounds</h4>
              <p>Beautiful Vanta.js animations that adapt to each theme's color scheme</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h4>Responsive Design</h4>
              <p>All themes look great on desktop, tablet, and mobile devices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h4>Persistent Settings</h4>
              <p>Your theme preference is saved and restored when you return</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemesPage;