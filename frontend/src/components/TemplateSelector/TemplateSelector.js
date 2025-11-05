import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTheme } from '../../contexts/ThemeContext';
import './TemplateSelector.css';

const TemplateSelector = ({ onTemplateSelect }) => {
  const { templates, selectedTemplate, selectTemplate, getAllCategories, getTemplatesByCategory } = useTemplate();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...getAllCategories()];

  const getFilteredTemplates = () => {
    if (selectedCategory === 'All') {
      return Object.values(templates);
    }
    return getTemplatesByCategory(selectedCategory);
  };

  const handleTemplateSelect = (templateId) => {
    selectTemplate(templateId);
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };

  return (
    <div className={`template-selector ${theme}`}>
      <div className="template-header">
        <h3>Choose a Template</h3>
        <p>Select a professional template that matches your style</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="template-grid">
        {getFilteredTemplates().map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="template-preview">
              <div 
                className="template-mockup"
                style={{
                  '--template-primary': template.colors.primary,
                  '--template-secondary': template.colors.secondary,
                  '--template-accent': template.colors.accent
                }}
              >
                <div className="mockup-header"></div>
                <div className="mockup-content">
                  <div className="mockup-line long"></div>
                  <div className="mockup-line medium"></div>
                  <div className="mockup-line short"></div>
                  <div className="mockup-section">
                    <div className="mockup-line medium"></div>
                    <div className="mockup-line long"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <span className="template-category">{template.category}</span>
            </div>
            
            {selectedTemplate === template.id && (
              <div className="selected-indicator">
                <span>✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;