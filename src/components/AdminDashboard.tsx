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

interface SkillCategory {
  [key: string]: { name: string; level: number }[];
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory>({});
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeLastUpdated, setResumeLastUpdated] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [newSkill, setNewSkill] = useState({ category: '', name: '', level: 0 });
  const [editingSkill, setEditingSkill] = useState<{ category: string; index: number; skill: { name: string; level: number } } | null>(null);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const saveProject = async () => {
    if (editingProject) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: projects.indexOf(editingProject), ...newProject }),
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
    }
    setNewProject({});
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

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-mono text-primary mb-8">Admin Dashboard</h1>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-xl font-mono text-secondary mb-4">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 p-4 mb-4 rounded">
              <h3>{project.title}</h3>
              <button onClick={() => setEditingProject(project)}>Edit</button>
              <button onClick={() => deleteProject(index)}>Delete</button>
            </div>
          ))}
          <div className="space-y-2">
            <input placeholder="Title" value={editingProject?.title || newProject.title || ''} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <textarea placeholder="Problem" value={editingProject?.problem || newProject.problem || ''} onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <textarea placeholder="Approach" value={editingProject?.approach || newProject.approach || ''} onChange={(e) => setNewProject({ ...newProject, approach: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <input placeholder="Tech Stack (comma separated)" value={editingProject?.techStack?.join(', ') || newProject.techStack?.join(', ') || ''} onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(', ') })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <textarea placeholder="Outcome" value={editingProject?.outcome || newProject.outcome || ''} onChange={(e) => setNewProject({ ...newProject, outcome: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <input placeholder="GitHub" value={editingProject?.github || newProject.github || ''} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <input placeholder="Demo" value={editingProject?.demo || newProject.demo || ''} onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <button onClick={saveProject} className="px-4 py-2 bg-primary text-black font-mono">Save Project</button>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h2 className="text-xl font-mono text-secondary mb-4">Skills</h2>
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="mb-4">
              <h3>{category}</h3>
              {skillList.map((skill, index) => (
                <div key={index} className="bg-gray-900 p-2 mb-2 rounded">
                  {skill.name} - {skill.level}
                  <button onClick={() => setEditingSkill({ category, index, skill })}>Edit</button>
                  <button onClick={() => deleteSkill(category, index)}>Delete</button>
                </div>
              ))}
            </div>
          ))}
          <div className="space-y-2">
            <input placeholder="Category" value={editingSkill?.category || newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <input placeholder="Name" value={editingSkill?.skill.name || newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <input type="number" placeholder="Level" value={editingSkill?.skill.level || newSkill.level} onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })} className="w-full p-2 bg-gray-900 border border-primary/20 text-white" />
            <button onClick={saveSkill} className="px-4 py-2 bg-primary text-black font-mono">Save Skill</button>
          </div>
        </section>

        {/* Resume Section */}
        <section className="mb-8">
          <h2 className="text-xl font-mono text-secondary mb-4">Resume & Profile</h2>
          <input placeholder="Resume URL" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="w-full p-2 bg-gray-900 border border-primary/20 text-white mb-2" />
          <input placeholder="Last Updated" value={resumeLastUpdated} onChange={(e) => setResumeLastUpdated(e.target.value)} className="w-full p-2 bg-gray-900 border border-primary/20 text-white mb-2" />
          <input placeholder="Profile Picture URL" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} className="w-full p-2 bg-gray-900 border border-primary/20 text-white mb-2" />
          <button onClick={saveResume} className="px-4 py-2 bg-primary text-black font-mono">Save</button>
        </section>

        <button onClick={() => signOut()} className="px-4 py-2 bg-accent text-white font-mono hover:bg-accent/80">Sign Out</button>
      </div>
    </div>
  );
}