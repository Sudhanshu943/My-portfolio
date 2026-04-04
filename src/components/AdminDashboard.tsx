'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';

interface Project {
  title: string;
  problem: string;
  approach: string;
  techStack: string[];
  outcome: string;
  github: string;
  demo: string | null;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillsData {
  [key: string]: Skill[];
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillsData>({});
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeLastUpdated, setResumeLastUpdated] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [editingProject, setEditingProject] = useState<{ index: number; project: Project } | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    problem: '',
    approach: '',
    techStack: [],
    outcome: '',
    github: '',
    demo: null
  });

  const [editingSkill, setEditingSkill] = useState<{ category: string; index: number; skill: Skill } | null>(null);
  const [newSkill, setNewSkill] = useState({ category: '', name: '', level: 0 });

  const fetchData = async () => {
    const [projectsRes, skillsRes, configRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/skills'),
      fetch('/api/config')
    ]);
    const projectsData = await projectsRes.json();
    const skillsData = await skillsRes.json();
    const configData = await configRes.json();
    setProjects(projectsData);
    setSkills(skillsData);
    setResumeUrl(configData.resume);
    setResumeLastUpdated(configData.resumeLastUpdated);
    setProfilePicture(configData.profilePicture);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveProject = async () => {
    if (editingProject) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: editingProject.index, ...newProject }),
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
    }
    setNewProject({ title: '', problem: '', approach: '', techStack: [], outcome: '', github: '', demo: null });
    setEditingProject(null);
    fetchData();
  };

  const deleteProject = async (index: number) => {
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    });
    fetchData();
  };

  const startEditProject = (project: Project, index: number) => {
    setEditingProject({ index, project });
    setNewProject(project);
  };

  const saveSkill = async () => {
    if (editingSkill) {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: editingSkill.category, index: editingSkill.index, skill: newSkill }),
      });
    } else {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
    }
    setNewSkill({ category: '', name: '', level: 0 });
    setEditingSkill(null);
    fetchData();
  };

  const deleteSkill = async (category: string, index: number) => {
    await fetch('/api/skills', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, index }),
    });
    fetchData();
  };

  const saveResume = async () => {
    await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume: resumeUrl, resumeLastUpdated, profilePicture }),
    });
    fetchData();
  };

  const totalSkills = Object.values(skills).flat().length;

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono-tactical text-xs uppercase tracking-[0.3em] text-primary">
                [SYSTEM_STATUS: AUTHENTICATED_AS_ADMIN]
              </span>
              <h1 className="text-5xl font-headline font-extrabold uppercase tracking-tighter">
                Administrative <span className="text-primary">Console</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant font-mono-tactical text-xs bg-surface-container-low px-4 py-2">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                SESSION_ID: 0xFD29A
              </span>
              <span className="h-3 w-[1px] bg-outline-variant"></span>
              <span>UPTIME: 142:12:09</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
            <div className="bg-surface-container-low p-6 space-y-2 border-l-4 border-primary">
              <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Total Projects</p>
              <p className="text-3xl font-headline font-bold">{projects.length}</p>
            </div>
            <div className="bg-surface-container-low p-6 space-y-2 border-l-4 border-secondary">
              <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Unique Skills</p>
              <p className="text-3xl font-headline font-bold">{totalSkills}</p>
            </div>
            <div className="bg-surface-container-low p-6 space-y-2 border-l-4 border-outline-variant">
              <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">API Calls (24h)</p>
              <p className="text-3xl font-headline font-bold">1,024</p>
            </div>
            <div className="bg-surface-container-low p-6 space-y-2 border-l-4 border-tertiary">
              <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">System Alerts</p>
              <p className="text-3xl font-headline font-bold text-tertiary">0</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-surface-container p-1 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-surface-container-high">
              <h2 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">database</span>
                Deployed_Projects
              </h2>
              <button 
                onClick={() => { setEditingProject(null); setNewProject({ title: '', problem: '', approach: '', techStack: [], outcome: '', github: '', demo: null }); }}
                className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 font-mono-tactical uppercase hover:shadow-[0_0_20px_rgba(160,255,196,0.3)] transition-all"
              >
                + Init_New_Entry
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/10">
                    <th className="p-4 font-mono-tactical text-[10px] uppercase text-on-surface-variant">ID</th>
                    <th className="p-4 font-mono-tactical text-[10px] uppercase text-on-surface-variant">Project_Name</th>
                    <th className="p-4 font-mono-tactical text-[10px] uppercase text-on-surface-variant">Stack</th>
                    <th className="p-4 font-mono-tactical text-[10px] uppercase text-on-surface-variant">Status</th>
                    <th className="p-4 font-mono-tactical text-[10px] uppercase text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {projects.map((project, index) => (
                    <tr key={index} className="hover:bg-surface-bright/50 transition-colors group">
                      <td className="p-4 font-mono-tactical text-xs text-on-surface-variant">0x{String(index + 1).padStart(2, '0').toUpperCase()}</td>
                      <td className="p-4 font-headline font-medium text-sm">{project.title}</td>
                      <td className="p-4 font-mono-tactical text-xs text-secondary">{project.techStack.join(', ')}</td>
                      <td className="p-4">
                        <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 border border-primary/20 uppercase font-bold">Live</span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => startEditProject(project, index)}
                          className="material-symbols-outlined text-sm text-on-surface-variant hover:text-primary transition-colors"
                        >
                          edit
                        </button>
                        <button 
                          onClick={() => deleteProject(index)}
                          className="material-symbols-outlined text-sm text-on-surface-variant hover:text-tertiary transition-colors"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-surface-container p-6 space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">attachment</span>
                System_Assets
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Resume URL</label>
                  <input 
                    value={resumeUrl} 
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-xs py-2 transition-all text-on-surface-variant" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Profile Picture URL</label>
                  <input 
                    value={profilePicture} 
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-xs py-2 transition-all text-on-surface-variant" 
                  />
                </div>
                <button 
                  onClick={saveResume}
                  className="w-full py-2 bg-surface-bright text-secondary text-[10px] font-bold uppercase border border-secondary/20 hover:bg-secondary/10 transition-all font-mono-tactical"
                >
                  _ [UPDATE_ASSET_PATH]
                </button>
              </div>
            </div>

            <div className="bg-surface-container p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                  Skill_Array
                </h3>
                <span className="font-mono-tactical text-[10px] text-on-surface-variant">{totalSkills} TOTAL</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(skills).map(([category, skillList]) => (
                  skillList.slice(0, 2).map((skill, i) => (
                    <div key={`${category}-${i}`} className="px-2 py-1 bg-surface-container-low border border-outline-variant/30 text-[10px] font-mono-tactical flex items-center gap-2">
                      {skill.name.toUpperCase()}
                      <button 
                        onClick={() => deleteSkill(category, i)}
                        className="material-symbols-outlined text-[12px] text-tertiary"
                      >
                        close
                      </button>
                    </div>
                  ))
                ))}
                <button className="px-2 py-1 border border-primary/40 text-primary text-[10px] font-mono-tactical hover:bg-primary/10 transition-colors">
                  + ADD
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 bg-surface-container p-8">
            <div className="max-w-4xl">
              <div className="mb-8">
                <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-2">
                  Project_Edit: <span className="text-primary">{editingProject ? editingProject.project.title : 'New Entry'}</span>
                </h2>
                <p className="text-sm text-on-surface-variant">Update the technical specifications and deployment metadata for this project entry.</p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); saveProject(); }}>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Entry Title</label>
                    <input 
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Tech Stack (CSV)</label>
                    <input 
                      value={newProject.techStack.join(', ')}
                      onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(', ') })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">GitHub URL</label>
                    <input 
                      value={newProject.github}
                      onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2 transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Problem / Outcome</label>
                    <textarea 
                      value={newProject.outcome}
                      onChange={(e) => setNewProject({ ...newProject, outcome: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 font-body text-sm p-3 transition-all leading-relaxed" 
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-primary text-on-primary font-mono-tactical font-bold py-3 uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(160,255,196,0.3)]"
                    >
                      _ [COMMIT_CHANGES]
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setEditingProject(null); setNewProject({ title: '', problem: '', approach: '', techStack: [], outcome: '', github: '', demo: null }); }}
                      className="px-6 border border-outline-variant text-on-surface-variant font-mono-tactical font-bold py-3 uppercase tracking-widest hover:bg-tertiary/10 hover:text-tertiary hover:border-tertiary transition-all"
                    >
                      _ [ABORT]
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <button 
            onClick={() => signOut()}
            className="px-6 py-3 bg-tertiary/10 text-tertiary font-mono-tactical font-bold uppercase tracking-widest hover:bg-tertiary/20 transition-all"
          >
            _ [SIGN_OUT]
          </button>
        </div>
      </div>
    </div>
  );
}