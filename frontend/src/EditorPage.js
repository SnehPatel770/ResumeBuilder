import React, { useState, useEffect } from 'react';

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
    if (confirm('Reset resume to defaults?')) {
      setResume(defaultResume);
      localStorage.removeItem('resume');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 24, padding: 24, color: '#111', height: '100vh', boxSizing: 'border-box' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f7f7f7', borderRadius: 8 }}>
        <h2>Editor</h2>

        <section style={{ marginBottom: 16 }}>
          <h3>Personal</h3>
          <input style={{ width: '100%', marginBottom: 8 }} value={resume.personal.name} onChange={e => updatePersonal('name', e.target.value)} placeholder="Full name" />
          <input style={{ width: '100%', marginBottom: 8 }} value={resume.personal.title} onChange={e => updatePersonal('title', e.target.value)} placeholder="Title" />
          <input style={{ width: '100%', marginBottom: 8 }} value={resume.personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="Email" />
          <input style={{ width: '100%', marginBottom: 8 }} value={resume.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="Phone" />
          <input style={{ width: '100%' }} value={resume.personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="Location" />
        </section>

        <section style={{ marginBottom: 16 }}>
          <h3>Summary</h3>
          <textarea style={{ width: '100%' }} value={resume.summary} onChange={e => updateSimple('summary', e.target.value)} rows={4} />
        </section>

        <section style={{ marginBottom: 16 }}>
          <h3>Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={exp.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 6 }}>
              <input style={{ width: '48%', marginRight: '4%' }} value={exp.role} onChange={e => updateField('experience', i, 'role', e.target.value)} placeholder="Role" />
              <input style={{ width: '48%' }} value={exp.company} onChange={e => updateField('experience', i, 'company', e.target.value)} placeholder="Company" />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input style={{ flex: 1 }} value={exp.start} onChange={e => updateField('experience', i, 'start', e.target.value)} placeholder="Start (YYYY-MM)" />
                <input style={{ flex: 1 }} value={exp.end} onChange={e => updateField('experience', i, 'end', e.target.value)} placeholder="End or Present" />
              </div>
              <textarea style={{ width: '100%', marginTop: 8 }} value={exp.description} onChange={e => updateField('experience', i, 'description', e.target.value)} rows={3} placeholder="Description" />
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <button onClick={() => removeItem('experience', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => addItem('experience', { role: '', company: '', start: '', end: '', description: '' })}>Add Experience</button>
        </section>

        <section style={{ marginBottom: 16 }}>
          <h3>Education</h3>
          {resume.education.map((edu, i) => (
            <div key={edu.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 6 }}>
              <input style={{ width: '100%', marginBottom: 6 }} value={edu.school} onChange={e => updateField('education', i, 'school', e.target.value)} placeholder="School" />
              <input style={{ width: '100%', marginBottom: 6 }} value={edu.degree} onChange={e => updateField('education', i, 'degree', e.target.value)} placeholder="Degree" />
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={{ flex: 1 }} value={edu.start} onChange={e => updateField('education', i, 'start', e.target.value)} placeholder="Start" />
                <input style={{ flex: 1 }} value={edu.end} onChange={e => updateField('education', i, 'end', e.target.value)} placeholder="End" />
              </div>
              <textarea style={{ width: '100%', marginTop: 8 }} value={edu.details} onChange={e => updateField('education', i, 'details', e.target.value)} rows={2} placeholder="Details" />
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <button onClick={() => removeItem('education', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => addItem('education', { school: '', degree: '', start: '', end: '', details: '' })}>Add Education</button>
        </section>

        <section style={{ marginBottom: 16 }}>
          <h3>Skills</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <SkillInput onAdd={addSkill} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {resume.skills.map((s, i) => (
              <div key={s + i} style={{ background: '#e6e6e6', padding: '6px 8px', borderRadius: 20 }}>
                {s} <button style={{ marginLeft: 8 }} onClick={() => removeSkill(i)}>x</button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 16 }}>
          <h3>Projects</h3>
          {resume.projects.map((p, i) => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 6 }}>
              <input style={{ width: '100%', marginBottom: 6 }} value={p.name} onChange={e => updateField('projects', i, 'name', e.target.value)} placeholder="Project name" />
              <input style={{ width: '100%', marginBottom: 6 }} value={p.link} onChange={e => updateField('projects', i, 'link', e.target.value)} placeholder="Link (optional)" />
              <textarea style={{ width: '100%' }} value={p.description} onChange={e => updateField('projects', i, 'description', e.target.value)} rows={2} placeholder="Description" />
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <button onClick={() => removeItem('projects', i)}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => addItem('projects', { name: '', link: '', description: '' })}>Add Project</button>
        </section>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportJSON}>Export JSON</button>
          <button onClick={() => window.print()}>Print / Save PDF</button>
          <button onClick={resetResume}>Reset</button>
        </div>
      </div>

      <div style={{ width: 420, overflowY: 'auto', padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <ResumePreview data={resume} />
      </div>
    </div>
  );
};

const SkillInput = ({ onAdd }) => {
  const [val, setVal] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onAdd(val.trim()); setVal(''); }} style={{ display: 'flex', gap: 8, width: '100%' }}>
      <input style={{ flex: 1 }} value={val} onChange={e => setVal(e.target.value)} placeholder="Add skill and press Enter" />
      <button type="submit">Add</button>
    </form>
  );
};

const ResumePreview = ({ data }) => {
  const { personal, summary, experience, education, skills, projects } = data;
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#111' }}>
      <header style={{ borderBottom: '1px solid #ddd', paddingBottom: 8, marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>{personal.name}</h1>
        <div style={{ color: '#666' }}>{personal.title} — {personal.location}</div>
        <div style={{ color: '#666' }}>{personal.email} {personal.phone ? `• ${personal.phone}` : ''}</div>
      </header>

      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: '6px 0' }}>Summary</h3>
        <p style={{ margin: 0 }}>{summary}</p>
      </section>

      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: '6px 0' }}>Experience</h3>
        {experience.map(e => (
          <div key={e.id} style={{ marginBottom: 8 }}>
            <strong>{e.role}</strong> — <em>{e.company}</em>
            <div style={{ color: '#666' }}>{e.start} • {e.end}</div>
            <div>{e.description}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: '6px 0' }}>Education</h3>
        {education.map(e => (
          <div key={e.id} style={{ marginBottom: 8 }}>
            <strong>{e.school}</strong> — {e.degree}
            <div style={{ color: '#666' }}>{e.start} • {e.end}</div>
            <div>{e.details}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: '6px 0' }}>Skills</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {skills.map((s, i) => <span key={s + i} style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: 12 }}>{s}</span>)}
        </div>
      </section>

      <section>
        <h3 style={{ margin: '6px 0' }}>Projects</h3>
        {projects.map(p => (
          <div key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong>{p.link ? <a href={p.link} style={{ marginLeft: 8 }} target="_blank" rel="noreferrer">link</a> : null}
            <div>{p.description}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EditorPage;
