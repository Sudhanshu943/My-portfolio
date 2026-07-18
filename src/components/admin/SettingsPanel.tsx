'use client';

import { useState, useEffect } from 'react';

interface Project {
  id?: number;
  name: string;
  description: string;
  htmlUrl: string;
  stargazersCount: number;
  language: string;
  customTitle?: string;
  customDescription?: string;
  customTags?: string[];
  customImage?: string;
  visible: boolean;
  featured: boolean;
  order: number;
}

interface Skills {
  [category: string]: string[];
}

interface Education {
  degree: string;
  field: string;
  institution: string;
  startYear: string;
  endYear: string;
  cgpa?: string;
  keySubjects?: string[];
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'social' | 'resume' | 'education'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skills>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [socialLinks, setSocialLinks] = useState({ github: '', linkedin: '', email: '', resume: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    name: '', description: '', htmlUrl: '', stargazersCount: 0, language: '', visible: true, featured: false, order: 999
  });

  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [editingSkillCategory, setEditingSkillCategory] = useState('');
  const [editingSkillIndex, setEditingSkillIndex] = useState(-1);

  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [newEducation, setNewEducation] = useState<Education>({
    degree: '', field: '', institution: '', startYear: '', endYear: '', cgpa: '', keySubjects: []
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes, configRes, educationRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/config'),
        fetch('/api/education')
      ]);
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      const configData = await configRes.json();
      const educationData = await educationRes.json();
      
      setProjects(projectsData);
      setSkills(skillsData);
      setSocialLinks({
        github: configData.socialLinks?.github || '',
        linkedin: configData.socialLinks?.linkedin || '',
        email: configData.socialLinks?.email || '',
        resume: configData.resume || '',
      });
      setEducation(educationData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveProject = async () => {
    setLoading(true);
    try {
      if (editingProject && editingProject.id) {
        const index = projects.findIndex(p => p.id === editingProject.id);
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, ...editingProject })
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        });
      }
      setEditingProject(null);
      setNewProject({ name: '', description: '', htmlUrl: '', stargazersCount: 0, language: '', visible: true, featured: false, order: 999 });
      fetchData();
      showMessage('Project saved successfully!');
    } catch (error) {
      showMessage('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number | undefined) => {
    if (id === undefined) return;
    setLoading(true);
    setLoading(true);
    try {
      const index = projects.findIndex(p => p.id === id);
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      });
      fetchData();
      showMessage('Project deleted!');
    } catch (error) {
      showMessage('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!newSkillCategory || !newSkill) return;
    setLoading(true);
    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newSkillCategory, name: newSkill })
      });
      setNewSkill('');
      fetchData();
      showMessage('Skill added!');
    } catch (error) {
      showMessage('Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (category: string, index: number) => {
    setLoading(true);
    try {
      await fetch('/api/skills', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, index })
      });
      fetchData();
      showMessage('Skill deleted!');
    } catch (error) {
      showMessage('Failed to delete skill');
    } finally {
      setLoading(false);
    }
  };

  const saveSocialLinks = async () => {
    setLoading(true);
    try {
      const { resume, ...links } = socialLinks;
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          socialLinks: links,
          ...(resume ? { resume } : {}),
        })
      });
      showMessage('Social links saved!');
    } catch (error) {
      showMessage('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async (url: string) => {
    setLoading(true);
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: url })
      });
      showMessage('Resume link saved!');
    } catch (error) {
      showMessage('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const saveEducation = async () => {
    setLoading(true);
    try {
      const eduToSave = editingEducation ? { ...editingEducation, index: education.findIndex(e => e.degree === editingEducation.degree && e.institution === editingEducation.institution) } : newEducation;
      
      if (editingEducation) {
        const index = education.findIndex(e => e.degree === editingEducation.degree && e.institution === editingEducation.institution);
        await fetch('/api/education', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, ...editingEducation })
        });
      } else {
        await fetch('/api/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEducation)
        });
      }
      setEditingEducation(null);
      setNewEducation({ degree: '', field: '', institution: '', startYear: '', endYear: '', cgpa: '', keySubjects: [] });
      fetchData();
      showMessage('Education saved successfully!');
    } catch (error) {
      showMessage('Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (index: number) => {
    setLoading(true);
    try {
      await fetch('/api/education', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      });
      fetchData();
      showMessage('Education deleted!');
    } catch (error) {
      showMessage('Failed to delete education');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-surface border-l border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary font-['Space_Grotesk'] uppercase tracking-widest">
            [SETTINGS_PANEL]
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {message && (
          <div className="bg-primary/20 border border-primary/50 px-4 py-2 text-primary text-sm">
            {message}
          </div>
        )}

        <div className="flex border-b border-outline-variant/30">
          {(['projects', 'skills', 'social', 'resume', 'education'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-['Space_Grotesk'] uppercase tracking-widest transition-colors ${
                activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface">Projects</h3>
                <button
                  onClick={() => { setEditingProject(null); setNewProject({ name: '', description: '', htmlUrl: '', stargazersCount: 0, language: '', visible: true, featured: false, order: 999 }); }}
                  className="text-xs text-primary hover:underline"
                >
                  + Add New
                </button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="bg-surface-container p-3 border border-outline-variant/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold">{project.customTitle || project.name}</h4>
                        <p className="text-xs text-on-surface-variant">{project.language}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setEditingProject(project)} className="text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onClick={() => deleteProject(project.id)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(editingProject || newProject.name) && (
                <div className="bg-surface-container p-4 space-y-3">
                  <h4 className="text-sm font-bold">{editingProject ? 'Edit' : 'Add'} Project</h4>
                  <input
                    placeholder="Project Name"
                    value={editingProject ? editingProject.name : newProject.name}
                    onChange={(e) => editingProject ? setEditingProject({ ...editingProject, name: e.target.value }) : setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Custom Title (optional)"
                    value={editingProject?.customTitle || ''}
                    onChange={(e) => editingProject && setEditingProject({ ...editingProject, customTitle: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingProject ? editingProject.description : newProject.description}
                    onChange={(e) => editingProject ? setEditingProject({ ...editingProject, description: e.target.value }) : setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                    rows={2}
                  />
                  <input
                    placeholder="GitHub URL"
                    value={editingProject ? editingProject.htmlUrl : newProject.htmlUrl}
                    onChange={(e) => editingProject ? setEditingProject({ ...editingProject, htmlUrl: e.target.value }) : setNewProject({ ...newProject, htmlUrl: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Language"
                    value={editingProject ? editingProject.language : newProject.language}
                    onChange={(e) => editingProject ? setEditingProject({ ...editingProject, language: e.target.value }) : setNewProject({ ...newProject, language: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Order"
                    value={editingProject ? editingProject.order : newProject.order}
                    onChange={(e) => editingProject ? setEditingProject({ ...editingProject, order: parseInt(e.target.value) || 999 }) : setNewProject({ ...newProject, order: parseInt(e.target.value) || 999 })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={editingProject ? editingProject.visible : newProject.visible}
                        onChange={(e) => editingProject ? setEditingProject({ ...editingProject, visible: e.target.checked }) : setNewProject({ ...newProject, visible: e.target.checked })}
                      />
                      Visible
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={editingProject ? editingProject.featured : newProject.featured}
                        onChange={(e) => editingProject ? setEditingProject({ ...editingProject, featured: e.target.checked }) : setNewProject({ ...newProject, featured: e.target.checked })}
                      />
                      Featured
                    </label>
                  </div>
                  <button onClick={saveProject} disabled={loading} className="w-full bg-primary/20 border border-primary/50 text-primary py-2 text-sm">
                    {loading ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-on-surface">Add New Skill</h3>
              <div className="flex gap-2">
                <input
                  placeholder="Category (e.g., Languages)"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="flex-1 bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Skill name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                />
              </div>
              <button onClick={addSkill} disabled={loading || !newSkillCategory || !newSkill} className="w-full bg-primary/20 border border-primary/50 text-primary py-2 text-sm">
                Add Skill
              </button>

              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-surface-container p-3">
                  <h4 className="text-sm font-bold text-primary mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-surface-container-low px-2 py-1 text-xs">
                        {skill}
                        <button onClick={() => deleteSkill(category, idx)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-on-surface">Social Links</h3>
              <input
                placeholder="GitHub URL"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
              />
              <input
                placeholder="LinkedIn URL"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
              />
              <input
                placeholder="Email"
                value={socialLinks.email}
                onChange={(e) => setSocialLinks({ ...socialLinks, email: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
              />
              <button onClick={saveSocialLinks} disabled={loading} className="w-full bg-primary/20 border border-primary/50 text-primary py-2 text-sm">
                {loading ? 'Saving...' : 'Save Social Links'}
              </button>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-on-surface">Resume Link</h3>
              <input
                placeholder="Resume URL (Google Drive, PDF link, etc.)"
                value={socialLinks.resume || ''}
                onChange={(e) => setSocialLinks({ ...socialLinks, resume: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
              />
              <button onClick={() => saveResume(socialLinks.resume)} disabled={loading} className="w-full bg-primary/20 border border-primary/50 text-primary py-2 text-sm">
                {loading ? 'Saving...' : 'Save Resume Link'}
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface">Education</h3>
                <button
                  onClick={() => { setEditingEducation(null); setNewEducation({ degree: '', field: '', institution: '', startYear: '', endYear: '', cgpa: '', keySubjects: [] }); }}
                  className="text-xs text-primary hover:underline"
                >
                  + Add New
                </button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {education.map((edu, index) => (
                  <div key={index} className="bg-surface-container p-3 border border-outline-variant/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold">{edu.degree} in {edu.field}</h4>
                        <p className="text-xs text-on-surface-variant">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setEditingEducation(edu)} className="text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onClick={() => deleteEducation(index)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(editingEducation || newEducation.degree) && (
                <div className="bg-surface-container p-4 space-y-3">
                  <h4 className="text-sm font-bold">{editingEducation ? 'Edit' : 'Add'} Education</h4>
                  <input
                    placeholder="Degree (e.g., B.Tech)"
                    value={editingEducation ? editingEducation.degree : newEducation.degree}
                    onChange={(e) => editingEducation ? setEditingEducation({ ...editingEducation, degree: e.target.value }) : setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Field (e.g., Computer Science)"
                    value={editingEducation ? editingEducation.field : newEducation.field}
                    onChange={(e) => editingEducation ? setEditingEducation({ ...editingEducation, field: e.target.value }) : setNewEducation({ ...newEducation, field: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Institution"
                    value={editingEducation ? editingEducation.institution : newEducation.institution}
                    onChange={(e) => editingEducation ? setEditingEducation({ ...editingEducation, institution: e.target.value }) : setNewEducation({ ...newEducation, institution: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      placeholder="Start Year"
                      value={editingEducation ? editingEducation.startYear : newEducation.startYear}
                      onChange={(e) => editingEducation ? setEditingEducation({ ...editingEducation, startYear: e.target.value }) : setNewEducation({ ...newEducation, startYear: e.target.value })}
                      className="flex-1 bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                    />
                    <input
                      placeholder="End Year"
                      value={editingEducation ? editingEducation.endYear : newEducation.endYear}
                      onChange={(e) => editingEducation ? setEditingEducation({ ...editingEducation, endYear: e.target.value }) : setNewEducation({ ...newEducation, endYear: e.target.value })}
                      className="flex-1 bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                    />
                  </div>
                  <input
                    placeholder="CGPA (optional)"
                    value={editingEducation?.cgpa || ''}
                    onChange={(e) => editingEducation && setEditingEducation({ ...editingEducation, cgpa: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Key Subjects (comma separated)"
                    value={editingEducation?.keySubjects?.join(', ') || ''}
                    onChange={(e) => editingEducation && setEditingEducation({ ...editingEducation, keySubjects: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-3 py-2 text-sm"
                  />
                  <button onClick={saveEducation} disabled={loading} className="w-full bg-primary/20 border border-primary/50 text-primary py-2 text-sm">
                    {loading ? 'Saving...' : 'Save Education'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}