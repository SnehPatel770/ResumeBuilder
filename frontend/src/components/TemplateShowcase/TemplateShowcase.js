import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTheme } from '../../contexts/ThemeContext';
import './TemplateShowcase.css';

const TemplateShowcase = () => {
  const { templates } = useTemplate();
  const { theme } = useTheme();

  const templateCategories = {
    'Professional': ['modern', 'corporate', 'executive', 'compact'],
    'Creative': ['bold', 'gradient', 'colorful', 'creative'],
    'Traditional': ['classic', 'elegant'],
    'Technology': ['tech'],
    'Minimal': ['minimal']
  };

  return (
    <div className={`template-showcase ${theme}`}>
      <div className="showcase-header">
        <h2>12 Professional Resume Templates</h2>
        <p>Choose from a variety of professionally designed templates tailored to your industry and style</p>
      </div>

      {Object.entries(templateCategories).map(([category, templateIds]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="templates-grid">
            {templateIds.map(id => {
              const template = templates[id];
              return (
                <div key={id} className="template-showcase-card">
                  <div 
                    className="template-preview-box"
                    style={{
                      '--preview-primary': template.colors.primary,
                      '--preview-secondary': template.colors.secondary,
                      '--preview-accent': template.colors.accent
                    }}
                  >
                    <div className="preview-header" style={{ background: template.colors.primary }}></div>
                    <div className="preview-content">
                      <div className="preview-line long"></div>
                      <div className="preview-line medium"></div>
                      <div className="preview-line short"></div>
                      <div className="preview-section">
                        <div className="preview-line medium"></div>
                        <div className="preview-line long"></div>
                      </div>
                    </div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                    <div className="template-colors">
                      <span 
                        className="color-dot" 
                        style={{ background: template.colors.primary }}
                        title="Primary color"
                      ></span>
                      <span 
                        className="color-dot" 
                        style={{ background: template.colors.secondary }}
                        title="Secondary color"
                      ></span>
                      <span 
                        className="color-dot" 
                        style={{ background: template.colors.accent }}
                        title="Accent color"
                      ></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="showcase-footer">
        <h3>Not sure which template to choose?</h3>
        <div className="template-tips">
          <div className="tip-card">
            <span className="tip-icon">💼</span>
            <h4>Corporate & Business</h4>
            <p>Use Corporate Blue, Executive, or Classic templates</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🎨</span>
            <h4>Creative & Design</h4>
            <p>Try Bold Modern, Gradient Creative, or Colorful templates</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💻</span>
            <h4>Tech & Development</h4>
            <p>Go with Tech Developer, Modern, or Compact templates</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📚</span>
            <h4>Academic & Research</h4>
            <p>Choose Elegant Serif or Classic templates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateShowcase;
