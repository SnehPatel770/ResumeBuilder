import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTemplate } from '../../contexts/TemplateContext';
import Header from '../../components/Header/Header';
import TemplateSelector from '../../components/TemplateSelector/TemplateSelector';
import './EditorPage.css';
import './print.css';

const EditorPage = () => {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const { getCurrentTemplate, selectTemplate } = useTemplate();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [errors, setErrors] = useState({});
  const [previewWidth, setPreviewWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const isPreviewEditable = false; // Disabled editable preview
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      title: ''
    },
    summary: '',
    experience: [
      {
        id: 1,
        title: '',
        company: '',
        duration: '',
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        school: '',
        year: '',
        gpa: ''
      }
    ],
    skills: [],
    projects: []
  });

  const currentTemplate = getCurrentTemplate();

  // Load resume data when component mounts
  useEffect(() => {
    const loadResumeData = () => {
      try {
        const userId = user?.id || 'demo';
        
        // Check if we're editing an existing resume (user-specific key)
        const currentResumeId = localStorage.getItem(`currentResumeId_${userId}`);
        const savedResumeData = localStorage.getItem(`resumeData_${userId}`);
        
        if (savedResumeData) {
          const parsedData = JSON.parse(savedResumeData);
          
          // Merge with user data if available
          const loadedData = {
            ...parsedData,
            personalInfo: {
              ...parsedData.personalInfo,
              name: parsedData.personalInfo.name || user?.name || '',
              email: parsedData.personalInfo.email || user?.email || ''
            }
          };
          
          setResumeData(loadedData);
          console.log(`[${userId}] Resume data loaded:`, currentResumeId ? `Editing resume ${currentResumeId}` : 'New resume');
        } else if (user) {
          // If no saved data but user is logged in, pre-fill user info
          setResumeData(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              name: user.name || '',
              email: user.email || ''
            }
          }));
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    };

    loadResumeData();
  }, [user]);

  // Clear currentResumeId when creating new resume
  useEffect(() => {
    // If user navigates to editor without clicking edit, clear the ID
    const handleNewResume = () => {
      const userId = user?.id || 'demo';
      const currentPath = window.location.pathname;
      if (currentPath === '/editor' && !localStorage.getItem(`resumeData_${userId}`)) {
        localStorage.removeItem(`currentResumeId_${userId}`);
      }
    };

    handleNewResume();
  }, [user]);

  const sections = [
    { id: 'personalInfo', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateIndianPhone = (phone) => {
    // Accepts formats: +91 XXXXX XXXXX, +91-XXXXXXXXXX, 91XXXXXXXXXX, XXXXXXXXXX (10 digits)
    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePersonalInfo = (data) => {
    const newErrors = {};
    
    if (!data.name || data.name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!data.email || data.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (data.phone && !validateIndianPhone(data.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number (10 digits starting with 6-9)';
    }
    
    if (!data.title || data.title.trim() === '') {
      newErrors.title = 'Professional title is required';
    }
    
    return newErrors;
  };

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for this section when data is updated
    if (section === 'personalInfo') {
      const validationErrors = validatePersonalInfo(data);
      // Clear all personal info errors first, then set new ones
      setErrors(prev => {
        const newErrors = { ...prev };
        // Remove old personal info errors
        delete newErrors.name;
        delete newErrors.email;
        delete newErrors.phone;
        delete newErrors.title;
        // Add new validation errors (if any)
        return { ...newErrors, ...validationErrors };
      });
    }
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

  // AI Helper Functions
  const getAISuggestion = async (section, currentContent) => {
    setAiLoading(true);
    setShowAIHelper(true);
    setAiSuggestion('');
    
    try {
      const response = await fetch('http://localhost:8000/api/ai/suggest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          currentContent,
          userInfo: resumeData.personalInfo
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAiSuggestion(data.suggestion);
      } else if (response.status === 429) {
        setAiSuggestion('⚠️ Rate Limit Exceeded\n\nThe AI service has reached its request limit. This is common with free API tiers.\n\nPlease wait a few minutes and try again.\n\nTip: The Gemini API free tier allows 15 requests per minute.');
      } else if (response.status === 503) {
        setAiSuggestion('⚠️ Service Temporarily Overloaded\n\nThe AI service is experiencing high demand right now.\n\nPlease wait 30-60 seconds and try again.\n\nThis is temporary and will resolve shortly.');
      } else {
        setAiSuggestion(`⚠️ Error: ${data.error || 'Unable to generate suggestion. Please try again later.'}`);
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
      setAiSuggestion('⚠️ Connection Error\n\nUnable to connect to the AI service. Please check:\n- Backend server is running\n- Internet connection is active\n- Try again in a moment');
    } finally {
      setAiLoading(false);
    }
  };

  const applyAISuggestion = () => {
    if (activeSection === 'summary') {
      updateResumeData('summary', aiSuggestion);
    } else if (activeSection === 'skills') {
      const skillsArray = aiSuggestion.split(',').map(s => s.trim()).filter(s => s);
      updateResumeData('skills', skillsArray);
    }
    setShowAIHelper(false);
    setAiSuggestion('');
  };

  // Handle preview resize
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth <= 800) {
        setPreviewWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('resizing');
    };

    if (isResizing) {
      document.body.classList.add('resizing');
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.body.classList.remove('resizing');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleSaveResume = () => {
    // Validate personal info before saving
    const validationErrors = validatePersonalInfo(resumeData.personalInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setActiveSection('personalInfo');
      alert('Please fix the errors in Personal Info section before saving.');
      return;
    }
    
    // Check if at least one experience or education is filled
    const hasExperience = resumeData.experience.some(exp => 
      exp.title.trim() || exp.company.trim()
    );
    const hasEducation = resumeData.education.some(edu => 
      edu.degree.trim() || edu.school.trim()
    );
    
    if (!hasExperience && !hasEducation) {
      alert('Please add at least one experience or education entry.');
      return;
    }
    
    // Save to backend or localStorage
    try {
      // Get user ID (each user has separate storage)
      const userId = user?.id || 'demo';
      
      // Save current resume data (user-specific key)
      localStorage.setItem(`resumeData_${userId}`, JSON.stringify(resumeData));
      
      // Get or create resume list for this user
      const resumesKey = `resumes_${userId}`;
      const savedResumes = localStorage.getItem(resumesKey);
      let resumes = savedResumes ? JSON.parse(savedResumes) : [];
      
      // Check if we're editing an existing resume (user-specific key)
      const currentResumeId = localStorage.getItem(`currentResumeId_${userId}`);
      
      if (currentResumeId) {
        // Update existing resume
        const index = resumes.findIndex(r => r.id === parseInt(currentResumeId));
        if (index !== -1) {
          resumes[index] = {
            ...resumes[index],
            data: resumeData,
            title: resumeData.personalInfo.name + "'s Resume" || 'My Resume',
            updatedAt: new Date().toISOString()
          };
        }
      } else {
        // Create new resume
        const newResume = {
          id: Date.now(),
          title: resumeData.personalInfo.name + "'s Resume" || 'My Resume',
          data: resumeData,
          template: currentTemplate.id || 'modern',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resumes.push(newResume);
        localStorage.setItem(`currentResumeId_${userId}`, newResume.id.toString());
      }
      
      // Save updated resumes list
      localStorage.setItem(resumesKey, JSON.stringify(resumes));
      
      alert('Resume saved successfully! View it in your Dashboard.');
      
      // TODO: Send to backend API
      // fetch('http://localhost:8000/api/resumes/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`
      //   },
      //   body: JSON.stringify(resumeData)
      // });
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    // Validate that resume has required content
    const validationErrors = validatePersonalInfo(resumeData.personalInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      alert('Please complete the required fields in Personal Info before exporting.');
      setActiveSection('personalInfo');
      return;
    }
    
    // Check if jsPDF is available
    if (window.jspdf && window.html2canvas) {
      // Use jsPDF method
      await exportWithJsPDF();
    } else {
      // Fallback to print-to-PDF method
      exportWithPrint();
    }
  };

  const exportWithPrint = () => {
    const fileName = (resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume') + '.pdf';
    
    const userConfirm = window.confirm(
      'PDF Export Instructions:\n\n' +
      '1. In the print dialog, select "Save as PDF" or "Microsoft Print to PDF"\n' +
      '2. Choose destination folder\n' +
      '3. Suggested filename: ' + fileName + '\n\n' +
      'Click OK to open print dialog.'
    );
    
    if (userConfirm) {
      handlePrint();
    }
  };

  const exportWithJsPDF = async () => {
    try {
      const { jsPDF } = window.jspdf;
      const html2canvas = window.html2canvas;
      
      // Get the resume content
      const resumeElement = document.querySelector('.full-resume-preview') || 
                           document.querySelector('.resume-preview');
      
      if (!resumeElement) {
        alert('Please open the preview first to export PDF.');
        setShowPreview(true);
        return;
      }
      
      // Show loading message
      const originalText = document.querySelector('.btn-secondary').textContent;
      document.querySelector('.btn-secondary').textContent = '⏳ Generating PDF...';
      
      // Convert HTML to canvas
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save PDF
      const fileName = (resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume') + '.pdf';
      pdf.save(fileName);
      
      // Restore button text
      document.querySelector('.btn-secondary').textContent = originalText;
      
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      alert('PDF export failed. Using fallback method...');
      exportWithPrint();
    }
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get the resume content
    const resumeContent = document.querySelector('.full-resume-preview');
    
    if (!resumeContent) {
      alert('Please open the preview first to print.');
      return;
    }
    
    // Get computed styles
    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .resume-template {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: white;
        }
        
        .resume-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid var(--template-primary, #3498db);
        }
        
        .resume-header h1 {
          font-size: 2.5rem;
          color: var(--template-primary, #3498db);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        
        .resume-title {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.95rem;
          color: #666;
        }
        
        .contact-info span {
          display: flex;
          align-items: center;
        }
        
        .resume-section {
          margin-bottom: 2rem;
        }
        
        .resume-section h3 {
          font-size: 1.4rem;
          color: var(--template-primary, #3498db);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ddd;
          font-weight: 600;
        }
        
        .resume-section p {
          color: #555;
          line-height: 1.8;
        }
        
        .experience-item,
        .education-item,
        .project-item {
          margin-bottom: 1.5rem;
        }
        
        .experience-item h4,
        .education-item h4,
        .project-item h4 {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 0.3rem;
          font-weight: 600;
        }
        
        .company {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          font-style: italic;
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .skill-tag {
          background: var(--template-primary, #3498db);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .project-link a {
          color: var(--template-primary, #3498db);
          text-decoration: none;
        }
        
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .resume-template {
            padding: 0;
            margin: 0;
          }
          
          .resume-section {
            page-break-inside: avoid;
          }
        }
      </style>
    `;
    
    // Write content to new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.name}</title>
          ${styles}
        </head>
        <body>
          ${resumeContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
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
                <label>Full Name <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Professional Title <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, title: e.target.value })}
                  placeholder="e.g., Software Engineer, Data Analyst"
                  className={errors.title ? 'input-error' : ''}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label>Email Address <span style={{color: 'red'}}>*</span></label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, email: e.target.value })}
                  placeholder="yourname@gmail.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
                <small>Format: +91 XXXXX XXXXX or 10-digit number</small>
              </div>
              <div className="form-group full-width">
                <label>Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, location: e.target.value })}
                  placeholder="Mumbai, Maharashtra or Bengaluru, Karnataka"
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
              <div className="textarea-wrapper">
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => updateResumeData('summary', e.target.value)}
                  placeholder="Write a compelling summary of your professional experience, skills, and career objectives..."
                  rows={6}
                />
                <button 
                  className="ai-icon-btn"
                  onClick={() => getAISuggestion('summary', resumeData.summary)}
                  type="button"
                  title="AI Assist"
                >
                  ✨
                </button>
              </div>
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
      <div className={`editor-container ${theme}`} style={{ gridTemplateColumns: `250px 1fr ${previewWidth}px` }}>
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
              <button className="btn-secondary" onClick={handleExportPDF}>
                📄 Export PDF
              </button>
              <button className="btn-primary" onClick={handleSaveResume}>
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
                    <button className="btn-secondary" onClick={handlePrint}>
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
          <div 
            className="resize-handle"
            onMouseDown={handleMouseDown}
            style={{ cursor: isResizing ? 'col-resize' : 'col-resize' }}
          />
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
              
              {resumeData.summary && (
                <div className="resume-section">
                  <h3>Professional Summary</h3>
                  <p>{resumeData.summary}</p>
                </div>
              )}
              
              <div className="resume-section">
                <h3>Experience</h3>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4 
                      contentEditable={isPreviewEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isPreviewEditable) {
                          const updated = resumeData.experience.map((item, i) => 
                            i === index ? { ...item, title: e.target.textContent } : item
                          );
                          updateResumeData('experience', updated);
                        }
                      }}
                      className={isPreviewEditable ? 'editable-field' : ''}
                    >
                      {exp.title}
                    </h4>
                    <p className="company">
                      <span 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.experience.map((item, i) => 
                              i === index ? { ...item, company: e.target.textContent } : item
                            );
                            updateResumeData('experience', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {exp.company}
                      </span>
                      {' • '}
                      <span 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.experience.map((item, i) => 
                              i === index ? { ...item, duration: e.target.textContent } : item
                            );
                            updateResumeData('experience', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {exp.duration}
                      </span>
                    </p>
                    <p 
                      contentEditable={isPreviewEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isPreviewEditable) {
                          const updated = resumeData.experience.map((item, i) => 
                            i === index ? { ...item, description: e.target.textContent } : item
                          );
                          updateResumeData('experience', updated);
                        }
                      }}
                      className={isPreviewEditable ? 'editable-field' : ''}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="resume-section">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4 
                      contentEditable={isPreviewEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isPreviewEditable) {
                          const updated = resumeData.education.map((item, i) => 
                            i === index ? { ...item, degree: e.target.textContent } : item
                          );
                          updateResumeData('education', updated);
                        }
                      }}
                      className={isPreviewEditable ? 'editable-field' : ''}
                    >
                      {edu.degree}
                    </h4>
                    <p>
                      <span 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.education.map((item, i) => 
                              i === index ? { ...item, school: e.target.textContent } : item
                            );
                            updateResumeData('education', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {edu.school}
                      </span>
                      {' • '}
                      <span 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.education.map((item, i) => 
                              i === index ? { ...item, year: e.target.textContent } : item
                            );
                            updateResumeData('education', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {edu.year}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="resume-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {resumeData.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className={`skill-tag ${isPreviewEditable ? 'editable-field' : ''}`}
                      contentEditable={isPreviewEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isPreviewEditable) {
                          const updated = resumeData.skills.map((s, i) => 
                            i === index ? e.target.textContent : s
                          );
                          updateResumeData('skills', updated);
                        }
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {resumeData.projects.length > 0 && (
                <div className="resume-section">
                  <h3>Projects</h3>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h4 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.projects.map((item, i) => 
                              i === index ? { ...item, name: e.target.textContent } : item
                            );
                            updateResumeData('projects', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {project.name}
                      </h4>
                      <p 
                        contentEditable={isPreviewEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (isPreviewEditable) {
                            const updated = resumeData.projects.map((item, i) => 
                              i === index ? { ...item, description: e.target.textContent } : item
                            );
                            updateResumeData('projects', updated);
                          }
                        }}
                        className={isPreviewEditable ? 'editable-field' : ''}
                      >
                        {project.description}
                      </p>
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

      {/* AI Helper Modal */}
      {showAIHelper && (
        <div className="ai-modal-overlay" onClick={() => setShowAIHelper(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-header">
              <h3>✨ AI Suggestion</h3>
              <button className="close-btn" onClick={() => setShowAIHelper(false)}>×</button>
            </div>
            <div className="ai-modal-content">
              {aiLoading ? (
                <div className="ai-loading">
                  <div className="spinner"></div>
                  <p>
                    {resumeData[activeSection] && resumeData[activeSection].length > 10
                      ? 'Analyzing and improving your content...'
                      : 'Generating AI suggestion...'}
                  </p>
                  <small style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>
                    Using Gemini 2.5 Flash • This may take 2-5 seconds
                  </small>
                </div>
              ) : (
                <>
                  <label>
                    AI Generated Content:
                    {resumeData[activeSection] && resumeData[activeSection].length > 10 && (
                      <span style={{color: 'var(--accent-color)', fontSize: '0.85rem', marginLeft: '0.5rem'}}>
                        (Improved from your input)
                      </span>
                    )}
                  </label>
                  <textarea
                    className="ai-suggestion-text"
                    value={aiSuggestion}
                    onChange={(e) => setAiSuggestion(e.target.value)}
                    rows={10}
                    placeholder="AI suggestion will appear here..."
                  />
                  <small>You can edit the suggestion before applying it.</small>
                </>
              )}
            </div>
            {!aiLoading && (
              <div className="ai-modal-actions">
                <button className="btn-secondary" onClick={() => setShowAIHelper(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={applyAISuggestion}>
                  Apply Suggestion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditorPage;
