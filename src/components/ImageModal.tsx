import React, { useEffect } from 'react';
import { X, ExternalLink, Palette, Tag, CheckCircle } from 'lucide-react';
import { ProjectItem } from '../types';

interface ImageModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ project, onClose }) => {
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
      id="image-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#0a1329] border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#070e22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{project.title}</h3>
              <p className="text-xs text-cyan-400">{project.client || 'Graphic Design Showcase'}</p>
            </div>
          </div>
          <button
            id="close-image-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative flex-1 bg-black/50 overflow-auto flex items-center justify-center p-2 min-h-[300px]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Info & Details */}
        <div className="p-5 bg-[#031322] border-t border-cyan-500/20 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.details || project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#041a2e] border border-cyan-500/20 text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.metrics?.results && (
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>{project.metrics.results}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
