import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, themes, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const getThemeIcon = (themeName) => {
    const icons = {
      dark: '🌙',
      midnight: '🌌',
      ocean: '🌊',
      sunset: '🌅',
      forest: '🌲',
      carbon: '⚫',
      neon: '💜',
      slate: '🌫️'
    };
    return icons[themeName] || '🎨';
  };

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
    setShowDropdown(false);
  };

  return (
    <div className="theme-selector">
      {/* Theme dropdown */}
      <div className="theme-dropdown">
        <button 
          className={`theme-dropdown-btn ${theme}`}
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="Select theme"
          title="Select theme"
        >
          🎨
        </button>
        
        {showDropdown && (
          <div className="theme-dropdown-menu">
            <div className="theme-dropdown-header">
              <span>Choose Theme</span>
            </div>
            {Object.entries(themes).map(([key, themeData]) => (
              <button
                key={key}
                className={`theme-option ${key === theme ? 'active' : ''}`}
                onClick={() => handleThemeSelect(key)}
                style={{
                  '--theme-accent': themeData.colors.accent,
                  '--theme-bg': themeData.colors.secondary
                }}
              >
                <span className="theme-icon">{getThemeIcon(key)}</span>
                <span className="theme-name">{themeData.name}</span>
                {key === theme && <span className="theme-check">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;