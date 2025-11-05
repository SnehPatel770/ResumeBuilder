import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTemplate } from '../../contexts/TemplateContext';
import Header from '../../components/Header/Header';
import TemplateSelector from '../../components/TemplateSelector/TemplateSelector';
import './TemplatesPage.css';

const TemplatesPage = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const { selectTemplate } = useTemplate();
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    selectTemplate(templateId);
    
    // If user is not logged in, create a guest user
    if (!user) {
      const guestUser = {
        id: 'guest-user',
        email: 'guest@resumebuilder.com',
        name: 'Guest User',
        picture: 'https://ui-avatars.com/api/?name=Guest+User&background=3fa6ff&color=fff',
        token: 'guest-token'
      };
      
      setUser(guestUser);
      localStorage.setItem('user', JSON.stringify(guestUser));
    }
    
    // Navigate to editor with selected template
    navigate('/editor');
  };

  return (
    <>
      <Header />
      <div className={`templates-page ${theme}`}>
        <div className="templates-container">
          <div className="templates-hero">
            <h1>Professional Resume Templates</h1>
            <p>Choose from our collection of professionally designed templates to create your perfect resume</p>
          </div>
          
          <TemplateSelector onTemplateSelect={handleTemplateSelect} />
          
          <div className="templates-cta">
            <div className="cta-content">
              <h3>Ready to build your resume?</h3>
              <p>Select a template above and start creating your professional resume in minutes</p>
              <button 
                onClick={() => navigate('/editor')} 
                className="cta-button"
              >
                Start Building Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatesPage;