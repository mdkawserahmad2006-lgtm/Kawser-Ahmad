import React, { useEffect } from 'react';
import { X, TrendingUp, DollarSign, Eye, MousePointerClick, Target, BarChart3, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface MetaCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const MetaCaseStudyModal: React.FC<MetaCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="meta-case-study-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] rounded-3xl bg-[#0a1329] border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#070e22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{project.title}</h3>
              <p className="text-xs text-cyan-400">{project.client || 'Meta Ads Case Study'}</p>
            </div>
          </div>
          <button
            id="close-meta-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign Metrics Cards */}
        <div className="p-5 bg-[#081126] border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.metrics?.roas && (
            <div className="bg-[#0e1c3e] border border-cyan-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
                <Target className="w-3 h-3 text-cyan-400" /> ROAS
              </span>
              <span className="text-xl font-black text-cyan-300">{project.metrics.roas}</span>
            </div>
          )}
          {project.metrics?.spend && (
            <div className="bg-[#0e1c3e] border border-cyan-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-sky-400" /> Ad Spend
              </span>
              <span className="text-xl font-black text-white">{project.metrics.spend}</span>
            </div>
          )}
          {project.metrics?.impressions && (
            <div className="bg-[#0e1c3e] border border-cyan-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
                <Eye className="w-3 h-3 text-blue-400" /> Reach / Imp.
              </span>
              <span className="text-xl font-black text-sky-300">{project.metrics.impressions}</span>
            </div>
          )}
          {project.metrics?.results && (
            <div className="bg-[#0e1c3e] border border-cyan-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-emerald-400" /> Performance
              </span>
              <span className="text-sm font-bold text-emerald-400">{project.metrics.results}</span>
            </div>
          )}
        </div>

        {/* Content & Strategy Details */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#031322]">
          <div className="rounded-2xl overflow-hidden border border-cyan-500/20 max-h-56">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">Campaign Strategy & Architecture</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.details || project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tools, Ad Formats & Tactics</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#041a2e] border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
