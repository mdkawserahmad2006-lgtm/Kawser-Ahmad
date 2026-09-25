import React, { useEffect } from 'react';
import { X, ExternalLink, Film, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
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

  // Detect video embed type
  const isYouTube = project.videoUrl?.includes('youtube.com') || project.videoUrl?.includes('youtu.be');
  const isVimeo = project.videoUrl?.includes('vimeo.com');

  const isVertical = project.isVertical || project.aspectRatio === '9:16' || project.videoUrl?.includes('1226511604');

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed/')) return url;
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    if (url.includes('player.vimeo.com/video/')) {
      return url.includes('autoplay=') ? url : `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
    }
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1&badge=0&autopause=0`;
    }
    return url;
  };

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${isVertical ? 'max-w-md' : 'max-w-4xl'} rounded-3xl bg-[#081a32] border border-sky-500/40 shadow-2xl shadow-sky-950/80 overflow-hidden flex flex-col max-h-[94vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sky-900/50 bg-[#041224]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{project.title}</h3>
              <p className="text-xs text-sky-400">{project.client || 'Kawser Theory Showreel'}</p>
            </div>
          </div>
          <button
            id="close-video-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container (Handles both 9:16 vertical reels and 16:9 widescreen) */}
        <div className={`relative w-full ${isVertical ? 'aspect-[9/16] max-h-[66vh]' : 'aspect-video'} bg-black flex items-center justify-center overflow-hidden`}>
          {project.videoUrl ? (
            isYouTube ? (
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVimeo ? (
              <iframe
                src={getVimeoEmbedUrl(project.videoUrl)}
                title={project.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={project.coverImage}
              >
                Your browser does not support HTML5 video playback.
              </video>
            )
          ) : (
            <div className="text-center p-8 text-slate-400">
              <Film className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-sm">Video link has not been attached yet.</p>
            </div>
          )}
        </div>

        {/* Details & Tags Below Player */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-[#031326]">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.details || project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-sky-900/40">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 text-[11px] font-medium rounded-lg bg-[#06203d] border border-sky-500/25 text-sky-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.metrics?.results && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{project.metrics.results}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
