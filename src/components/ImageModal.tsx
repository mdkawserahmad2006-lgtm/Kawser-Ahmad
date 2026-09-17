import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Palette, CheckCircle, Sparkles, Image as ImageIcon, Globe, RefreshCw } from 'lucide-react';
import { ProjectItem } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';

interface ImageModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ project, onClose }) => {
  const [viewMode, setViewMode] = useState<'embed' | 'image'>('embed');
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  // Extract Behance Project ID from gallery URL
  const getBehanceId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:gallery|project|embed\/project)\/(\d+)/i);
    return match ? match[1] : null;
  };

  const behanceId = project ? getBehanceId(project.liveUrl) : null;
  const isBehance = Boolean(behanceId);

  useEffect(() => {
    // Reset view mode when project changes
    setViewMode(isBehance ? 'embed' : 'image');
    setIframeLoading(true);
  }, [project, isBehance]);

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

  const embedUrl = behanceId
    ? `https://www.behance.net/embed/project/${behanceId}?ilo0=1`
    : null;

  return (
    <div
      id="image-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[920px] rounded-2xl sm:rounded-3xl bg-[#081226] border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-cyan-500/20 bg-[#050e20]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Palette className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">{project.title}</h3>
                {isBehance && (
                  <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 py-0.5 rounded">
                    <Sparkles className="w-2.5 h-2.5" />
                    Behance In-App Review
                  </span>
                )}
              </div>
              <p className="text-xs text-cyan-400 truncate">
                Client: {project.client || 'Agency & Commercial Showcase'}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* View Mode Switcher for Behance Projects */}
            {isBehance && (
              <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#03152a] border border-cyan-500/25">
                <button
                  type="button"
                  onClick={() => setViewMode('embed')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'embed'
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Behance Embed</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('image')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'image'
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Artwork</span>
                </button>
              </div>
            )}

            {/* External Behance Link */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c2444] hover:bg-[#123666] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold transition-all"
                title="Open directly on Behance.net in a new tab"
              >
                <span>Behance ↗</span>
              </a>
            )}

            {/* Close Button */}
            <button
              id="close-image-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Switcher (when small screen) */}
        {isBehance && (
          <div className="flex sm:hidden items-center justify-between px-4 py-2 bg-[#041428] border-b border-cyan-500/20 text-xs">
            <span className="text-cyan-300 text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Live In-App Project Viewer
            </span>
            <div className="flex items-center gap-1 bg-[#020b16] p-0.5 rounded-lg border border-cyan-500/20">
              <button
                type="button"
                onClick={() => setViewMode('embed')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  viewMode === 'embed' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Embed
              </button>
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  viewMode === 'image' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Artwork
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <div className="relative flex-1 bg-[#020712] overflow-hidden flex flex-col">
          {isBehance && viewMode === 'embed' && embedUrl ? (
            <div className="relative w-full h-full flex flex-col bg-[#020712]">
              {/* Informative Sub-header */}
              <div className="px-4 py-1.5 bg-[#03152a] border-b border-cyan-500/20 flex items-center justify-between text-[11px] text-cyan-300/90">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Viewing full Behance project presentation interactively inside this app.
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-cyan-400 font-semibold flex items-center gap-1"
                  >
                    Open on Behance <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Interactive Iframe Viewer */}
              <div className="relative flex-1 w-full h-full min-h-[320px]">
                {iframeLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#020712] gap-3">
                    <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                    <p className="text-xs text-cyan-300 font-medium">Loading Behance project presentation...</p>
                  </div>
                )}
                <iframe
                  src={embedUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          ) : (
            /* High-Res Image View */
            <div className="relative flex-1 bg-black/60 overflow-auto flex items-center justify-center p-4">
              <img
                src={getOptimizedCover(project)}
                alt={project.title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>

        {/* Info & Details Footer */}
        <div className="p-4 sm:p-5 bg-[#041224] border-t border-cyan-500/25 flex-shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl line-clamp-2">
              {project.details || project.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-blue-950/50 transition-all group flex-shrink-0"
                >
                  <span>View on Behance.net</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {project.metrics?.results && (
                <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold bg-cyan-950/70 border border-cyan-500/30 px-3 py-2 rounded-xl flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>{project.metrics.results}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-cyan-500/15">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[11px] font-medium rounded-lg bg-[#061d36] border border-cyan-500/20 text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
