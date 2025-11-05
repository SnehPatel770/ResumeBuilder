import React, { createContext, useContext, useState } from 'react';

const TemplateContext = createContext();

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

const templates = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and creative industries',
    preview: '/templates/modern-preview.png',
    category: 'Professional',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      text: '#1e293b'
    },
    layout: {
      type: 'single-column',
      sections: ['header', 'summary', 'experience', 'education', 'skills', 'projects']
    }
  },
  classic: {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Timeless design suitable for corporate and traditional industries',
    preview: '/templates/classic-preview.png',
    category: 'Traditional',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#374151',
      background: '#ffffff',
      text: '#111827'
    },
    layout: {
      type: 'single-column',
      sections: ['header', 'objective', 'experience', 'education', 'skills']
    }
  },
  creative: {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and artistic layout for designers and creative professionals',
    preview: '/templates/creative-preview.png',
    category: 'Creative',
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#8b5cf6',
      background: '#fafafa',
      text: '#374151'
    },
    layout: {
      type: 'two-column',
      sections: ['header', 'summary', 'experience', 'skills', 'education', 'portfolio']
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant design focusing on content over decoration',
    preview: '/templates/minimal-preview.png',
    category: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333',
      background: '#ffffff',
      text: '#000000'
    },
    layout: {
      type: 'single-column',
      sections: ['header', 'summary', 'experience', 'education', 'skills']
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive Professional',
    description: 'Sophisticated design for senior-level positions and executives',
    preview: '/templates/executive-preview.png',
    category: 'Executive',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#ffffff',
      text: '#1e293b'
    },
    layout: {
      type: 'two-column',
      sections: ['header', 'executive-summary', 'experience', 'achievements', 'education', 'skills']
    }
  },
  tech: {
    id: 'tech',
    name: 'Tech Developer',
    description: 'Modern design tailored for software developers and tech professionals',
    preview: '/templates/tech-preview.png',
    category: 'Technology',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      background: '#f8fafc',
      text: '#0f172a'
    },
    layout: {
      type: 'two-column',
      sections: ['header', 'summary', 'technical-skills', 'experience', 'projects', 'education']
    }
  }
};

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const selectTemplate = (templateId) => {
    if (templates[templateId]) {
      setSelectedTemplate(templateId);
      localStorage.setItem('selectedTemplate', templateId);
    }
  };

  const getTemplate = (templateId) => {
    return templates[templateId] || templates.modern;
  };

  const getCurrentTemplate = () => {
    return templates[selectedTemplate];
  };

  const getTemplatesByCategory = (category) => {
    return Object.values(templates).filter(template => template.category === category);
  };

  const getAllCategories = () => {
    const categories = [...new Set(Object.values(templates).map(template => template.category))];
    return categories;
  };

  const value = {
    templates,
    selectedTemplate,
    selectTemplate,
    getTemplate,
    getCurrentTemplate,
    getTemplatesByCategory,
    getAllCategories
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};