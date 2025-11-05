import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Layout.css';

const Layout = ({ children }) => {

  const { theme } = useTheme();

  return (
    <div className={`layout ${theme}`}>
      <div className="vanta-background"></div>
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;