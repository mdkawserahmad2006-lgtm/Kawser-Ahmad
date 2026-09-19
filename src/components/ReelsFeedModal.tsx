import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Volume2,
  VolumeX,
  Film,
  Palette,
  TrendingUp,
  Play,
  Check,
} from 'lucide-react';
import { ProjectItem, ProjectCategory, ProfileData } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';

interface ReelsFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject: ProjectItem | null;
  projects: ProjectItem[];
  profile: ProfileData;
}

export const ReelsFeedModal: React.FC<ReelsFeedModalProps> = ({
  isOpen,
  onClose,
  initialProject,
  projects,
  profile,
}) => {
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all');
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter queue
  const filteredProjects = useMemo(() => {
    if (filterCategory === 'all') return projects;
    return projects.filter((p) => p.category === filterCategory);
  }, [projects, filterCategory]);

  // When opening or switching initial project, scroll to that item
  useEffect(() => {
    if (isOpen && initialProject) {
      let targetIdx = filteredProjects.findIndex((p) => p.id === initialProject.id);
      if (targetIdx === -1) {
        setFilterCategory('all');
        targetIdx = projects.findIndex((p) => p.id === initialProject.id);
      }
      if (targetIdx !== -1) {
        setActiveIndex(targetIdx);
        setTimeout(() => {
          itemRefs.current[targetIdx]?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 60);
      }
    }
  }, [isOpen, initialProject]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // IntersectionObserver to detect which reel is snapped into view
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const indexStr = entry.target.getAttribute('data-index');
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: [0.55, 0.75],
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpen, filteredProjects]);

  // Keyboard navigation (ArrowUp, ArrowDown, Escape)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredProjects.length]);

  const scrollToIndex = (idx: number) => {
    if (idx < 0 || idx >= filteredProjects.length) return;
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLike = (id: string) => {
    setLikedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 48) + (likedProjects[id] ? -1 : 1),
    }));
  };

  const handleShare = (project: ProjectItem) => {
    const shareText = `Check out "${project.title}" by Md Kawser Ahmad (Kawser Theory): ${project.liveUrl || project.videoUrl || window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = (project: ProjectItem) => {
    const cleanPhone = (profile.whatsappNumber || '8801953941415').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello Md Kawser Ahmad, I'm watching your reel "${project.title}" and would like to hire you for a similar project.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Embed helpers
  const getYouTubeEmbedUrl = (url: string, isActive: boolean) => {
    let embedUrl = url;
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1]?.split('?')[0]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }
    const sep = embedUrl.includes('?') ? '&' : '?';
    return `${embedUrl}${sep}autoplay=${isActive ? '1' : '0'}&mute=${isMuted ? '1' : '0'}&loop=1&playsinline=1&controls=1&rel=0`;
  };

  const getVimeoEmbedUrl = (url: string, isActive: boolean) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const id = match && match[1] ? match[1] : '1226511604';
    return `https://player.vimeo.com/video/${id}?autoplay=${isActive ? '1' : '0'}&muted=${isMuted ? '1' : '0'}&loop=1&badge=0&autopause=1`;
  };

  if (!isOpen) return null;

  return (
    <div
      id="reels-feed-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
    >
      {/* 
        Native Reel Scroll Frame:
        Full viewport on mobile (100dvh) with vertical snap scroll.
        Comfortable reels frame on desktop (480px width, 94vh height) with snap scroll.
      */}
      <div className="relative w-full h-[100dvh] sm:h-[94vh] sm:max-h-[920px] sm:w-[480px] sm:rounded-3xl bg-black border-0 sm:border sm:border-sky-500/30 overflow-hidden flex flex-col shadow-2xl">
        
        {/* ========================================================================= */}
        {/* TOP BAR OVERLAY: Category Tabs & Exit Button                             */}
        {/* ========================================================================= */}
        <div className="absolute top-0 inset-x-0 z-40 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <button
              onClick={() => {
                setFilterCategory('all');
                setTimeout(() => scrollToIndex(0), 50);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-black shadow'
                  : 'bg-black/60 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterCategory('video');
                setTimeout(() => scrollToIndex(0), 50);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                filterCategory === 'video'
                  ? 'bg-sky-400 text-slate-950 shadow'
                  : 'bg-black/60 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Reels</span>
            </button>
            <button
              onClick={() => {
                setFilterCategory('graphics');
                setTimeout(() => scrollToIndex(0), 50);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                filterCategory === 'graphics'
                  ? 'bg-cyan-400 text-slate-950 shadow'
                  : 'bg-black/60 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>Graphics</span>
            </button>
            <button
              onClick={() => {
                setFilterCategory('meta');
                setTimeout(() => scrollToIndex(0), 50);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                filterCategory === 'meta'
                  ? 'bg-emerald-400 text-slate-950 shadow'
                  : 'bg-black/60 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Meta</span>
            </button>
          </div>

          {/* Right Info: Counter & Close */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-white/90 bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
              {activeIndex + 1} / {filteredProjects.length}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/70 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              title="Close (Esc)"
              aria-label="Close reels feed"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NATIVE VERTICAL SNAP SCROLL CONTAINER (Exact Reels / TikTok Behavior)      */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project, index) => {
            const isCurrent = activeIndex === index;
            const isVideo = project.category === 'video' || Boolean(project.videoUrl);
            const isGraphics = project.category === 'graphics';
            const isMeta = project.category === 'meta';

            const isYouTube =
              project.videoUrl?.includes('youtube.com') ||
              project.videoUrl?.includes('youtu.be');
            const isVimeo = project.videoUrl?.includes('vimeo.com');

            return (
              <div
                key={project.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="snap-start snap-always w-full h-[100dvh] sm:h-[94vh] sm:max-h-[920px] relative flex items-center justify-center bg-black overflow-hidden flex-shrink-0"
              >
                {/* 1. Video Player */}
                {isVideo && (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    {isYouTube ? (
                      <iframe
                        src={getYouTubeEmbedUrl(project.videoUrl || '', isCurrent)}
                        title={project.title}
                        className="w-full h-full object-cover border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : isVimeo ? (
                      <iframe
                        src={getVimeoEmbedUrl(project.videoUrl || '', isCurrent)}
                        title={project.title}
                        className="w-full h-full object-cover border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-16 h-16 text-white/80" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Graphic Design Full Art */}
                {isGraphics && (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#020712] p-2">
                    <img
                      src={getOptimizedCover(project)}
                      alt={project.title}
                      className="w-full h-full object-contain max-h-[85vh]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-16 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        <span>Behance Artwork</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Meta Ad Campaign */}
                {isMeta && (
                  <div className="relative w-full h-full flex flex-col justify-center p-6 bg-gradient-to-br from-[#061e38] via-[#020b18] to-[#010610]">
                    <div className="relative z-10 max-w-sm mx-auto w-full p-6 rounded-3xl bg-[#03152a]/95 border border-sky-500/30 shadow-2xl flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                          Meta Ad Campaign
                        </span>
                        {project.metrics?.roas && (
                          <span className="px-3 py-1 rounded-xl text-sm font-black bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950">
                            {project.metrics.roas}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold text-white mb-1.5">{project.title}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>
                      </div>

                      {project.metrics && (
                        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#010a17] border border-sky-500/20 text-xs">
                          {project.metrics.spend && (
                            <div>
                              <span className="text-[10px] text-slate-400 block">Ad Spend</span>
                              <span className="font-bold text-sky-300">{project.metrics.spend}</span>
                            </div>
                          )}
                          {project.metrics.results && (
                            <div>
                              <span className="text-[10px] text-slate-400 block">Key Result</span>
                              <span className="font-bold text-emerald-400">{project.metrics.results}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => handleWhatsApp(project)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Discuss This Campaign</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Shadow Overlay for text readability */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20" />

                {/* ========================================================================= */}
                {/* BOTTOM LEFT: LOGO ON THE LEFT, NAME ON THE SIDE (User Requested Layout)   */}
                {/* ========================================================================= */}
                <div className="absolute bottom-5 left-4 right-18 z-30 pointer-events-auto">
                  {/* Creator Pill: Logo on the LEFT, Name on the SIDE */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src="/profile.png"
                      alt={profile.name}
                      className="w-9 h-9 rounded-full border border-sky-400/70 object-cover shadow-md flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">
                        {profile.name}
                      </span>
                      <span className="text-[10px] text-sky-300 font-medium leading-tight">
                        {project.category === 'video'
                          ? 'Video Editor • Motion'
                          : project.category === 'graphics'
                          ? 'Graphic Designer'
                          : 'Meta Ads Specialist'}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow mb-1 line-clamp-1">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-white/85 line-clamp-2 leading-relaxed mb-2 drop-shadow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-sky-200 border border-white/15 backdrop-blur-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* RIGHT ACTION COLUMN: Like, Chat, Link, Sound, Up/Down Nav                */}
                {/* ========================================================================= */}
                <div className="absolute right-3 bottom-6 z-30 flex flex-col items-center gap-3.5">
                  {/* Heart / Like */}
                  <button
                    onClick={() => handleLike(project.id)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    title="Like"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-75 ${
                        likedProjects[project.id]
                          ? 'bg-rose-600 border-rose-500 text-white shadow-lg'
                          : 'bg-black/60 hover:bg-black/80 border-white/20 text-white'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedProjects[project.id] ? 'fill-white' : ''
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow">
                      {likeCounts[project.id] || 48}
                    </span>
                  </button>

                  {/* Direct WhatsApp Chat */}
                  <button
                    onClick={() => handleWhatsApp(project)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    title="Hire on WhatsApp"
                  >
                    <div className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-75">
                      <MessageCircle className="w-5 h-5 fill-slate-950" />
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow">Chat</span>
                  </button>

                  {/* Behance or External Link */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                      title="Open Behance"
                    >
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-75">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-white drop-shadow">Link</span>
                    </a>
                  )}

                  {/* Mute/Sound Toggle (Videos) */}
                  {isVideo && (
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      title={isMuted ? 'Turn on sound' : 'Mute sound'}
                    >
                      <div className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform active:scale-75">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-sky-400" />}
                      </div>
                      <span className="text-[10px] font-bold text-white drop-shadow">
                        {isMuted ? 'Mute' : 'Sound'}
                      </span>
                    </button>
                  )}

                  {/* Share / Copy */}
                  <button
                    onClick={() => handleShare(project)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    title="Share project"
                  >
                    <div className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform active:scale-75">
                      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow">
                      {copied ? 'Copied' : 'Share'}
                    </span>
                  </button>

                  {/* Navigation Chevrons (Previous / Next Reel) */}
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-white/15">
                    <button
                      onClick={() => scrollToIndex(index - 1)}
                      disabled={index === 0}
                      className="w-9 h-9 rounded-full bg-black/70 hover:bg-sky-500/30 disabled:opacity-30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Previous Reel"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => scrollToIndex(index + 1)}
                      disabled={index === filteredProjects.length - 1}
                      className="w-9 h-9 rounded-full bg-black/70 hover:bg-sky-500/30 disabled:opacity-30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Next Reel (Swipe Up)"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
