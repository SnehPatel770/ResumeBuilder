import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState({
    totalResumes: 0,
    lastModified: null,
    templatesUsed: 0
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user]);

  const loadResumes = () => {
    try {
      // Security: Clean up old shared keys on load
      const userId = user?.id || 'demo';
      if (userId !== 'demo') {
        // Only clean up for logged-in users to prevent data loss
        localStorage.removeItem('resumeData');
        localStorage.removeItem('currentResumeId');
      }
      
      // Load resumes from localStorage (user-specific)
      const savedResumes = localStorage.getItem(`resumes_${userId}`);
      if (savedResumes) {
        const parsedResumes = JSON.parse(savedResumes);
        setResumes(parsedResumes);
        
        // Calculate stats
        setStats({
          totalResumes: parsedResumes.length,
          lastModified: parsedResumes.length > 0 
            ? new Date(Math.max(...parsedResumes.map(r => new Date(r.updatedAt))))
            : null,
          templatesUsed: new Set(parsedResumes.map(r => r.template)).size
        });
      } else {
        // Check for single resume data (legacy) - user-specific only
        const userId = user?.id || 'demo';
        const singleResume = localStorage.getItem(`resumeData_${userId}`);
        if (singleResume) {
          const resume = {
            id: Date.now(),
            title: 'My Resume',
            data: JSON.parse(singleResume),
            template: 'modern',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setResumes([resume]);
          saveResumes([resume]);
          setStats({
            totalResumes: 1,
            lastModified: new Date(),
            templatesUsed: 1
          });
          // Clean up old shared key if it exists (security)
          localStorage.removeItem('resumeData');
          localStorage.removeItem('currentResumeId');
        }
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
    }
  };

  const saveResumes = (resumesList) => {
    try {
      localStorage.setItem(`resumes_${user?.id || 'demo'}`, JSON.stringify(resumesList));
    } catch (error) {
      console.error('Error saving resumes:', error);
    }
  };

  const handleCreateNew = () => {
    const userId = user?.id || 'demo';
    // Clear any existing resume data to start fresh (user-specific keys)
    localStorage.removeItem(`currentResumeId_${userId}`);
    localStorage.removeItem(`resumeData_${userId}`);
    navigate('/editor');
  };

  const handleEditResume = (resumeId) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      const userId = user?.id || 'demo';
      // Load resume data into editor (user-specific keys)
      localStorage.setItem(`currentResumeId_${userId}`, resumeId);
      localStorage.setItem(`resumeData_${userId}`, JSON.stringify(resume.data));
      navigate('/editor');
    }
  };

  const handleDeleteResume = (resumeId) => {
    const updatedResumes = resumes.filter(r => r.id !== resumeId);
    setResumes(updatedResumes);
    saveResumes(updatedResumes);
    setShowDeleteConfirm(null);
    
    // Update stats
    setStats({
      totalResumes: updatedResumes.length,
      lastModified: updatedResumes.length > 0 
        ? new Date(Math.max(...updatedResumes.map(r => new Date(r.updatedAt))))
        : null,
      templatesUsed: new Set(updatedResumes.map(r => r.template)).size
    });
  };

  const handleDuplicateResume = (resumeId) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      const newResume = {
        ...resume,
        id: Date.now(),
        title: `${resume.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedResumes = [...resumes, newResume];
      setResumes(updatedResumes);
      saveResumes(updatedResumes);
      
      setStats(prev => ({
        ...prev,
        totalResumes: updatedResumes.length
      }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-IN');
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className={`dashboard-container ${theme}`}>
          <div className="auth-prompt">
            <h2>Sign in to access your dashboard</h2>
            <p>Please sign in to view and manage your resumes.</p>
            <button onClick={login} className="auth-button">
              Sign in with Google
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={`dashboard-container ${theme}`}>
        <div className="dashboard-header">
          <h2>Welcome back, {user?.name}! 👋</h2>
          <p>Manage your resumes and track your progress</p>
        </div>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <h3>{stats.totalResumes}</h3>
              <p>Total Resumes</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎨</div>
            <div className="stat-info">
              <h3>{stats.templatesUsed}</h3>
              <p>Templates Used</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.lastModified ? formatDate(stats.lastModified) : 'Never'}</h3>
              <p>Last Modified</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn primary" onClick={handleCreateNew}>
            ➕ Create New Resume
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/templates')}>
            🎨 Browse Templates
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/themes')}>
            🌈 Explore Themes
          </button>
        </div>

        {/* Resumes List */}
        <div className="resumes-section">
          <div className="section-header">
            <h3>My Resumes</h3>
            {resumes.length > 0 && (
              <span className="resume-count">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {resumes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No resumes yet</h3>
              <p>Create your first professional resume in minutes</p>
              <button className="create-first-btn" onClick={handleCreateNew}>
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className="resumes-grid">
              {resumes.map((resume) => (
                <div key={resume.id} className="resume-card">
                  <div className="resume-preview">
                    <div className="preview-placeholder">
                      <span className="preview-icon">📄</span>
                      <span className="preview-text">Resume Preview</span>
                    </div>
                  </div>
                  
                  <div className="resume-info">
                    <h4>{resume.title}</h4>
                    <p className="resume-meta">
                      <span>Updated {formatDate(resume.updatedAt)}</span>
                      <span className="template-badge">{resume.template || 'Modern'}</span>
                    </p>
                  </div>
                  
                  <div className="resume-actions">
                    <button 
                      className="resume-action-btn edit"
                      onClick={() => handleEditResume(resume.id)}
                      title="Edit Resume"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="resume-action-btn duplicate"
                      onClick={() => handleDuplicateResume(resume.id)}
                      title="Duplicate Resume"
                    >
                      📋 Duplicate
                    </button>
                    <button 
                      className="resume-action-btn delete"
                      onClick={() => setShowDeleteConfirm(resume.id)}
                      title="Delete Resume"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Delete Resume?</h3>
              <p>Are you sure you want to delete this resume? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  className="modal-btn cancel"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn delete"
                  onClick={() => handleDeleteResume(showDeleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;