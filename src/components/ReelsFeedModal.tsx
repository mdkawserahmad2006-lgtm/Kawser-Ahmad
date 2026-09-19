import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  Sparkles,
  Film,
  Palette,
  TrendingUp,
  Play,
  Check,
  Eye,
  Maximize2
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
  // Category filter in reels view
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all');
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSwipeHint, setShowSwipeHint] = useState<boolean>(true);

  // Filtered queue of projects
  const filteredProjects = useMemo(() => {
    if (filterCategory === 'all') return projects;
    return projects.filter((p) => p.category === filterCategory);
  }, [projects, filterCategory]);

  // Current active index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Touch swipe handling
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync initial project when modal opens
  useEffect(() => {
    if (isOpen && initialProject) {
      // If project has specific category, set filter to that or all
      const foundIdx = filteredProjects.findIndex((p) => p.id === initialProject.id);
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
      } else {
        // Switch to all to ensure it exists
        setFilterCategory('all');
        const allIdx = projects.findIndex((p) => p.id === initialProject.id);
        if (allIdx !== -1) setCurrentIndex(allIdx);
      }
    }
  }, [isOpen, initialProject, filteredProjects, projects]);

  // Handle keys (ArrowUp / ArrowDown / Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    },
    [isOpen, onClose, filteredProjects.length, currentIndex]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Auto-hide swipe hint after 4 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowSwipeHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const goToNext = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const goToPrev = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Wheel scroll on PC (debounced)
  const lastScrollTime = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 450) return;
    if (Math.abs(e.deltaY) > 30) {
      lastScrollTime.current = now;
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Touch Swipe for Mobile (Reels Swipe Up / Down)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const distance = touchStartY.current - touchEndY.current;
    // Swipe Up -> Next
    if (distance > 50) {
      goToNext();
      setShowSwipeHint(false);
    }
    // Swipe Down -> Prev
    else if (distance < -50) {
      goToPrev();
      setShowSwipeHint(false);
    }
  };

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handleLike = (id: string) => {
    setLikedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 48) + (likedProjects[id] ? -1 : 1),
    }));
  };

  const handleShare = () => {
    if (!currentProject) return;
    const shareText = `Check out "${currentProject.title}" by Md Kawser Ahmad (Kawser Theory): ${currentProject.liveUrl || currentProject.videoUrl || window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppInquire = () => {
    if (!currentProject) return;
    const cleanPhone = (profile.whatsappNumber || '8801953941415').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello Md Kawser Ahmad, I saw your reel project "${currentProject.title}" (${currentProject.category.toUpperCase()}) on your portfolio and want to discuss something similar!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Video embed helpers
  const getYouTubeEmbedUrl = (url: string) => {
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
    return `${embedUrl}${sep}autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playsinline=1&rel=0`;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const id = match && match[1] ? match[1] : '1226511604';
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=${isMuted ? '1' : '0'}&loop=1&badge=0&autopause=0`;
  };

  const getBehanceId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:gallery|project|embed\/project)\/(\d+)/i);
    return match ? match[1] : null;
  };

  if (!isOpen || !currentProject) return null;

  const isVideo = currentProject.category === 'video' || Boolean(currentProject.videoUrl);
  const isGraphics = currentProject.category === 'graphics';
  const isMeta = currentProject.category === 'meta';
  const behanceId = getBehanceId(currentProject.liveUrl);

  const isYouTube =
    currentProject.videoUrl?.includes('youtube.com') ||
    currentProject.videoUrl?.includes('youtu.be');
  const isVimeo = currentProject.videoUrl?.includes('vimeo.com');

  return (
    <div
      id="reels-feed-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container sizing: Full height on mobile; 9:16 reels frame or comfortable mobile viewport on desktop */}
      <div
        ref={containerRef}
        className="relative w-full h-full sm:h-[94vh] sm:max-h-[920px] sm:w-[480px] sm:rounded-3xl bg-[#030914] border-0 sm:border sm:border-sky-500/30 overflow-hidden flex flex-col shadow-2xl shadow-sky-950/80"
      >
        {/* ========================================================================= */}
        {/* TOP BAR: Category Filters & Close Button                                 */}
        {/* ========================================================================= */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => {
                setFilterCategory('all');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-black'
                  : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterCategory('video');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                filterCategory === 'video'
                  ? 'bg-sky-400 text-black'
                  : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => {
                setFilterCategory('graphics');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                filterCategory === 'graphics'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>Graphics</span>
            </button>
            <button
              onClick={() => {
                setFilterCategory('meta');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                filterCategory === 'meta'
                  ? 'bg-emerald-400 text-black'
                  : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Meta</span>
            </button>
          </div>

          {/* Right Top Actions */}
          <div className="flex items-center gap-2">
            {/* Reel Counter */}
            <span className="text-[11px] font-bold text-white/90 bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
              {currentIndex + 1} / {filteredProjects.length}
            </span>

            {/* Exit Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/70 hover:bg-white/20 border border-white/30 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              title="Close (Esc)"
              aria-label="Close reels viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN REEL CONTENT DISPLAY (VIDEO / GRAPHIC / META)                        */}
        {/* ========================================================================= */}
        <div className="relative w-full h-full flex-1 bg-black flex items-center justify-center overflow-hidden">
          {/* 1. VIDEO REEL */}
          {isVideo && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {isYouTube ? (
                <iframe
                  key={currentProject.id}
                  src={getYouTubeEmbedUrl(currentProject.videoUrl || '')}
                  title={currentProject.title}
                  className="w-full h-full object-cover border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : isVimeo ? (
                <iframe
                  key={currentProject.id}
                  src={getVimeoEmbedUrl(currentProject.videoUrl || '')}
                  title={currentProject.title}
                  className="w-full h-full object-cover border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={currentProject.coverImage}
                    alt={currentProject.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="w-16 h-16 text-white/80" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. GRAPHIC ARTWORK REEL */}
          {isGraphics && (
            <div className="relative w-full h-full flex items-center justify-center bg-[#020712] overflow-hidden">
              <img
                key={currentProject.id}
                src={getOptimizedCover(currentProject)}
                alt={currentProject.title}
                className="w-full h-full object-contain max-h-[85vh] p-2"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/profile.png') {
                    target.src = '/profile.png';
                  }
                }}
              />

              {/* Behance Review Watermark Pill */}
              <div className="absolute top-16 left-4 z-20">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Behance Artwork</span>
                </span>
              </div>
            </div>
          )}

          {/* 3. META MARKETING REEL */}
          {isMeta && (
            <div className="relative w-full h-full flex flex-col justify-center p-6 bg-gradient-to-br from-[#061e38] via-[#020b18] to-[#010610]">
              <div className="relative z-10 max-w-sm mx-auto w-full p-6 rounded-3xl bg-[#03152a]/95 border border-sky-500/30 shadow-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                    Meta Ads Manager
                  </span>
                  {currentProject.metrics?.roas && (
                    <span className="px-3 py-1 rounded-xl text-sm font-black bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950">
                      {currentProject.metrics.roas}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1.5">{currentProject.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentProject.description}</p>
                </div>

                {/* Metrics Card */}
                {currentProject.metrics && (
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#010a17] border border-sky-500/20 text-xs">
                    {currentProject.metrics.spend && (
                      <div>
                        <span className="text-[10px] text-slate-400 block">Ad Spend</span>
                        <span className="font-bold text-sky-300">{currentProject.metrics.spend}</span>
                      </div>
                    )}
                    {currentProject.metrics.results && (
                      <div>
                        <span className="text-[10px] text-slate-400 block">Key Result</span>
                        <span className="font-bold text-emerald-400">{currentProject.metrics.results}</span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleWhatsAppInquire}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Similar Campaign</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Gradient Shade for Text Legibility */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20" />

          {/* ========================================================================= */}
          {/* BOTTOM-LEFT DETAILS (CREATOR, TITLE, CAPTION, TAGS)                       */}
          {/* ========================================================================= */}
          <div className="absolute bottom-4 left-4 right-18 z-30 pointer-events-auto">
            {/* Creator Pill */}
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/profile.png"
                alt={profile.name}
                className="w-7 h-7 rounded-full border border-sky-400/50 object-cover"
              />
              <div>
                <span className="text-xs font-bold text-white leading-none block">
                  {profile.name}
                </span>
                <span className="text-[10px] text-sky-300/80 font-medium">
                  {currentProject.category === 'video'
                    ? 'Video Editor'
                    : currentProject.category === 'graphics'
                    ? 'Graphic Designer'
                    : 'Meta Ads Specialist'}
                </span>
              </div>
            </div>

            {/* Project Title */}
            <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow-md mb-1 line-clamp-1">
              {currentProject.title}
            </h2>

            {/* Concise Description */}
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-2 drop-shadow">
              {currentProject.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {currentProject.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-sky-200 border border-white/15 backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT FLOATING REELS ACTION BAR (LIKE, WHATSAPP, SHARE, BEHANCE, NAV)    */}
          {/* ========================================================================= */}
          <div className="absolute right-3 bottom-6 z-30 flex flex-col items-center gap-4">
            {/* Heart / Like Button */}
            <button
              onClick={() => handleLike(currentProject.id)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Like project"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-75 ${
                  likedProjects[currentProject.id]
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/40'
                    : 'bg-black/60 hover:bg-black/80 border-white/20 text-white'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedProjects[currentProject.id] ? 'fill-white' : ''
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow">
                {likeCounts[currentProject.id] || 48}
              </span>
            </button>

            {/* Direct WhatsApp Chat */}
            <button
              onClick={handleWhatsAppInquire}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Hire or discuss this project on WhatsApp"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform active:scale-75">
                <MessageCircle className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow">Chat</span>
            </button>

            {/* Direct Source / Behance Link */}
            {currentProject.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group"
                title="Open project on Behance"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-75">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">Link</span>
              </a>
            )}

            {/* Mute/Unmute toggle (for videos) */}
            {isVideo && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex flex-col items-center gap-1 cursor-pointer"
                title={isMuted ? 'Unmute video' : 'Mute video'}
              >
                <div className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform active:scale-75">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-sky-400" />}
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">
                  {isMuted ? 'Muted' : 'Sound'}
                </span>
              </button>
            )}

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Share project"
            >
              <div className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform active:scale-75">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow">
                {copied ? 'Copied' : 'Share'}
              </span>
            </button>

            {/* Navigation Up / Down Arrows (PC & Mobile fallback) */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/15">
              <button
                onClick={goToPrev}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-sky-500/30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Previous (Arrow Up)"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-sky-500/30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Next (Arrow Down / Swipe Up)"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Swipe Hint Tooltip on Mobile */}
          {showSwipeHint && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none sm:hidden flex flex-col items-center gap-2 bg-black/80 px-4 py-3 rounded-2xl border border-sky-400/40 text-center animate-bounce">
              <span className="text-2xl">👆</span>
              <span className="text-xs font-bold text-white">Swipe Up for Next Reel</span>
              <span className="text-[10px] text-sky-300">রিলসের মতো উপরে সোয়াইপ করুন</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
