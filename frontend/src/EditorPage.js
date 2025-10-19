import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';

const defaultResume = {
  personal: {
    name: 'Your Name',
    title: 'Job Title',
    email: 'you@example.com',
    phone: '',
    location: ''
  },
  summary: 'Brief summary about yourself.',
  experience: [
    {
      id: Date.now(),
      role: 'Software Engineer',
      company: 'Company, Inc.',
      start: '2022-01',
      end: 'Present',
      description: 'Describe your role and accomplishments.'
    }
  ],
  education: [
    {
      id: Date.now() + 1,
      school: 'University',
      degree: 'B.S. in Computer Science',
      start: '2018',
      end: '2022',
      details: ''
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  projects: [
    {
      id: Date.now() + 2,
      name: 'Project Name',
      link: '',
      description: 'Short project description.'
    }
  ]
};

const EditorPage = () => {
  const { logout } = useAuth();
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resume');
      return saved ? JSON.parse(saved) : defaultResume;
    } catch {
      return defaultResume;
    }
  });

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(resume));
  }, [resume]);

  const updatePersonal = (field, value) =>
    setResume(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  const updateField = (section, index, field, value) =>
    setResume(prev => {
      const copy = { ...prev };
      copy[section] = copy[section].map((item, i) => (i === index ? { ...item, [field]: value } : item));
      return copy;
    });

  const addItem = (section, template) =>
    setResume(prev => ({ ...prev, [section]: [...prev[section], { ...template, id: Date.now() }] }));

  const removeItem = (section, index) =>
    setResume(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));

  const updateSimple = (field, value) => setResume(prev => ({ ...prev, [field]: value }));

  const addSkill = skill =>
    setResume(prev => ({ ...prev, skills: skill ? [...prev.skills, skill] : prev.skills }));

  const removeSkill = idx =>
    setResume(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetResume = () => {
    if (window.confirm('Reset resume to defaults?')) {
      setResume(defaultResume);
      localStorage.removeItem('resume');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Editor Panel */}
      <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Editor</h2>

        <section className="mb-8 relative">
          <button onClick={logout} className="btn-secondary absolute top-0 right-0 -mt-2">
            Logout
          </button>
          <h3 className="text-xl font-semibold mb-4">Personal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="form-input" value={resume.personal.name} onChange={e => updatePersonal('name', e.target.value)} placeholder="Full name" />
            <input className="form-input" value={resume.personal.title} onChange={e => updatePersonal('title', e.target.value)} placeholder="Title" />
            <input className="form-input" value={resume.personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="Email" />
            <input className="form-input" value={resume.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="Phone" />
            <input className="form-input sm:col-span-2" value={resume.personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="Location" />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <textarea className="form-input" value={resume.summary} onChange={e => updateSimple('summary', e.target.value)} rows={4} />
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={exp.id} className="form-section">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="form-input" value={exp.role} onChange={e => updateField('experience', i, 'role', e.target.value)} placeholder="Role" />
                <input className="form-input" value={exp.company} onChange={e => updateField('experience', i, 'company', e.target.value)} placeholder="Company" />
                <input className="form-input" value={exp.start} onChange={e => updateField('experience', i, 'start', e.target.value)} placeholder="Start (YYYY-MM)" />
                <input className="form-input" value={exp.end} onChange={e => updateField('experience', i, 'end', e.target.value)} placeholder="End or Present" />
              </div>
              <textarea className="form-input mt-4" value={exp.description} onChange={e => updateField('experience', i, 'description', e.target.value)} rows={3} placeholder="Description" />
              <div className="text-right mt-2">
                <button className="btn-danger" onClick={() => removeItem('experience', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="btn-primary" onClick={() => addItem('experience', { role: '', company: '', start: '', end: '', description: '' })}>Add Experience</button>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {resume.education.map((edu, i) => (
            <div key={edu.id} className="form-section">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="form-input sm:col-span-2" value={edu.school} onChange={e => updateField('education', i, 'school', e.target.value)} placeholder="School" />
                <input className="form-input sm:col-span-2" value={edu.degree} onChange={e => updateField('education', i, 'degree', e.target.value)} placeholder="Degree" />
                <input className="form-input" value={edu.start} onChange={e => updateField('education', i, 'start', e.target.value)} placeholder="Start Year" />
                <input className="form-input" value={edu.end} onChange={e => updateField('education', i, 'end', e.target.value)} placeholder="End Year" />
              </div>
              <textarea className="form-input mt-4" value={edu.details} onChange={e => updateField('education', i, 'details', e.target.value)} rows={2} placeholder="Details (e.g., GPA, Honors)" />
              <div className="text-right mt-2">
                <button className="btn-danger" onClick={() => removeItem('education', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="btn-primary" onClick={() => addItem('education', { school: '', degree: '', start: '', end: '', details: '' })}>Add Education</button>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          <div className="mb-4">
            <SkillInput onAdd={addSkill} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {resume.skills.map((s, i) => (
              <div key={s + i} className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                {s}
                <button className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100" onClick={() => removeSkill(i)}>&times;</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          {resume.projects.map((p, i) => (
            <div key={p.id} className="form-section">
              <div className="grid grid-cols-1 gap-4">
                <input className="form-input" value={p.name} onChange={e => updateField('projects', i, 'name', e.target.value)} placeholder="Project name" />
                <input className="form-input" value={p.link} onChange={e => updateField('projects', i, 'link', e.target.value)} placeholder="Link (optional)" />
                <textarea className="form-input" value={p.description} onChange={e => updateField('projects', i, 'description', e.target.value)} rows={2} placeholder="Description" />
              </div>
              <div className="text-right mt-2">
                <button className="btn-danger" onClick={() => removeItem('projects', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="btn-primary" onClick={() => addItem('projects', { name: '', link: '', description: '' })}>Add Project</button>
        </section>

        <div className="flex flex-wrap gap-4 mt-6 border-t pt-6 border-gray-200 dark:border-gray-700">
          <button className="btn-secondary" onClick={exportJSON}>Export JSON</button>
          <button className="btn-secondary" onClick={() => window.print()}>Print / Save PDF</button>
          <button className="btn-danger" onClick={resetResume}>Reset</button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:w-[420px] lg:flex-shrink-0 overflow-y-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <ResumePreview data={resume} />
      </div>
    </div>
  );
};

const SkillInput = ({ onAdd }) => {
  const [val, setVal] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onAdd(val.trim()); setVal(''); }} className="flex gap-2 w-full">
      <input className="form-input flex-1" value={val} onChange={e => setVal(e.target.value)} placeholder="Add skill and press Enter" />
      <button type="submit" className="btn-primary">Add</button>
    </form>
  );
};

const ResumePreview = ({ data }) => {
  const { personal, summary, experience, education, skills, projects } = data;
  return (
    <div className="font-sans text-sm text-gray-800 dark:text-gray-200">
      <header className="text-center border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{personal.name}</h1>
        <div className="text-md text-gray-600 dark:text-gray-400">{personal.title} {personal.location && `— ${personal.location}`}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{personal.email} {personal.phone && `• ${personal.phone}`}</div>
      </header>

      <section className="mb-4">
        <h3 className="preview-heading">Summary</h3>
        <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      </section>

      <section className="mb-4">
        <h3 className="preview-heading">Experience</h3>
        {experience.map(e => (
          <div key={e.id} className="mb-3">
            <div className="flex justify-between">
              <strong className="font-semibold text-gray-800 dark:text-gray-100">{e.role}</strong>
              <span className="text-gray-600 dark:text-gray-400">{e.start} - {e.end}</span>
            </div>
            <em className="text-gray-600 dark:text-gray-400">{e.company}</em>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{e.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h3 className="preview-heading">Education</h3>
        {education.map(e => (
          <div key={e.id} className="mb-3">
            <div className="flex justify-between">
              <strong className="font-semibold text-gray-800 dark:text-gray-100">{e.school}</strong>
              <span className="text-gray-600 dark:text-gray-400">{e.start} - {e.end}</span>
            </div>
            <em className="text-gray-600 dark:text-gray-400">{e.degree}</em>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{e.details}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h3 className="preview-heading">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {skills.map((s, i) => <span key={s + i} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">{s}</span>)}
        </div>
      </section>

      <section>
        <h3 className="preview-heading">Projects</h3>
        {projects.map(p => (
          <div key={p.id} className="mb-3">
            <strong className="font-semibold text-gray-800 dark:text-gray-100">{p.name}</strong>
            {p.link && <a href={p.link} className="text-blue-500 hover:underline ml-2" target="_blank" rel="noreferrer">Link</a>}
            <p className="text-gray-700 dark:text-gray-300 mt-1">{p.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EditorPage;
