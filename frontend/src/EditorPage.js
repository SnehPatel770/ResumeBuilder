import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { useTemplate } from './contexts/TemplateContext';
import Header from './components/Header/Header';
import TemplateSelector from './components/TemplateSelector/TemplateSelector';
import './pages/EditorPage/EditorPage.css';

const EditorPage = () => {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const { getCurrentTemplate, selectTemplate } = useTemplate();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      title: 'Software Developer'
    },
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development.',
    experience: [
      {
        title: 'Senior Software Developer',
        company: 'Tech Corp',
        duration: '2022 - Present',
        description: 'Led development of web applications using React and Node.js'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Computer Science',
        school: 'University of Technology',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
  });

  const currentTemplate = getCurrentTemplate();

  if (!user) {
    return (
      <>
        <Header />
        <div className={`editor-auth ${theme}`}>
          <div className="auth-prompt">
            <h2>Sign in to continue</h2>
            <p>Please sign in with Google to access the resume editor.</p>
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
      <div className={`editor-container ${theme}`}>
        <div className="editor-sidebar">
          <h3>Resume Sections</h3>
          <div className="section-list">
            <button className="section-btn active">Personal Info</button>
            <button className="section-btn">Experience</button>
            <button className="section-btn">Education</button>
            <button className="section-btn">Skills</button>
            <button className="section-btn">Projects</button>
          </div>
        </div>
        
        <div className="editor-main">
          <div className="editor-header">
            <h2>Resume Editor</h2>
            <div className="editor-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
              >
                Change Template
              </button>
              <button className="btn-secondary">Preview</button>
              <button className="btn-primary">Save</button>
            </div>
          </div>
          
          {showTemplateSelector && (
            <div className="template-selector-overlay">
              <div className="template-selector-modal">
                <div className="modal-header">
                  <h3>Choose Template</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setShowTemplateSelector(false)}
                  >
                    ✕
                  </button>
                </div>
                <TemplateSelector 
                  onTemplateSelect={(templateId) => {
                    selectTemplate(templateId);
                    setShowTemplateSelector(false);
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="editor-content">
            <div className="editor-form">
              <h3>Edit Resume Content</h3>
              <div className="form-section">
                <h4>Personal Information</h4>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                    })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="editor-preview">
          <div className="preview-header">
            <h3>Preview - {currentTemplate.name}</h3>
            <span className="template-category">{currentTemplate.category}</span>
          </div>
          <div 
            className="resume-preview"
            style={{
              '--template-primary': currentTemplate.colors.primary,
              '--template-secondary': currentTemplate.colors.secondary,
              '--template-accent': currentTemplate.colors.accent,
              '--template-background': currentTemplate.colors.background,
              '--template-text': currentTemplate.colors.text
            }}
          >
            <div className={`resume-template template-${currentTemplate.id}`}>
              <div className="resume-header">
                <h1>{resumeData.personalInfo.name}</h1>
                <p className="resume-title">{resumeData.personalInfo.title}</p>
                <div className="contact-info">
                  <span>{resumeData.personalInfo.email}</span>
                  <span>{resumeData.personalInfo.phone}</span>
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              </div>
              
              <div className="resume-section">
                <h3>Professional Summary</h3>
                <p>{resumeData.summary}</p>
              </div>
              
              <div className="resume-section">
                <h3>Experience</h3>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4>{exp.title}</h4>
                    <p className="company">{exp.company} • {exp.duration}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="resume-section">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4>{edu.degree}</h4>
                    <p>{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </div>
              
              <div className="resume-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPage;
