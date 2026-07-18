'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RepoConfig {
  visible?: boolean;
  featured?: boolean;
  customTitle?: string;
  customDescription?: string;
  customTags?: string[];
  customImage?: string;
  order?: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  stargazersCount: number;
  language: string;
  updatedAt: string;
}

interface CustomProject {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  order: number;
}

interface Profile {
  name: string;
  bio: string;
  skills: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [githubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const [repoConfigs, setRepoConfigs] = useState<Record<string, RepoConfig>>({});
  const [customProjects, setCustomProjects] = useState<CustomProject[]>([]);
  const [profile, setProfile] = useState<Profile>({ name: '', bio: '', skills: [], socialLinks: { github: '', linkedin: '', email: '' } });
  const [activeTab, setActiveTab] = useState<'repos' | 'custom' | 'profile'>('repos');
  
  const [editingRepo, setEditingRepo] = useState<string | null>(null);
  const [repoConfigEdit, setRepoConfigEdit] = useState<RepoConfig>({});

  const [editingCustomProject, setEditingCustomProject] = useState<{ index: number; project: CustomProject } | null>(null);
  const [newCustomProject, setNewCustomProject] = useState<CustomProject>({
    title: '', description: '', techStack: [], github: '', demo: '', image: '', featured: false, order: 999
  });

  const [editingProfile, setEditingProfile] = useState<Profile>({ name: '', bio: '', skills: [], socialLinks: { github: '', linkedin: '', email: '' } });

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [githubRes, configRes] = await Promise.all([
        fetch('/api/github/repos'),
        fetch('/api/admin/config')
      ]);
      
      const githubData = await githubRes.json();
      const configData = await configRes.json();
      
      setGitHubRepos(githubData);
      setRepoConfigs(configData.repoConfig || {});
      setCustomProjects(configData.customProjects || []);
      setProfile(configData.profile || { name: '', bio: '', skills: [], socialLinks: { github: '', linkedin: '', email: '' } });
      setEditingProfile(configData.profile || { name: '', bio: '', skills: [], socialLinks: { github: '', linkedin: '', email: '' } });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const updateRepoConfig = async (repoName: string, config: RepoConfig) => {
    await fetch('/api/admin/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateRepoConfig', repoName, config })
    });
    fetchData();
  };

  const saveCustomProject = async () => {
    if (editingCustomProject) {
      await fetch('/api/admin/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateCustomProject', index: editingCustomProject.index, config: newCustomProject })
      });
    } else {
      await fetch('/api/admin/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addCustomProject', config: newCustomProject })
      });
    }
    setEditingCustomProject(null);
    setNewCustomProject({ title: '', description: '', techStack: [], github: '', demo: '', image: '', featured: false, order: 999 });
    fetchData();
  };

  const deleteCustomProject = async (index: number) => {
    await fetch('/api/admin/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deleteCustomProject', index })
    });
    fetchData();
  };

  const saveProfile = async () => {
    await fetch('/api/admin/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateProfile', config: editingProfile })
    });
    fetchData();
  };

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
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-tertiary/10 text-tertiary font-mono-tactical font-bold uppercase tracking-widest hover:bg-tertiary/20 transition-all text-xs"
              >
                _ [SIGN_OUT]
              </button>
            </div>
          </div>
        </section>

        <div className="flex gap-2 mb-8 border-b border-outline-variant/20">
          {(['repos', 'custom', 'profile'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-mono-tactical text-xs uppercase tracking-widest transition-colors ${
                activeTab === tab 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab === 'repos' ? 'GitHub Repos' : tab === 'custom' ? 'Custom Projects' : 'Profile'}
            </button>
          ))}
        </div>

        {activeTab === 'repos' && (
          <div className="space-y-4">
            <div className="bg-surface-container p-4">
              <h2 className="font-headline font-bold uppercase tracking-widest text-sm mb-4">
                Repository Visibility Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                {githubRepos.map((repo) => {
                  const config = repoConfigs[repo.name] || {};
                  return (
                    <div 
                      key={repo.id}
                      className={`bg-surface-container-low p-4 border ${
                        config.featured ? 'border-primary' : config.visible === false ? 'border-tertiary/30' : 'border-outline-variant/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-headline font-bold text-sm truncate" title={repo.name}>
                          {config.customTitle || repo.name}
                        </h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingRepo(repo.name);
                              setRepoConfigEdit(config);
                            }}
                            className="material-symbols-outlined text-sm text-on-surface-variant hover:text-primary"
                          >
                            edit
                          </button>
                        </div>
                      </div>
                      {config.customDescription ? (
                        <p className="text-[10px] text-on-surface-variant mb-2 line-clamp-2">{config.customDescription}</p>
                      ) : repo.description ? (
                        <p className="text-[10px] text-on-surface-variant mb-2 line-clamp-2">{repo.description}</p>
                      ) : null}
                      <div className="flex items-center gap-2 text-[10px] font-mono-tactical">
                        <button
                          onClick={() => updateRepoConfig(repo.name, { visible: config.visible === false ? true : false })}
                          className={`px-2 py-0.5 border ${config.visible === false ? 'border-tertiary text-tertiary' : 'border-primary text-primary'}`}
                        >
                          {config.visible === false ? 'Hidden' : 'Visible'}
                        </button>
                        <button
                          onClick={() => updateRepoConfig(repo.name, { featured: !config.featured })}
                          className={`px-2 py-0.5 border ${config.featured ? 'border-secondary text-secondary' : 'border-outline-variant text-on-surface-variant'}`}
                        >
                          {config.featured ? 'Featured' : 'Normal'}
                        </button>
                        <span className="text-on-surface-variant">
                          {repo.stargazersCount} ⭐
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {editingRepo && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-surface-container p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                  <h3 className="font-headline font-bold uppercase tracking-widest text-sm mb-4">
                    Edit: {editingRepo}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Custom Title</label>
                      <input
                        value={repoConfigEdit.customTitle || ''}
                        onChange={(e) => setRepoConfigEdit({ ...repoConfigEdit, customTitle: e.target.value })}
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Custom Description</label>
                      <textarea
                        value={repoConfigEdit.customDescription || ''}
                        onChange={(e) => setRepoConfigEdit({ ...repoConfigEdit, customDescription: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary font-body text-sm p-2"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Custom Tags (comma separated)</label>
                      <input
                        value={repoConfigEdit.customTags?.join(', ') || ''}
                        onChange={(e) => setRepoConfigEdit({ ...repoConfigEdit, customTags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Custom Image URL</label>
                      <input
                        value={repoConfigEdit.customImage || ''}
                        onChange={(e) => setRepoConfigEdit({ ...repoConfigEdit, customImage: e.target.value })}
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Order (lower = first)</label>
                      <input
                        type="number"
                        value={repoConfigEdit.order ?? 999}
                        onChange={(e) => setRepoConfigEdit({ ...repoConfigEdit, order: parseInt(e.target.value) || 999 })}
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          updateRepoConfig(editingRepo, repoConfigEdit);
                          setEditingRepo(null);
                        }}
                        className="flex-1 py-2 bg-primary text-on-primary font-mono-tactical font-bold uppercase tracking-widest text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRepo(null)}
                        className="flex-1 py-2 border border-outline-variant text-on-surface-variant font-mono-tactical font-bold uppercase tracking-widest text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="bg-surface-container p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline font-bold uppercase tracking-widest text-sm">
                  Custom Projects
                </h2>
                <button
                  onClick={() => {
                    setEditingCustomProject(null);
                    setNewCustomProject({ title: '', description: '', techStack: [], github: '', demo: '', image: '', featured: false, order: 999 });
                  }}
                  className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 font-mono-tactical uppercase"
                >
                  + Add Project
                </button>
              </div>
              
              {customProjects.length === 0 ? (
                <p className="text-on-surface-variant text-sm">No custom projects yet. Click "Add Project" to create one.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customProjects.map((project, index) => (
                    <div key={index} className="bg-surface-container-low p-4 border border-outline-variant/20">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-headline font-bold text-sm">{project.title}</h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingCustomProject({ index, project });
                              setNewCustomProject(project);
                            }}
                            className="material-symbols-outlined text-sm text-on-surface-variant hover:text-primary"
                          >
                            edit
                          </button>
                          <button
                            onClick={() => deleteCustomProject(index)}
                            className="material-symbols-outlined text-sm text-on-surface-variant hover:text-tertiary"
                          >
                            delete
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono-tactical text-secondary-dim">#{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(editingCustomProject || newCustomProject.title) && (
              <div className="bg-surface-container p-4">
                <h3 className="font-headline font-bold uppercase tracking-widest text-sm mb-4">
                  {editingCustomProject ? 'Edit' : 'Add'} Custom Project
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Title</label>
                    <input
                      value={newCustomProject.title}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, title: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Tech Stack (comma separated)</label>
                    <input
                      value={newCustomProject.techStack.join(', ')}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">GitHub URL</label>
                    <input
                      value={newCustomProject.github}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, github: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Demo URL</label>
                    <input
                      value={newCustomProject.demo}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, demo: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Image URL</label>
                    <input
                      value={newCustomProject.image}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, image: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Order (lower = first)</label>
                    <input
                      type="number"
                      value={newCustomProject.order}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, order: parseInt(e.target.value) || 999 })}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Description</label>
                    <textarea
                      value={newCustomProject.description}
                      onChange={(e) => setNewCustomProject({ ...newCustomProject, description: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary font-body text-sm p-2"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newCustomProject.featured}
                        onChange={(e) => setNewCustomProject({ ...newCustomProject, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="font-mono-tactical text-xs uppercase">Featured</span>
                    </label>
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button
                      onClick={saveCustomProject}
                      className="flex-1 py-3 bg-primary text-on-primary font-mono-tactical font-bold uppercase tracking-widest text-xs"
                    >
                      Save Project
                    </button>
                    <button
                      onClick={() => {
                        setEditingCustomProject(null);
                        setNewCustomProject({ title: '', description: '', techStack: [], github: '', demo: '', image: '', featured: false, order: 999 });
                      }}
                      className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-mono-tactical font-bold uppercase tracking-widest text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-surface-container p-4">
            <h2 className="font-headline font-bold uppercase tracking-widest text-sm mb-4">
              Profile Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Name</label>
                <input
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                />
              </div>
              <div>
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">GitHub</label>
                <input
                  value={editingProfile.socialLinks?.github || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, socialLinks: { ...editingProfile.socialLinks, github: e.target.value } })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                />
              </div>
              <div>
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">LinkedIn</label>
                <input
                  value={editingProfile.socialLinks?.linkedin || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, socialLinks: { ...editingProfile.socialLinks, linkedin: e.target.value } })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                />
              </div>
              <div>
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Email</label>
                <input
                  value={editingProfile.socialLinks?.email || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, socialLinks: { ...editingProfile.socialLinks, email: e.target.value } })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Bio</label>
                <textarea
                  value={editingProfile.bio}
                  onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary font-body text-sm p-2"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">Skills (comma separated)</label>
                <input
                  value={editingProfile.skills?.join(', ') || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-mono-tactical text-sm py-2"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={saveProfile}
                  className="w-full py-3 bg-primary text-on-primary font-mono-tactical font-bold uppercase tracking-widest text-xs"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}