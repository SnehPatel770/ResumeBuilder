import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header/Header';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <div className={`dashboard-container ${theme}`}>
        <div className="dashboard-header">
          <h2>Welcome back, {user?.name}!</h2>
          <p>Manage your resumes and track your applications</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My Resumes</h3>
            <p>0 resumes created</p>
            <button className="card-action">Create New Resume</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>No recent activity</p>
            <button className="card-action">View All</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Templates</h3>
            <p>Browse professional templates</p>
            <button className="card-action">Explore Templates</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;