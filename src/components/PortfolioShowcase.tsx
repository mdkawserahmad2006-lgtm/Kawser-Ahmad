import React, { useRef } from 'react';
import { Play, Eye, TrendingUp, Sparkles, Film, Palette, BarChart3, PlusCircle, ArrowUpRight, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';

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
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const graphicsScrollRef = useRef<HTMLDivElement>(null);
  const metaScrollRef = useRef<HTMLDivElement>(null);

  const scrollSlot = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollOffset = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // Separate projects by category so each has its own independent slot
  const videoProjects = projects.filter(p => p.category === 'video');
  const graphicsProjects = projects.filter(p => p.category === 'graphics');
  const metaProjects = projects.filter(p => p.category === 'meta');

  const slotTabs = [
    { id: 'all' as ProjectCategory, label: 'All Works', icon: Sparkles, count: projects.length },
    { id: 'video' as ProjectCategory, label: 'Video Editing', icon: Film, count: videoProjects.length },
    { id: 'graphics' as ProjectCategory, label: 'Graphic Design', icon: Palette, count: graphicsProjects.length },
    { id: 'meta' as ProjectCategory, label: 'Meta Marketing', icon: TrendingUp, count: metaProjects.length },
  ];

  return (
    <section
      id="portfolio"
      className="relative py-16 lg:py-24 bg-transparent overflow-hidden"
    >
      {/* Background Studio Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between">
        <div className="w-[500px] h-[500px] bg-sky-950/20 rounded-full blur-[140px] -translate-x-1/2" />
        <div className="w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[140px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#072448] border border-sky-500/30 text-sky-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Portfolio Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              <span className="text-white">Featured </span>
              <span className="text-gradient-cyan-teal">Projects</span>
            </h2>
            <p className="text-navy-mist text-xs sm:text-sm mt-1 max-w-xl">
              Video Editing, Graphic Design, and Meta Ads.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="btn-add-project-link"
              onClick={onOpenCustomizer}
              className="px-3.5 py-2 rounded-xl bg-[#051c33] hover:bg-[#092d52] border border-sky-500/30 hover:border-sky-400/60 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Add or edit video & project links"
            >
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Link Works</span>
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
            {/* Slot Header with Carousel Controls: Logo on LEFT, Name on SIDE */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-10 h-10 rounded-full border border-sky-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Md Kawser Ahmad</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-semibold">Video Reels</span>
                  </h3>
                  <p className="text-[11px] text-navy-mist">Promos, commercial reels, and motion design.</p>
                </div>
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

            {/* Video Slot Carousel */}
            <div
              ref={videoScrollRef}
              className="flex overflow-x-auto pb-4 pt-1 gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {videoProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-[80vw] sm:w-[320px] lg:w-[350px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-sky-500/25 flex flex-col group transition-all hover:border-sky-400/50"
                >
                  {/* Video Thumbnail */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onPlayVideo(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full btn-cyan-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5 text-white" />
                      </div>
                    </div>

                    {/* Badge: Logo on LEFT, Name on SIDE */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow">
                      <img
                        src="/profile.png"
                        alt="Md Kawser Ahmad"
                        className="w-3.5 h-3.5 rounded-full object-cover border border-sky-400/60"
                      />
                      <span className="text-[10px] font-bold text-white tracking-wide">
                        Kawser Theory • {project.id === 'vid-promo' ? 'Promo Reel' : 'Reel'}
                      </span>
                    </div>

                    {project.metrics?.results && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="text-[10px] font-bold text-emerald-300 bg-black/80 px-2 py-0.5 rounded">
                          {project.metrics.results}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors mb-1 truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-1 mb-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#06203d] text-sky-300 border border-sky-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Watch Button */}
                    <button
                      onClick={() => onPlayVideo(project)}
                      className="w-full py-2 px-3 rounded-xl bg-[#051c35] hover:bg-[#0a2e58] border border-sky-500/30 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-sky-400 text-sky-400" />
                      <span>Watch Reel</span>
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
            {/* Slot Header with Carousel Controls: Logo on LEFT, Name on SIDE */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-10 h-10 rounded-full border border-cyan-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Md Kawser Ahmad</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-semibold">Graphic Works</span>
                  </h3>
                  <p className="text-[11px] text-navy-mist">Social posts, branding, and commercial layouts.</p>
                </div>
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

            {/* Graphic Design Carousel */}
            <div
              ref={graphicsScrollRef}
              className="flex overflow-x-auto pb-4 pt-1 gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {graphicsProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-[80vw] sm:w-[300px] lg:w-[330px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-cyan-500/25 flex flex-col group transition-all hover:border-cyan-400/50"
                >
                  {/* Image Preview */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onViewImage(project)}
                  >
                    <img
                      src={getOptimizedCover(project)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/60">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-600 text-white shadow">
                        Behance
                      </span>
                    </div>

                    {project.metrics?.results && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="text-[10px] font-bold text-cyan-300 bg-black/80 px-2 py-0.5 rounded">
                          {project.metrics.results}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-1 mb-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#06203d] text-cyan-300 border border-cyan-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button
                        onClick={() => onViewImage(project)}
                        className="py-2 px-2.5 rounded-xl bg-[#051c35] hover:bg-[#0a2e58] border border-cyan-500/30 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Review</span>
                      </button>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Behance</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <button
                          onClick={() => onViewImage(project)}
                          className="py-2 px-2.5 rounded-xl bg-[#051c35] text-white text-xs font-semibold"
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
            {/* Slot Header with Carousel Controls: Logo on LEFT, Name on SIDE */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-sky-500/20">
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Md Kawser Ahmad"
                  className="w-10 h-10 rounded-full border border-emerald-400/60 object-cover shadow-sm flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Md Kawser Ahmad</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-semibold">Meta Campaigns</span>
                  </h3>
                  <p className="text-[11px] text-navy-mist">Campaign architecture, CAPI tracking, and scaling.</p>
                </div>
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
                  className="w-[80vw] sm:w-[320px] lg:w-[350px] flex-shrink-0 snap-start navy-glass-card rounded-2xl overflow-hidden border border-emerald-500/25 flex flex-col group transition-all hover:border-emerald-400/50"
                >
                  {/* Visual Dashboard Card */}
                  <div
                    className="relative aspect-video bg-[#010814] overflow-hidden cursor-pointer"
                    onClick={() => onViewMetaCase(project)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#061e38] via-[#020c1a] to-[#010610] p-3.5 flex flex-col justify-between select-none">
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider flex items-center gap-1 bg-sky-500/15 border border-sky-400/30 px-2 py-0.5 rounded">
                          <Target className="w-3 h-3 text-sky-400" />
                          Meta Ads
                        </span>

                        {project.metrics?.roas && (
                          <span className="px-2 py-0.5 rounded text-xs font-black bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950">
                            {project.metrics.roas}
                          </span>
                        )}
                      </div>

                      {/* Sparkline Bar Visualization */}
                      <div className="h-8 w-full flex items-end gap-1.5 px-2 py-1 rounded bg-[#010813]/80 border border-sky-500/20">
                        <div className="flex-1 bg-sky-500/20 rounded-t h-[35%]" />
                        <div className="flex-1 bg-sky-500/30 rounded-t h-[50%]" />
                        <div className="flex-1 bg-sky-500/40 rounded-t h-[65%]" />
                        <div className="flex-1 bg-sky-500/55 rounded-t h-[80%]" />
                        <div className="flex-1 bg-emerald-500/70 rounded-t h-[92%]" />
                        <div className="flex-1 bg-emerald-400 rounded-t h-full" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>CAPI Loss-less Active</span>
                        {project.metrics?.spend && (
                          <span className="font-bold text-sky-300">{project.metrics.spend}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors mb-1 truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-1 mb-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#06203d] text-sky-300 border border-sky-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Case Study Button */}
                    <button
                      onClick={() => onViewMetaCase(project)}
                      className="w-full py-2 px-3 rounded-xl bg-[#051c35] hover:bg-[#0a2e58] border border-sky-500/30 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BarChart3 className="w-3 h-3 text-sky-400" />
                      <span>View Strategy & Metrics</span>
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
