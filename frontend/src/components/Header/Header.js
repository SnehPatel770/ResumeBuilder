import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = () => {
  const { user, login, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      login();
    }
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>Resume Builder</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/templates" className="nav-link">Templates</Link>
          {/* <Link to="/themes" className="nav-link">Themes</Link> */}
          {user && <Link to="/editor" className="nav-link">Editor</Link>}
          {user && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          
          {user ? (
            <div className="user-menu">
              <img src={user.picture} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              <button onClick={handleAuthAction} className="auth-button logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button login">
                Login
              </Link>
              <Link to="/signup" className="auth-button signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;