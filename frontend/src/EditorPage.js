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
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      title: 'Software Developer'
    },
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development, passionate about creating innovative solutions and leading high-performing teams.',
    experience: [
      {
        id: 1,
        title: 'Senior Software Developer',
        company: 'Tech Corp',
        duration: '2022 - Present',
        description: 'Led development of web applications using React and Node.js. Managed a team of 5 developers and improved application performance by 40%.'
      },
      {
        id: 2,
        title: 'Software Developer',
        company: 'StartupXYZ',
        duration: '2020 - 2022',
        description: 'Developed full-stack applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality products.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Computer Science',
        school: 'University of Technology',
        year: '2019',
        gpa: '3.8/4.0'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'AWS', 'Docker'],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: 'https://github.com/johndoe/ecommerce'
      }
    ]
  });

  const currentTemplate = getCurrentTemplate();

  const sections = [
    { id: 'personalInfo', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ];

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    updateResumeData('experience', [...resumeData.experience, newExp]);
  };

  const removeExperience = (id) => {
    updateResumeData('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      school: '',
      year: '',
      gpa: ''
    };
    updateResumeData('education', [...resumeData.education, newEdu]);
  };

  const removeEducation = (id) => {
    updateResumeData('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    updateResumeData('projects', [...resumeData.projects, newProject]);
  };

  const removeProject = (id) => {
    updateResumeData('projects', resumeData.projects.filter(proj => proj.id !== id));
  };

  const renderSectionForm = () => {
    const currentSection = sections.find(s => s.id === activeSection);
    
    switch (activeSection) {
      case 'personalInfo':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>Basic information that appears at the top of your resume</p>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Professional Title</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, title: e.target.value })}
                  placeholder="e.g., Software Developer"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group full-width">
                <label>Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, location: e.target.value })}
                  placeholder="City, State/Country"
                />
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>A brief overview of your professional background and key achievements</p>
            </div>
            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
                placeholder="Write a compelling summary of your professional experience, skills, and career objectives..."
                rows={6}
              />
              <small>Tip: Keep it concise (2-3 sentences) and highlight your most relevant qualifications.</small>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>Your work history and professional accomplishments</p>
              <button className="btn-primary" onClick={addExperience}>
                + Add Experience
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="experience-form">
                <div className="form-section-header">
                  <h4>Experience {index + 1}</h4>
                  {resumeData.experience.length > 1 && (
                    <button className="btn-danger" onClick={() => removeExperience(exp.id)}>
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item => 
                          item.id === exp.id ? { ...item, title: e.target.value } : item
                        );
                        updateResumeData('experience', updated);
                      }}
                      placeholder="e.g., Senior Software Developer"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item => 
                          item.id === exp.id ? { ...item, company: e.target.value } : item
                        );
                        updateResumeData('experience', updated);
                      }}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item => 
                          item.id === exp.id ? { ...item, duration: e.target.value } : item
                        );
                        updateResumeData('experience', updated);
                      }}
                      placeholder="e.g., Jan 2020 - Present"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item => 
                          item.id === exp.id ? { ...item, description: e.target.value } : item
                        );
                        updateResumeData('experience', updated);
                      }}
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>Your educational background and qualifications</p>
              <button className="btn-primary" onClick={addEducation}>
                + Add Education
              </button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="education-form">
                <div className="form-section-header">
                  <h4>Education {index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <button className="btn-danger" onClick={() => removeEducation(edu.id)}>
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => 
                          item.id === edu.id ? { ...item, degree: e.target.value } : item
                        );
                        updateResumeData('education', updated);
                      }}
                      placeholder="e.g., Bachelor of Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label>School/University</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => 
                          item.id === edu.id ? { ...item, school: e.target.value } : item
                        );
                        updateResumeData('education', updated);
                      }}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => 
                          item.id === edu.id ? { ...item, year: e.target.value } : item
                        );
                        updateResumeData('education', updated);
                      }}
                      placeholder="e.g., 2019 or 2015-2019"
                    />
                  </div>
                  <div className="form-group">
                    <label>GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => 
                          item.id === edu.id ? { ...item, gpa: e.target.value } : item
                        );
                        updateResumeData('education', updated);
                      }}
                      placeholder="e.g., 3.8/4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>Technical and professional skills relevant to your career</p>
            </div>
            <div className="skills-editor">
              <div className="skills-input">
                <label>Skills (Press Enter to add)</label>
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      const newSkills = [...resumeData.skills, e.target.value.trim()];
                      updateResumeData('skills', newSkills);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              <div className="skills-list">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span>{skill}</span>
                    <button 
                      onClick={() => {
                        const newSkills = resumeData.skills.filter((_, i) => i !== index);
                        updateResumeData('skills', newSkills);
                      }}
                      className="remove-skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="editor-form">
            <div className="form-header">
              <h3>{currentSection.icon} {currentSection.name}</h3>
              <p>Personal or professional projects that showcase your skills</p>
              <button className="btn-primary" onClick={addProject}>
                + Add Project
              </button>
            </div>
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="project-form">
                <div className="form-section-header">
                  <h4>Project {index + 1}</h4>
                  <button className="btn-danger" onClick={() => removeProject(project.id)}>
                    Remove
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item => 
                          item.id === project.id ? { ...item, name: e.target.value } : item
                        );
                        updateResumeData('projects', updated);
                      }}
                      placeholder="e.g., E-commerce Platform"
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Link (Optional)</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item => 
                          item.id === project.id ? { ...item, link: e.target.value } : item
                        );
                        updateResumeData('projects', updated);
                      }}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item => 
                          item.id === project.id ? { ...item, description: e.target.value } : item
                        );
                        updateResumeData('projects', updated);
                      }}
                      placeholder="Describe what the project does, your role, and key achievements..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Select a section to edit</div>;
    }
  };

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
            {sections.map(section => (
              <button 
                key={section.id}
                className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
          
          <div className="sidebar-actions">
            <button 
              className="btn-secondary full-width"
              onClick={() => setShowTemplateSelector(true)}
            >
              🎨 Change Template
            </button>
          </div>
        </div>
        
        <div className="editor-main">
          <div className="editor-header">
            <div className="header-info">
              <h2>Resume Editor</h2>
              <p>Currently editing: <strong>{sections.find(s => s.id === activeSection)?.name}</strong></p>
            </div>
            <div className="editor-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowPreview(true)}
              >
                👁️ Preview
              </button>
              <button className="btn-secondary">
                📄 Export PDF
              </button>
              <button className="btn-primary">
                💾 Save Resume
              </button>
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

          {showPreview && (
            <div className="preview-overlay">
              <div className="preview-modal">
                <div className="modal-header">
                  <h3>Resume Preview - {currentTemplate.name}</h3>
                  <div className="preview-actions">
                    <button className="btn-secondary" onClick={() => window.print()}>
                      🖨️ Print
                    </button>
                    <button 
                      className="close-btn"
                      onClick={() => setShowPreview(false)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="preview-content">
                  <div 
                    className="full-resume-preview"
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
                      
                      {resumeData.summary && (
                        <div className="resume-section">
                          <h3>Professional Summary</h3>
                          <p>{resumeData.summary}</p>
                        </div>
                      )}
                      
                      {resumeData.experience.length > 0 && (
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
                      )}
                      
                      {resumeData.education.length > 0 && (
                        <div className="resume-section">
                          <h3>Education</h3>
                          {resumeData.education.map((edu, index) => (
                            <div key={index} className="education-item">
                              <h4>{edu.degree}</h4>
                              <p>{edu.school} • {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {resumeData.skills.length > 0 && (
                        <div className="resume-section">
                          <h3>Skills</h3>
                          <div className="skills-list">
                            {resumeData.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {resumeData.projects.length > 0 && (
                        <div className="resume-section">
                          <h3>Projects</h3>
                          {resumeData.projects.map((project, index) => (
                            <div key={index} className="project-item">
                              <h4>{project.name}</h4>
                              <p>{project.description}</p>
                              {project.link && (
                                <p className="project-link">
                                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    View Project
                                  </a>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="editor-content">
            {renderSectionForm()}
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
              
              {resumeData.projects.length > 0 && (
                <div className="resume-section">
                  <h3>Projects</h3>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                      {project.link && (
                        <p className="project-link">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPage;
