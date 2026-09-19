import React, { useState } from 'react';
import { Palette, Film, TrendingUp, ArrowRight, MessageCircle, ExternalLink, FileText, Play, Eye } from 'lucide-react';
import { ProfileData, ProjectItem } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';

interface HeroProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
  onOpenResume?: () => void;
  onPlayPromo?: () => void;
  onPlayVideo?: (project: ProjectItem) => void;
  projects?: ProjectItem[];
  onViewImage?: (project: ProjectItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenCustomizer,
  onOpenResume,
  onPlayPromo,
  onPlayVideo,
  projects,
  onViewImage
}) => {
  const [topPreviewTab, setTopPreviewTab] = useState<'video' | 'graphics'>('video');

  const featuredVideos = (projects || []).filter(p => p.category === 'video').slice(0, 3);
  const featuredGraphics = (projects || []).filter(p => p.category === 'graphics').slice(0, 6);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-28 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Profile Card */}
          <div id="hero-left-profile" className="lg:col-span-5 flex justify-center lg:justify-start order-1">
            <div className="relative w-full max-w-[360px] animate-float-portrait">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/35 via-cyan-500/25 to-blue-600/35 rounded-3xl blur-xl opacity-75 animate-border-glow" />

              {/* Profile Card Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#071f3a] via-[#041528] to-[#020d1c] border border-sky-500/30 p-4 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden">
                
                {/* Portrait Photo */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-sky-400/25 group bg-[#020b18]">
                  <img
                    id="profile-display-photo"
                    src={profile.avatarUrl || '/profile.png'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + '/profile.png') {
                        target.src = '/profile.png';
                      }
                    }}
                  />
                  
                  {/* Subtle Shimmer Sheen Passing Across the Photo */}
                  <div className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-light-sweep" />

                  {/* Gradient Vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020e18] via-transparent to-transparent opacity-85" />

                  {/* Floating Action Pill: Status */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#031326]/90 backdrop-blur-md rounded-xl p-2.5 border border-sky-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-semibold text-white">Available for Projects</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-300 bg-[#06203d] px-2 py-0.5 rounded border border-sky-500/35">
                      Direct Chat
                    </span>
                  </div>
                </div>

                {/* Interactive Promo Button */}
                {onPlayPromo && (
                  <button
                    onClick={onPlayPromo}
                    className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500/20 via-blue-600/30 to-sky-500/20 hover:from-sky-500/35 hover:to-blue-600/40 border border-sky-400/40 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group"
                  >
                    <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                    </div>
                    <span>Watch Showroom Promo</span>
                  </button>
                )}

                {/* Profile Card Bottom Info */}
                <div className="mt-3 pt-3 border-t border-sky-950/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">{profile.name}</h3>
                    <p className="text-[11px] text-sky-400 font-medium">Video • Graphics • Meta Ads</p>
                  </div>
                  <button
                    onClick={onOpenCustomizer}
                    className="text-sky-400 hover:text-sky-300 font-medium text-[11px] underline"
                  >
                    Edit Photo
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Concise Info, Specialties & Bio */}
          <div id="hero-right-documents" className="lg:col-span-7 flex flex-col items-start text-left order-2">
            
            {/* Minimal Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              <span className="block text-sky-400 text-base sm:text-lg font-medium mb-1">
                Hello, I'm
              </span>
              <span className="text-gradient-hero-name block font-black">
                {profile.name}
              </span>
            </h1>

            {/* Role Title */}
            <p className="text-sm sm:text-base font-semibold text-cyan-300 mb-5">
              Video Editor • Graphic Designer • Meta Marketing Specialist
            </p>

            {/* Three Specialization Quick Links */}
            <div className="grid grid-cols-3 gap-2.5 w-full mb-6">
              {/* Pillar 1: Video Editing */}
              <a
                href="#slot-video"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-video')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="navy-glass-card rounded-xl p-3 border border-sky-500/25 hover:border-sky-400/60 transition-all group flex flex-col items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2 group-hover:scale-105 transition-transform">
                  <Film className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">Video Editing</h2>
                <span className="text-[10px] text-navy-mist mt-0.5 flex items-center gap-1">
                  Reels & Promos <ArrowRight className="w-2.5 h-2.5 text-sky-400" />
                </span>
              </a>

              {/* Pillar 2: Graphic Design */}
              <a
                href="#slot-graphics"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-graphics')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="navy-glass-card rounded-xl p-3 border border-cyan-500/25 hover:border-cyan-400/60 transition-all group flex flex-col items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-105 transition-transform">
                  <Palette className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Graphic Design</h2>
                <span className="text-[10px] text-navy-mist mt-0.5 flex items-center gap-1">
                  Posts & Branding <ArrowRight className="w-2.5 h-2.5 text-cyan-400" />
                </span>
              </a>

              {/* Pillar 3: Meta Marketing */}
              <a
                href="#slot-meta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-meta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="navy-glass-card rounded-xl p-3 border border-teal-500/25 hover:border-teal-400/60 transition-all group flex flex-col items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-300 transition-colors">Meta Marketing</h2>
                <span className="text-[10px] text-navy-mist mt-0.5 flex items-center gap-1">
                  CAPI & ROAS <ArrowRight className="w-2.5 h-2.5 text-teal-400" />
                </span>
              </a>
            </div>

            {/* Brief Bio */}
            <p className="text-navy-mist text-xs sm:text-sm leading-relaxed mb-5 max-w-xl">
              {profile.bio}
            </p>

            {/* Clean Stats Overview */}
            <div className="grid grid-cols-4 gap-2 w-full py-3 border-y border-sky-500/20 mb-6 text-center">
              <div>
                <span className="block text-lg sm:text-xl font-black text-[#00e5ff]">{profile.experienceYears}</span>
                <span className="text-[11px] text-navy-steel">Experience</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-white">{profile.completedProjects}</span>
                <span className="text-[11px] text-navy-steel">Projects</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-sky-400">{profile.avgRoas}</span>
                <span className="text-[11px] text-navy-steel">ROAS</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-emerald-400">{profile.clientSatisfaction}</span>
                <span className="text-[11px] text-navy-steel">Rating</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full mb-6">
              {onPlayPromo && (
                <button
                  id="hero-btn-play-promo-action"
                  onClick={onPlayPromo}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 rounded-xl transition-all shadow-md group cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>Watch Promo</span>
                </button>
              )}

              <a
                id="hero-btn-portfolio"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl btn-cyan-gradient transition-all shadow-md cursor-pointer"
              >
                <span>View Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {onOpenResume && (
                <button
                  id="hero-btn-resume"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-sky-200 hover:text-white bg-[#06203d] hover:bg-[#0a2e58] border border-sky-500/30 rounded-xl transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>CV / Resume</span>
                </button>
              )}

              <a
                id="hero-btn-whatsapp"
                href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-[#051930] hover:bg-[#082444] border border-sky-500/25 rounded-xl transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* TOP PREVIEW STRIP: Videos Elevated to Top alongside Graphics */}
            <div className="w-full pt-4 border-t border-sky-500/20">
              <div className="flex items-center justify-between mb-2.5">
                {/* Switcher: Featured Videos vs Graphic Works */}
                <div className="flex items-center gap-1.5 bg-[#031528] p-1 rounded-xl border border-sky-500/25">
                  <button
                    type="button"
                    onClick={() => setTopPreviewTab('video')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      topPreviewTab === 'video'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-navy-mist hover:text-white'
                    }`}
                  >
                    <Film className="w-3 h-3" />
                    <span>Video Reels ({featuredVideos.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopPreviewTab('graphics')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      topPreviewTab === 'graphics'
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'text-navy-mist hover:text-white'
                    }`}
                  >
                    <Palette className="w-3 h-3" />
                    <span>Graphic Works ({featuredGraphics.length})</span>
                  </button>
                </div>

                <a
                  href={topPreviewTab === 'video' ? '#slot-video' : '#slot-graphics'}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = topPreviewTab === 'video' ? 'slot-video' : 'slot-graphics';
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>See All</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* View 1: Top Featured Video Reels */}
              {topPreviewTab === 'video' && (
                <div className="grid grid-cols-3 gap-2.5 animate-in fade-in duration-200">
                  {featuredVideos.map((video) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => {
                        if (onPlayVideo) {
                          onPlayVideo(video);
                        } else {
                          document.getElementById('slot-video')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-sky-500/30 hover:border-cyan-400 transition-all duration-200 bg-[#020b18] shadow-md hover:scale-[1.02] cursor-pointer text-left focus:outline-none"
                      title={`Play ${video.title}`}
                    >
                      <img
                        src={video.coverImage}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== window.location.origin + '/profile.png') {
                            target.src = '/profile.png';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-sky-500/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-1.5 left-2 right-2 pointer-events-none">
                        <p className="text-[10px] font-bold text-white truncate drop-shadow">
                          {video.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* View 2: Top Graphic Designs */}
              {topPreviewTab === 'graphics' && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 animate-in fade-in duration-200">
                  {featuredGraphics.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        if (onViewImage) {
                          onViewImage(project);
                        } else {
                          document.getElementById('slot-graphics')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-sky-500/30 hover:border-cyan-400 transition-all duration-200 bg-[#020b18] shadow-md hover:scale-105 cursor-pointer text-left focus:outline-none"
                      title={`${project.title}`}
                    >
                      <img
                        src={getOptimizedCover(project)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950/60">
                        <Eye className="w-4 h-4 text-cyan-300" />
                      </div>

                      <div className="absolute bottom-1 left-1.5 right-1.5 pointer-events-none">
                        <p className="text-[9px] font-bold text-white truncate drop-shadow">
                          {project.title.replace(' Project', '').replace(' Creative', '')}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
