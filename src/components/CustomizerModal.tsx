import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Link as LinkIcon, Save, RotateCcw, Plus, Trash2, Check, Video, Palette, TrendingUp, Sparkles } from 'lucide-react';
import { ProfileData, ProjectItem } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSaveProfile: (profile: ProfileData) => void;
  projects: ProjectItem[];
  onSaveProjects: (projects: ProjectItem[]) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  projects,
  onSaveProjects,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'watermark'>('profile');
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);
  const [tempProjects, setTempProjects] = useState<ProjectItem[]>(projects);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New project draft state
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    client: 'Client Name',
    tags: ['Video Editing', 'Premiere Pro'],
    metrics: { roas: '4.2X', results: '1M+ Views' }
  });

  if (!isOpen) return null;

  // Handle local image file upload
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'watermarkUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setTempProfile(prev => ({
            ...prev,
            [field]: result,
            ...(field === 'avatarUrl' && !prev.watermarkUrl ? { watermarkUrl: result } : {})
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSaveProfile(tempProfile);
    onSaveProjects(tempProjects);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleAddProject = () => {
    if (!newProject.title) return;
    const initialCover = newProject.coverImage || (newProject.liveUrl ? getOptimizedCover({ liveUrl: newProject.liveUrl, category: newProject.category as any }) : '/profile.png');
    const createdItem: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: newProject.title || 'Untitled Project',
      category: (newProject.category as any) || 'video',
      categoryLabel: newProject.category === 'video' ? 'Video Editing' : newProject.category === 'graphics' ? 'Graphic Design' : 'Meta Marketing',
      description: newProject.description || 'Custom added showcase item.',
      coverImage: getOptimizedCover({ coverImage: initialCover, liveUrl: newProject.liveUrl, category: newProject.category as any }),
      videoUrl: newProject.videoUrl || '',
      liveUrl: newProject.liveUrl || '',
      client: newProject.client || 'Verified Client',
      tags: newProject.tags || ['Creative'],
      metrics: newProject.metrics || { results: 'Success' },
      date: '2026'
    };

    setTempProjects([createdItem, ...tempProjects]);
    setNewProject({
      title: '',
      category: 'video',
      categoryLabel: 'Video Editing',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
      videoUrl: '',
      client: '',
      tags: ['Video', 'Portfolio'],
      metrics: { results: 'Live' }
    });
  };

  const handleDeleteProject = (id: string) => {
    setTempProjects(tempProjects.filter(p => p.id !== id));
  };

  return (
    <div
      id="customizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#031322] border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#020d18] border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">Profile, Media, Logo & Links Customizer</h2>
              <p className="text-xs text-cyan-400">Easily update and persist your profile photo, watermark, and portfolio video links</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-[#061b2e] rounded-full"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-cyan-500/20 bg-[#020e1a] px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Profile Photo & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('watermark')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'watermark'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Brand Logo & Watermark</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Showcase & Video Links ({tempProjects.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#02101e]/80">
          
          {/* TAB 1: Profile Details & Picture */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Profile Photo Preview & Upload */}
              <div className="p-5 rounded-2xl bg-[#041a2e] border border-cyan-500/20 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/40 flex-shrink-0 bg-black">
                  <img
                    src={tempProfile.avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-white">Profile Photo (Left Column in Hero)</h4>
                  <p className="text-xs text-slate-400">
                    Upload an image from your device or paste any direct public image URL:
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'avatarUrl')}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setTempProfile(prev => ({ ...prev, watermarkUrl: prev.avatarUrl }))}
                      className="px-3 py-2 rounded-xl bg-[#062238] hover:bg-[#092d4a] text-slate-300 text-xs font-semibold transition-colors border border-cyan-500/20"
                    >
                      Sync as Watermark Also
                    </button>
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] text-slate-400 block mb-1">Or paste direct image URL:</label>
                    <input
                      type="url"
                      value={tempProfile.avatarUrl}
                      onChange={(e) => setTempProfile({ ...tempProfile, avatarUrl: e.target.value })}
                      placeholder="https://example.com/my-photo.jpg"
                      className="w-full px-3 py-2 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Names & Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    value={tempProfile.title}
                    onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Biography</label>
                <textarea
                  rows={2}
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white resize-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number (with Country Code) *</label>
                  <input
                    type="text"
                    value={tempProfile.whatsappNumber}
                    onChange={(e) => setTempProfile({ ...tempProfile, whatsappNumber: e.target.value })}
                    placeholder="+8801953941415"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white"
                  />
                </div>
              </div>

              {/* CV / Resume URL Link Input */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1.5 flex items-center justify-between">
                  <span>CV / Resume URL (Google Drive, Dropbox or PDF Link)</span>
                  <span className="text-[10px] text-navy-steel font-normal">Directly downloadable from website</span>
                </label>
                <input
                  type="url"
                  value={tempProfile.resumeUrl || ''}
                  onChange={(e) => setTempProfile({ ...tempProfile, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/... or your custom CV PDF link"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/30 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
                <p className="text-[11px] text-navy-mist mt-1">
                  Leave empty to use the built-in printable CV generator, or paste your Google Drive / Dropbox link anytime.
                </p>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Experience</label>
                  <input
                    type="text"
                    value={tempProfile.experienceYears}
                    onChange={(e) => setTempProfile({ ...tempProfile, experienceYears: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Completed Projects</label>
                  <input
                    type="text"
                    value={tempProfile.completedProjects}
                    onChange={(e) => setTempProfile({ ...tempProfile, completedProjects: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Avg ROAS</label>
                  <input
                    type="text"
                    value={tempProfile.avgRoas}
                    onChange={(e) => setTempProfile({ ...tempProfile, avgRoas: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Satisfaction Rate</label>
                  <input
                    type="text"
                    value={tempProfile.clientSatisfaction}
                    onChange={(e) => setTempProfile({ ...tempProfile, clientSatisfaction: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Watermark & Brand Logo */}
          {activeTab === 'watermark' && (
            <div className="space-y-6">
              
              {/* Corner Brand Logo Settings */}
              <div className="p-5 rounded-2xl bg-[#041a2e] border border-cyan-500/20 space-y-4">
                <h4 className="text-sm font-bold text-white">Top-Left Corner Brand Identity</h4>
                <p className="text-xs text-slate-400">
                  Controls the navbar logo text and tagline displayed across the site:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={tempProfile.logoText}
                      onChange={(e) => setTempProfile({ ...tempProfile, logoText: e.target.value })}
                      placeholder="KAWSER"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={tempProfile.logoSubtext}
                      onChange={(e) => setTempProfile({ ...tempProfile, logoSubtext: e.target.value })}
                      placeholder="THEORY"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Watermark Image Settings */}
              <div className="p-5 rounded-2xl bg-[#041a2e] border border-cyan-500/20 space-y-4">
                <h4 className="text-sm font-bold text-white">Background Watermark Art</h4>
                <p className="text-xs text-slate-400">
                  Your profile portrait rendered subtly in the background ambient layers:
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Watermark Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'watermarkUrl')}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setTempProfile(prev => ({ ...prev, watermarkUrl: prev.avatarUrl }))}
                    className="px-3 py-2 rounded-xl bg-[#062238] hover:bg-[#092d4a] text-slate-300 text-xs font-semibold transition-colors border border-cyan-500/20"
                  >
                    Sync Profile Image to Watermark
                  </button>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] text-slate-400 block mb-1">Or paste watermark image direct URL:</label>
                  <input
                    type="url"
                    value={tempProfile.watermarkUrl}
                    onChange={(e) => setTempProfile({ ...tempProfile, watermarkUrl: e.target.value })}
                    placeholder="https://example.com/watermark.jpg"
                    className="w-full px-3 py-2 rounded-lg bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Projects & Video Links Manager */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              {/* Add New Project Box */}
              <div className="p-5 rounded-2xl bg-[#041a2e] border border-cyan-500/30 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Add New Project / Video Link</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Nike Commercial Reel"
                      className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                    >
                      <option value="video">Video Editing</option>
                      <option value="graphics">Graphic Design</option>
                      <option value="meta">Meta Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client / Brand</label>
                    <input
                      type="text"
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      placeholder="Client Name"
                      className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Video Stream Link (YouTube, Vimeo, or MP4) *</label>
                    <input
                      type="url"
                      value={newProject.videoUrl}
                      onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=... or direct .mp4"
                      className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Thumbnail URL *</label>
                    <input
                      type="url"
                      value={newProject.coverImage}
                      onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brief Description</label>
                  <input
                    type="text"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Short summary of goals and deliverables..."
                    className="w-full px-3 py-2 rounded-xl bg-[#020e1a] border border-cyan-500/20 text-xs text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={!newProject.title}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project to Showcase</span>
                </button>
              </div>

              {/* Existing Projects List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Portfolio Items:</h4>
                {tempProjects.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#041a2e] border border-cyan-500/20 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#020b18] border border-sky-500/20 flex-shrink-0 flex items-center justify-center">
                        {getOptimizedCover(item) ? (
                          <img
                            src={getOptimizedCover(item)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white line-clamp-1">{item.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-cyan-400">
                          <span>{item.categoryLabel}</span>
                          {item.videoUrl && <span className="text-[10px] text-emerald-400 font-semibold">• Video Attached</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#020d18] border-t border-cyan-500/20">
          <button
            onClick={onResetDefaults}
            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-[#041525] border border-cyan-500/20 flex items-center gap-1.5 transition-colors"
            title="Reset to default data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#061e33]"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAll}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
