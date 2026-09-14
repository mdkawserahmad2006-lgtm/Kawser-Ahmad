import React, { useState } from 'react';
import { Play, Eye, TrendingUp, Sparkles, Film, Palette, BarChart3, PlusCircle, ArrowUpRight } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types';

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
  // Separate projects by category so each has its own independent slot
  const videoProjects = projects.filter(p => p.category === 'video');
  const graphicsProjects = projects.filter(p => p.category === 'graphics');
  const metaProjects = projects.filter(p => p.category === 'meta');

  const slotTabs = [
    { id: 'all' as ProjectCategory, label: 'All 3 Dedicated Slots', icon: Sparkles, count: projects.length },
    { id: 'video' as ProjectCategory, label: 'Video Editing Slot', icon: Film, count: videoProjects.length },
    { id: 'graphics' as ProjectCategory, label: 'Graphic Design Slot', icon: Palette, count: graphicsProjects.length },
    { id: 'meta' as ProjectCategory, label: 'Meta Marketing Slot', icon: TrendingUp, count: metaProjects.length },
  ];

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[#020813] via-[#041324] to-[#020914] overflow-hidden"
    >
      {/* Background Studio Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between">
        <div className="w-[600px] h-[600px] bg-cyan-900/12 rounded-full blur-[140px] -translate-x-1/2" />
        <div className="w-[600px] h-[600px] bg-sky-900/12 rounded-full blur-[140px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Independent Category Showcases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="text-white">Creative Works & </span>
              <span className="text-[#00e5ff]">Dedicated Slots</span>
            </h2>
            <p className="text-navy-mist text-sm sm:text-base mt-2 max-w-2xl">
              Each domain is organized into its own dedicated showcase slot—video productions, graphic design brand assets, and high-ROAS Meta campaigns.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              id="btn-add-project-link"
              onClick={onOpenCustomizer}
              className="px-4 py-2.5 rounded-xl bg-[#04182b] hover:bg-[#07243e] border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all shadow-sm group"
              title="Add or edit video & project links"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add / Link Works</span>
            </button>
          </div>
        </div>

        {/* Category Slot Switcher Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-14 scrollbar-none border-b border-cyan-500/15">
          {slotTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'btn-cyan-gradient text-[#020914] shadow-md shadow-cyan-500/30'
                    : 'bg-[#041423]/90 hover:bg-[#082238] text-navy-mist hover:text-white border border-cyan-500/20 hover:border-cyan-400/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#020914]' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#020914]/20 text-[#020914]' : 'bg-[#062036] text-cyan-300'
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
          <div id="slot-video" className="mb-20 animate-in fade-in duration-300">
            {/* Slot Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-cyan-500/20 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00e5ff] bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/30">
                      Slot 01
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Video Editing & Motion Showcase</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-navy-mist mt-0.5">
                    High-retention commercial promos, viral reels/shorts, dynamic sound design, and color grading.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-300 bg-[#031526] px-3 py-1.5 rounded-lg border border-cyan-500/25 self-start sm:self-auto">
                {videoProjects.length} Video Projects Ready
              </span>
            </div>

            {/* Video Slot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoProjects.map((project) => (
                <div
                  key={project.id}
                  className="navy-glass-card rounded-2xl overflow-hidden border border-cyan-500/25 flex flex-col group transition-all duration-300"
                >
                  {/* Thumbnail / Video Stream Preview */}
                  <div
                    className="relative aspect-video bg-[#010810] overflow-hidden cursor-pointer"
                    onClick={() => onPlayVideo(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b16] via-black/30 to-transparent opacity-90" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-cyan-400/40 rounded-full blur-md group-hover:scale-125 transition-transform duration-300" />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full btn-cyan-gradient flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-[#020914] ml-0.5 text-[#020914]" />
                        </div>
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-sky-400 text-[#020914]">
                        Video Edit
                      </span>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="text-[11px] font-semibold bg-black/75 px-2.5 py-1 rounded backdrop-blur-sm">
                        Client: {project.client || 'Commercial'}
                      </span>
                      {project.metrics?.results && (
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded">
                          {project.metrics.results}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tool Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#061d30] text-cyan-300 border border-cyan-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Watch Button */}
                    <button
                      onClick={() => onPlayVideo(project)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#041c30] hover:bg-[#082944] border border-cyan-500/30 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:border-cyan-400/60"
                    >
                      <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                      <span>Watch Video Reel</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-navy-steel group-hover:text-cyan-300" />
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
          <div id="slot-graphics" className="mb-20 animate-in fade-in duration-300">
            {/* Slot Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-cyan-500/20 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00e5ff] bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/30">
                      Slot 02
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Graphic Design & Branding Showcase</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-navy-mist mt-0.5">
                    Brand identity systems, high-CTR social media ad creatives, logos, packaging, and commercial visual layouts.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-300 bg-[#031526] px-3 py-1.5 rounded-lg border border-cyan-500/25 self-start sm:self-auto">
                {graphicsProjects.length} Design Portfolios
              </span>
            </div>

            {/* Graphic Design Slot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {graphicsProjects.map((project) => (
                <div
                  key={project.id}
                  className="navy-glass-card rounded-2xl overflow-hidden border border-cyan-500/25 flex flex-col group transition-all duration-300"
                >
                  {/* Image Preview */}
                  <div
                    className="relative aspect-video bg-[#010810] overflow-hidden cursor-pointer"
                    onClick={() => onViewImage(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b16] via-black/20 to-transparent opacity-90" />

                    {/* View Magnify Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#031424]/90 border border-cyan-400 text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-cyan-400 text-[#020914]">
                        Graphic Design
                      </span>
                    </div>

                    {/* Bottom Metric */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="text-[11px] font-semibold bg-black/75 px-2.5 py-1 rounded backdrop-blur-sm">
                        {project.client || 'Creative'}
                      </span>
                      {project.metrics?.ctr && (
                        <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-2 py-0.5 rounded">
                          {project.metrics.ctr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#061d30] text-cyan-300 border border-cyan-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Design Button */}
                    <button
                      onClick={() => onViewImage(project)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#041c30] hover:bg-[#082944] border border-cyan-500/30 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:border-cyan-400/60"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View High-Res Artwork</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-navy-steel group-hover:text-cyan-300" />
                    </button>
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
            {/* Slot Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-cyan-500/20 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00e5ff] bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/30">
                      Slot 03
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Meta Marketing & ROAS Scaling Showcase</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-navy-mist mt-0.5">
                    Data-driven Facebook & Instagram ad architectures, Conversions API (CAPI) loss-less tracking, and profitable scaling.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-teal-300 bg-[#02181d] px-3 py-1.5 rounded-lg border border-teal-500/25 self-start sm:self-auto">
                {metaProjects.length} Scaling Case Studies
              </span>
            </div>

            {/* Meta Marketing Slot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metaProjects.map((project) => (
                <div
                  key={project.id}
                  className="navy-glass-card rounded-2xl overflow-hidden border border-cyan-500/25 flex flex-col group transition-all duration-300"
                >
                  {/* Cover */}
                  <div
                    className="relative aspect-video bg-[#010810] overflow-hidden cursor-pointer"
                    onClick={() => onViewMetaCase(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b16] via-black/30 to-transparent opacity-90" />

                    {/* Top ROAS Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-teal-400 text-[#020914]">
                        Meta Marketing
                      </span>
                    </div>

                    {/* Big ROAS badge overlay */}
                    {project.metrics?.roas && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-md">
                          {project.metrics.roas}
                        </span>
                      </div>
                    )}

                    {/* Metric summary */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="text-[11px] font-semibold bg-black/75 px-2.5 py-1 rounded backdrop-blur-sm">
                        Client: {project.client || 'Brand'}
                      </span>
                      {project.metrics?.spend && (
                        <span className="text-[11px] font-bold text-sky-300 bg-[#031726] border border-cyan-500/30 px-2 py-0.5 rounded">
                          {project.metrics.spend}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-navy-mist line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Stat Metrics Pill */}
                      {project.metrics && (
                        <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-[#031322] border border-cyan-500/20 text-xs">
                          {project.metrics.results && (
                            <div>
                              <span className="text-[10px] text-navy-steel block">Key Metric</span>
                              <span className="font-bold text-emerald-400 text-xs">{project.metrics.results}</span>
                            </div>
                          )}
                          {project.metrics.impressions && (
                            <div>
                              <span className="text-[10px] text-navy-steel block">Total Reach</span>
                              <span className="font-bold text-white text-xs">{project.metrics.impressions}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#061d30] text-teal-300 border border-teal-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Case Study Button */}
                    <button
                      onClick={() => onViewMetaCase(project)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#041c30] hover:bg-[#082944] border border-teal-500/30 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:border-teal-400/60"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
                      <span>View Ad Strategy & Metrics</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-navy-steel group-hover:text-teal-300" />
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
