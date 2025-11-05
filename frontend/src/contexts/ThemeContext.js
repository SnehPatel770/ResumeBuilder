import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      accent: '#3fa6ff',
      textPrimary: '#ffffff',
      textSecondary: '#b0b0b0',
      border: 'rgba(255, 255, 255, 0.1)',
      vantaColor: 0x3fa6ff,
      vantaBg: 0x0a0a0a
    }
  },
  midnight: {
    name: 'Midnight',
    colors: {
      primary: '#0d1117',
      secondary: '#161b22',
      accent: '#58a6ff',
      textPrimary: '#f0f6fc',
      textSecondary: '#8b949e',
      border: 'rgba(240, 246, 252, 0.1)',
      vantaColor: 0x58a6ff,
      vantaBg: 0x0d1117
    }
  },
  ocean: {
    name: 'Ocean Dark',
    colors: {
      primary: '#001122',
      secondary: '#002244',
      accent: '#00d4ff',
      textPrimary: '#e6f7ff',
      textSecondary: '#91d5ff',
      border: 'rgba(230, 247, 255, 0.1)',
      vantaColor: 0x00d4ff,
      vantaBg: 0x001122
    }
  },
  sunset: {
    name: 'Sunset Dark',
    colors: {
      primary: '#2d1b69',
      secondary: '#3d2777',
      accent: '#ff6b6b',
      textPrimary: '#ffffff',
      textSecondary: '#d4a4ff',
      border: 'rgba(255, 255, 255, 0.1)',
      vantaColor: 0xff6b6b,
      vantaBg: 0x2d1b69
    }
  },
  forest: {
    name: 'Forest Dark',
    colors: {
      primary: '#0f2027',
      secondary: '#203a43',
      accent: '#4caf50',
      textPrimary: '#e8f5e8',
      textSecondary: '#a8d8a8',
      border: 'rgba(232, 245, 232, 0.1)',
      vantaColor: 0x4caf50,
      vantaBg: 0x0f2027
    }
  },
  carbon: {
    name: 'Carbon',
    colors: {
      primary: '#1e1e1e',
      secondary: '#2d2d2d',
      accent: '#ff9500',
      textPrimary: '#ffffff',
      textSecondary: '#cccccc',
      border: 'rgba(255, 255, 255, 0.15)',
      vantaColor: 0xff9500,
      vantaBg: 0x1e1e1e
    }
  },
  neon: {
    name: 'Neon Dark',
    colors: {
      primary: '#0a0a0a',
      secondary: '#1a0a1a',
      accent: '#ff00ff',
      textPrimary: '#ffffff',
      textSecondary: '#ff66ff',
      border: 'rgba(255, 0, 255, 0.2)',
      vantaColor: 0xff00ff,
      vantaBg: 0x0a0a0a
    }
  },
  slate: {
    name: 'Slate',
    colors: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#38bdf8',
      textPrimary: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: 'rgba(241, 245, 249, 0.1)',
      vantaColor: 0x38bdf8,
      vantaBg: 0x0f172a
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // If saved theme is 'light', switch to 'dark'
    if (savedTheme === 'light') {
      return 'dark';
    }
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Apply CSS custom properties
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--bg-primary', `rgba(${hexToRgb(theme.colors.primary)}, 0.9)`);
      root.style.setProperty('--bg-secondary', `rgba(${hexToRgb(theme.colors.secondary)}, 0.8)`);
      root.style.setProperty('--text-primary', theme.colors.textPrimary);
      root.style.setProperty('--text-secondary', theme.colors.textSecondary);
      root.style.setProperty('--accent-color', theme.colors.accent);
      root.style.setProperty('--border-color', theme.colors.border);
    }
  }, [currentTheme]);

  const hexToRgb = (hex) => {
    if (typeof hex === 'string' && hex.startsWith('#')) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '0, 0, 0';
    }
    return hex; // Return as is if not a hex string
  };

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const getCurrentTheme = () => themes[currentTheme];

  const value = {
    theme: currentTheme,
    themes,
    setTheme,
    getCurrentTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};