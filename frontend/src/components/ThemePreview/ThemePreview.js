import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemePreview.css';

const ThemePreview = () => {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="theme-preview">
      <h3>Choose Your Theme</h3>
      <div className="theme-grid">
        {Object.entries(themes).map(([key, themeData]) => (
          <div
            key={key}
            className={`theme-card ${key === theme ? 'active' : ''}`}
            onClick={() => setTheme(key)}
            style={{
              '--preview-bg': themeData.colors.primary,
              '--preview-secondary': themeData.colors.secondary,
              '--preview-accent': themeData.colors.accent,
              '--preview-text': themeData.colors.textPrimary
            }}
          >
            <div className="theme-preview-header">
              <div className="theme-preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="theme-preview-content">
              <div className="theme-preview-sidebar"></div>
              <div className="theme-preview-main">
                <div className="theme-preview-line"></div>
                <div className="theme-preview-line short"></div>
                <div className="theme-preview-button"></div>
              </div>
            </div>
            <div className="theme-info">
              <span className="theme-name">{themeData.name}</span>
              {key === theme && <span className="theme-active">✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePreview;