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
          {project.coverImage ? (
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 max-h-56">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            /* Dedicated Meta Marketing Strategy & Funnel Blueprint (No Graphic Poster) */
            <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#071d3a] via-[#031024] to-[#010612] border border-cyan-500/30">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-sky-500/20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                    Meta Ads Manager Campaign Blueprint
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  CAPI 100% Match Rate
                </span>
              </div>

              {/* Multi-tier Funnel Flow Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2">
                <div className="p-3 rounded-xl bg-[#020b18]/80 border border-sky-500/20">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phase 1: TOF (Top-of-Funnel)</div>
                  <div className="text-xs font-semibold text-white">Advantage+ & Broad Targeting</div>
                  <div className="text-[10px] text-sky-300 mt-1">Hook retention & mass testing</div>
                </div>

                <div className="p-3 rounded-xl bg-[#020b18]/80 border border-sky-500/20">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phase 2: MOF (Mid-Funnel)</div>
                  <div className="text-xs font-semibold text-white">Custom Audience Retargeting</div>
                  <div className="text-[10px] text-emerald-400 mt-1">High-intent nurture & leads</div>
                </div>

                <div className="p-3 rounded-xl bg-[#020b18]/80 border border-sky-500/20">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phase 3: BOF (Conversions)</div>
                  <div className="text-xs font-semibold text-white">Direct Purchase & Scale</div>
                  <div className="text-[10px] text-cyan-300 mt-1">Max ROAS & dynamic catalog</div>
                </div>
              </div>
            </div>
          )}

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
