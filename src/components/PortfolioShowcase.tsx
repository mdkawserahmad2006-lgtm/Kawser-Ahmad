import React, { useRef, useEffect } from 'react';
import { Play, Eye, TrendingUp, Sparkles, Film, Palette, BarChart3, PlusCircle, ArrowUpRight, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioShowcaseProps {
  projects: ProjectItem[];
  onPlayVideo: (project: ProjectItem) => void;
  onViewImage: (project: ProjectItem) => void;
  onViewMetaCase: (project: ProjectItem) => void;
  onOpenCustomizer: () => void;
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  projects,
  onPlayVideo,
  onViewImage,
  onViewMetaCase,
  onOpenCustomizer,
  activeCategory,
  onCategoryChange
}) => {
  const { t, isRtl } = useLanguage();
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const graphicsScrollRef = useRef<HTMLDivElement>(null);
  const metaScrollRef = useRef<HTMLDivElement>(null);

  // Auto-Slide control refs for user hover/touch pausing
  const isVideoHovered = useRef(false);
  const isVideoTouching = useRef(false);
  const isGraphicsHovered = useRef(false);
  const isGraphicsTouching = useRef(false);
  const pauseVideoUntil = useRef(0);
  const pauseGraphicsUntil = useRef(0);

  const scrollSlot = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      if (ref === videoScrollRef) pauseVideoUntil.current = Date.now() + 4000;
      if (ref === graphicsScrollRef) pauseGraphicsUntil.current = Date.now() + 4000;
      const firstChild = ref.current.querySelector(':scope > div') as HTMLElement | null;
      const step = firstChild ? firstChild.offsetWidth + 16 : 350;
      const scrollOffset = direction === 'left' ? -step : step;
      ref.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // Separate projects by category so each has its own independent slot
  const videoProjects = projects.filter(p => p.category === 'video');
  const graphicsProjects = projects.filter(p => p.category === 'graphics');
  const metaProjects = projects.filter(p => p.category === 'meta');

  // USER REQUESTED: 2-3 Second Auto-Sliding for Video Slot (Works seamlessly on PC & Phone)
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      if (isVideoHovered.current || isVideoTouching.current || Date.now() < pauseVideoUntil.current) return;
      const el = videoScrollRef.current;
      if (!el) return;

      const firstChild = el.querySelector(':scope > div') as HTMLElement | null;
      const step = firstChild ? firstChild.offsetWidth + 16 : 340;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 25) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [videoProjects.length, activeCategory]);

  // USER REQUESTED: 2-3 Second Auto-Sliding for Graphics Slot (Works seamlessly on PC & Phone)
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      if (isGraphicsHovered.current || isGraphicsTouching.current || Date.now() < pauseGraphicsUntil.current) return;
      const el = graphicsScrollRef.current;
      if (!el) return;

      const firstChild = el.querySelector(':scope > div') as HTMLElement | null;
      const step = firstChild ? firstChild.offsetWidth + 16 : 320;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 25) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [graphicsProjects.length, activeCategory]);

  const slotTabs = [
    { id: 'all' as ProjectCategory, label: t.filterAll, icon: Sparkles, count: projects.length },
    { id: 'video' as ProjectCategory, label: t.filterVideos, icon: Film, count: videoProjects.length },
    { id: 'graphics' as ProjectCategory, label: t.filterGraphics, icon: Palette, count: graphicsProjects.length },
    { id: 'meta' as ProjectCategory, label: t.filterMeta, icon: TrendingUp, count: metaProjects.length },
  ];

  return (
    <section
      id="portfolio"
      className="relative pt-4 pb-16 lg:pt-6 lg:pb-24 bg-transparent overflow-hidden"
    >
      {/* Background Studio Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between">
        <div className="w-[500px] h-[500px] bg-sky-950/20 rounded-full blur-[140px] -translate-x-1/2" />
        <div className="w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[140px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            <span className="text-white">{t.featured} </span>
            <span className="text-gradient-cyan-teal">{t.projects}</span>
          </h2>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="btn-add-project-link"
              onClick={onOpenCustomizer}
              className="px-3.5 py-2 rounded-xl bg-[#051c33] hover:bg-[#092d52] border border-sky-500/30 hover:border-sky-400/60 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Add or edit video & project links"
            >
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.linkWorks}</span>
            </button>
          </div>
        </div>

        {/* Category Slot Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none border-b border-sky-500/15">
          {slotTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'btn-cyan-gradient text-white shadow-md shadow-sky-500/30'
                    : 'bg-[#041930] hover:bg-[#072648] text-navy-mist hover:text-white border border-sky-500/20 hover:border-sky-400/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-black/25 text-white' : 'bg-[#08294c] text-sky-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SLOT 1: VIDEO EDITING DEDICATED SHOWCASE                                  */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'video') && (
          <div id="slot-video" className="mb-14 animate-in fade-in duration-300">
            {/* Slot Header with Carousel Controls */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-9 h-9 rounded-full border border-sky-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{t.filterVideos}</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollSlot(videoScrollRef, 'left')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSlot(videoScrollRef, 'right')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Slot Carousel with Auto-Slide & Touch-Pause */}
            <div
              ref={videoScrollRef}
              onMouseEnter={() => { isVideoHovered.current = true; }}
              onMouseLeave={() => { isVideoHovered.current = false; }}
              onTouchStart={() => { isVideoTouching.current = true; }}
              onTouchEnd={() => { setTimeout(() => { isVideoTouching.current = false; }, 2500); }}
              className="flex overflow-x-auto pb-4 pt-1 gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {videoProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative w-[82vw] sm:w-[320px] lg:w-[350px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-sky-500/25 flex flex-col group transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] hover:border-cyan-300 hover:shadow-[0_14px_45px_rgba(56,189,248,0.35)] cursor-pointer"
                >
                  {/* Glowing Laser Top Border on Hover / Touch */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff] z-30" />

                  {/* Diagonal Laser Light Sweep across the entire card */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] group-active:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-12 z-20" />

                  {/* Video Thumbnail */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onPlayVideo(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + '/profile.png') {
                          target.src = '/profile.png';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-black/20 to-transparent opacity-85" />

                    {/* Play Button Overlay with Radiating Neon Halo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full btn-cyan-gradient flex items-center justify-center shadow-lg group-hover:scale-120 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.85)] transition-all duration-300">
                        <Play className="w-5 h-5 fill-white ml-0.5 text-white" />
                      </div>
                    </div>

                    {project.isVertical && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/30 border border-sky-400/50 text-[9px] font-bold text-sky-200 backdrop-blur-sm">
                        <span>Short</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3 relative z-10">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {project.title}
                    </h4>

                    {/* Direct Watch Button */}
                    <button
                      onClick={() => onPlayVideo(project)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#051c35] via-[#07284d] to-[#051c35] hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-sky-500/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer group/btn"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-sky-400 group-hover/btn:text-slate-950 transition-colors" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLOT 2: GRAPHIC DESIGN DEDICATED SHOWCASE                                */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'graphics') && (
          <div id="slot-graphics" className="mb-14 animate-in fade-in duration-300">
            {/* Slot Header with Carousel Controls */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-9 h-9 rounded-full border border-cyan-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{t.filterGraphics}</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollSlot(graphicsScrollRef, 'left')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSlot(graphicsScrollRef, 'right')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Graphic Design Carousel with Auto-Slide & Touch-Pause */}
            <div
              ref={graphicsScrollRef}
              onMouseEnter={() => { isGraphicsHovered.current = true; }}
              onMouseLeave={() => { isGraphicsHovered.current = false; }}
              onTouchStart={() => { isGraphicsTouching.current = true; }}
              onTouchEnd={() => { setTimeout(() => { isGraphicsTouching.current = false; }, 2500); }}
              className="flex overflow-x-auto pb-4 pt-1 gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {graphicsProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative w-[82vw] sm:w-[300px] lg:w-[330px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-cyan-500/25 flex flex-col group transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] hover:border-cyan-300 hover:shadow-[0_14px_45px_rgba(6,182,212,0.35)] cursor-pointer"
                >
                  {/* Glowing Laser Top Border on Hover / Touch */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff] z-30" />

                  {/* Diagonal Laser Light Sweep across the entire card */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] group-active:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-12 z-20" />

                  {/* Image Preview */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onViewImage(project)}
                  >
                    <img
                      src={getOptimizedCover(project)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + '/profile.png') {
                          target.src = '/profile.png';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-black/20 to-transparent opacity-85" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-950/60 backdrop-blur-xs">
                      <div className="w-11 h-11 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.8)] group-hover:scale-115 transition-transform">
                        <Eye className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3 relative z-10">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {project.title}
                    </h4>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button
                        onClick={() => onViewImage(project)}
                        className="py-2.5 px-2.5 rounded-xl bg-[#051c35] hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer group/rev"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400 group-hover/rev:text-slate-950 transition-colors" />
                        <span>Review</span>
                      </button>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm"
                        >
                          <span>Behance</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => onViewImage(project)}
                          className="py-2.5 px-2.5 rounded-xl bg-[#051c35] text-white text-xs font-semibold"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLOT 3: META MARKETING DEDICATED SHOWCASE                                */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'meta') && (
          <div id="slot-meta" className="animate-in fade-in duration-300">
            {/* Slot Header with Carousel Controls */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-9 h-9 rounded-full border border-emerald-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{t.filterMeta}</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollSlot(metaScrollRef, 'left')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSlot(metaScrollRef, 'right')}
                  className="p-1.5 rounded-lg bg-[#06203d] border border-sky-500/30 text-sky-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Meta Marketing Carousel */}
            <div
              ref={metaScrollRef}
              className="flex overflow-x-auto pb-4 pt-1 gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {metaProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative w-[82vw] sm:w-[320px] lg:w-[350px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-emerald-500/25 flex flex-col group transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] hover:border-emerald-300 hover:shadow-[0_14px_45px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  {/* Glowing Laser Top Border on Hover / Touch */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#10b981] z-30" />

                  {/* Diagonal Laser Light Sweep across the entire card */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] group-active:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent skew-x-12 z-20" />

                  {/* Visual Dashboard Card */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onViewMetaCase(project)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#061e38] via-[#020c1a] to-[#010610] p-4 flex flex-col justify-between select-none group-hover:bg-[#082442] transition-colors duration-300">
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider flex items-center gap-1.5 bg-sky-500/15 border border-sky-400/30 px-2.5 py-1 rounded-full">
                          <Target className="w-3 h-3 text-sky-400" />
                          <span>Meta Ads Campaign</span>
                        </span>

                        {project.metrics?.roas && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 shadow-md group-hover:scale-110 transition-transform">
                            {project.metrics.roas}
                          </span>
                        )}
                      </div>

                      {/* Sparkline Bar Visualization with Glow on Card Hover */}
                      <div className="h-9 w-full flex items-end gap-1.5 px-2.5 py-1 rounded-xl bg-[#010813]/90 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors">
                        <div className="flex-1 bg-sky-500/20 rounded-t h-[35%] group-hover:bg-sky-400/30 transition-all" />
                        <div className="flex-1 bg-sky-500/30 rounded-t h-[50%] group-hover:bg-sky-400/40 transition-all" />
                        <div className="flex-1 bg-sky-500/40 rounded-t h-[65%] group-hover:bg-sky-400/50 transition-all" />
                        <div className="flex-1 bg-sky-500/55 rounded-t h-[80%] group-hover:bg-sky-400/70 transition-all" />
                        <div className="flex-1 bg-emerald-500/70 rounded-t h-[92%] group-hover:bg-emerald-400/80 transition-all" />
                        <div className="flex-1 bg-emerald-400 rounded-t h-full group-hover:shadow-[0_0_12px_#34d399] transition-all" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>CAPI Loss-less Active</span>
                        </span>
                        {project.metrics?.spend && (
                          <span className="font-bold text-sky-300">{project.metrics.spend}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3 relative z-10">
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {project.title}
                    </h4>

                    {/* Case Study Button */}
                    <button
                      onClick={() => onViewMetaCase(project)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#051c35] via-[#062947] to-[#051c35] hover:from-emerald-500 hover:to-teal-400 hover:text-slate-950 border border-emerald-500/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer group/btn"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-slate-950 transition-colors" />
                      <span>View Case Study</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
