import React, { useState } from 'react';
import { Palette, Film, TrendingUp, ArrowRight, MessageCircle, ExternalLink, FileText, Play, Eye, Sparkles, Smartphone } from 'lucide-react';
import { ProfileData, ProjectItem } from '../types';
import { getOptimizedCover } from '../utils/behanceCovers';
import { useLanguage } from '../context/LanguageContext';

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
  const { t, isRtl } = useLanguage();

  const featuredVideos = (projects || []).filter(p => p.category === 'video').slice(0, 3);
  const featuredGraphics = (projects || []).filter(p => p.category === 'graphics').slice(0, 6);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-28 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Profile Card */}
          <div id="hero-left-profile" className="lg:col-span-5 flex justify-center lg:justify-start order-1">
            <div className="relative w-full max-w-[370px] animate-float-portrait">
              
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
                      <span className="text-xs font-semibold text-white">{t.availableBadge}</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-300 bg-[#06203d] px-2 py-0.5 rounded border border-sky-500/35">
                      {t.directChatBadge}
                    </span>
                  </div>
                </div>

                {/* Interactive Promo Button */}
                {onPlayPromo && (
                  <button
                    onClick={onPlayPromo}
                    className="w-full mt-3 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500/20 via-blue-600/30 to-sky-500/20 hover:from-sky-500/35 hover:to-blue-600/40 border border-sky-400/40 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                      <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                    </div>
                    <span>{t.ctaWatchPromo}</span>
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
                    className="text-sky-400 hover:text-sky-300 font-medium text-[11px] underline cursor-pointer"
                  >
                    {t.navSettings}
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Concise Info, Specialties, Modern CTAs & Large Previews */}
          <div id="hero-right-documents" className="lg:col-span-7 flex flex-col items-start text-left order-2">
            
            {/* Minimal Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t.availableBadge}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              <span className="block text-sky-400 text-base sm:text-lg font-medium mb-1">
                {t.helloIm}
              </span>
              <span className="text-gradient-hero-name block font-black">
                {profile.name}
              </span>
            </h1>

            {/* Role Title */}
            <p className="text-sm sm:text-base font-semibold text-cyan-300 mb-5">
              {t.roleTitle}
            </p>

            {/* Three Cinematic Specialization Quick Links with Interactive Hover Lighting & Scale */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full mb-5">
              {/* Pillar 1: Cinematic Video Editing */}
              <a
                href="#slot-video"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-video')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative group overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-b from-[#07192f]/90 via-[#041224]/95 to-[#020b16] border border-sky-500/30 hover:border-sky-400 hover:ring-1 hover:ring-sky-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.45),0_12px_24px_rgba(2,132,199,0.3)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1.5 active:scale-95 flex flex-col items-start cursor-pointer"
              >
                {/* Top Lens-flare Laser Line */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-cyan-300 transition-opacity duration-300" />
                
                {/* Ambient Radial Backlight Glow */}
                <span className="absolute inset-0 bg-radial from-sky-400/25 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="relative w-full flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-sky-500/15 border border-sky-400/35 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.25)] group-hover:bg-sky-400 group-hover:text-slate-950 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.6)] group-hover:scale-110 transition-all duration-300">
                    <Film className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors">
                    4K REELS
                  </span>
                </div>

                <h2 className="relative text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                  {t.pillarVideoTitle}
                </h2>
                <span className="relative text-[10px] text-navy-mist group-hover:text-sky-200 mt-0.5 flex items-center gap-1 transition-colors">
                  {t.pillarVideoSub} <ArrowRight className="w-2.5 h-2.5 text-sky-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </a>

              {/* Pillar 2: Cinematic Graphic Design */}
              <a
                href="#slot-graphics"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-graphics')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative group overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-b from-[#150a26]/90 via-[#0d071c]/95 to-[#04020a] border border-purple-500/30 hover:border-purple-400 hover:ring-1 hover:ring-purple-400/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.45),0_12px_24px_rgba(147,51,234,0.3)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1.5 active:scale-95 flex flex-col items-start cursor-pointer"
              >
                {/* Top Lens-flare Laser Line */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-fuchsia-300 transition-opacity duration-300" />
                
                {/* Ambient Radial Backlight Glow */}
                <span className="absolute inset-0 bg-radial from-purple-500/25 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="relative w-full flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-purple-500/15 border border-purple-400/35 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.25)] group-hover:bg-purple-400 group-hover:text-slate-950 group-hover:shadow-[0_0_18px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-all duration-300">
                    <Palette className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors">
                    CREATIVE
                  </span>
                </div>

                <h2 className="relative text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                  {t.pillarGraphicsTitle}
                </h2>
                <span className="relative text-[10px] text-navy-mist group-hover:text-purple-200 mt-0.5 flex items-center gap-1 transition-colors">
                  {t.pillarGraphicsSub} <ArrowRight className="w-2.5 h-2.5 text-purple-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </a>

              {/* Pillar 3: Cinematic Meta Marketing */}
              <a
                href="#slot-meta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('slot-meta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative group overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-b from-[#06241e]/90 via-[#031713]/95 to-[#010c09] border border-emerald-500/30 hover:border-emerald-400 hover:ring-1 hover:ring-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.45),0_12px_24px_rgba(13,148,136,0.3)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1.5 active:scale-95 flex flex-col items-start cursor-pointer"
              >
                {/* Top Lens-flare Laser Line */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-teal-300 transition-opacity duration-300" />
                
                {/* Ambient Radial Backlight Glow */}
                <span className="absolute inset-0 bg-radial from-emerald-500/25 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="relative w-full flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-emerald-500/15 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)] group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:shadow-[0_0_18px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-all duration-300">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
                    ROAS
                  </span>
                </div>

                <h2 className="relative text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                  {t.pillarMetaTitle}
                </h2>
                <span className="relative text-[10px] text-navy-mist group-hover:text-emerald-200 mt-0.5 flex items-center gap-1 transition-colors">
                  {t.pillarMetaSub} <ArrowRight className="w-2.5 h-2.5 text-emerald-400 group-hover:translate-x-1.5 transition-transform duration-300" />
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
                <span className="block text-lg sm:text-xl font-black text-[#00e5ff]">{t.statExperienceValue || '4 Months'}</span>
                <span className="text-[11px] text-navy-steel">{t.statExperience}</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-white">{profile.completedProjects}</span>
                <span className="text-[11px] text-navy-steel">{t.statProjects}</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-sky-400">{profile.avgRoas}</span>
                <span className="text-[11px] text-navy-steel">{t.statRoas}</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-emerald-400">{profile.clientSatisfaction}</span>
                <span className="text-[11px] text-navy-steel">{t.statSatisfaction}</span>
              </div>
            </div>

            {/* 
              MODERN 3 PRIMARY CTA BUTTONS + CV Pill
              Upgraded with 2026 aesthetics: high-contrast neon borders, tactile depth, pulsing glows, and responsive minimum 44px touch targets.
            */}
            <div id="hero-modern-cta-trio" className="flex flex-wrap items-center gap-3 w-full mb-7">
              {/* Button 1: Modern Play Promo Reel */}
              {onPlayPromo && (
                <button
                  id="hero-btn-play-promo-action"
                  type="button"
                  onClick={onPlayPromo}
                  className="relative group inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 hover:from-sky-300 hover:to-cyan-200 rounded-2xl transition-all duration-300 shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[44px] overflow-hidden"
                >
                  {/* Subtle shine sweep */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  
                  <span className="relative w-6 h-6 rounded-full bg-slate-950 text-cyan-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-cyan-300 ml-0.5" />
                  </span>
                  <span className="relative tracking-wide">{t.ctaWatchPromo}</span>
                </button>
              )}

              {/* Button 2: Modern View Works */}
              <a
                id="hero-btn-portfolio"
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#041c38]/90 hover:bg-[#072c55] border border-sky-400/40 hover:border-cyan-300 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(3,20,40,0.6)] hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>{t.ctaViewWorks}</span>
                <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1.5 transition-transform" />
              </a>

              {/* Button 3: Modern Direct WhatsApp Chat */}
              <a
                id="hero-btn-whatsapp"
                href={`https://wa.me/${(profile.whatsappNumber || '8801953941415').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Md Kawser Ahmad, I visited your portfolio and would like to discuss a project with you.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-300 hover:text-white bg-gradient-to-r from-emerald-950/70 via-[#04281f]/80 to-emerald-950/70 hover:from-emerald-900/90 hover:to-teal-900/90 border border-emerald-400/50 hover:border-emerald-300 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(5,150,105,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>{t.ctaWhatsApp}</span>
              </a>

              {/* Complementary CV / Resume Button */}
              {onOpenResume && (
                <button
                  id="hero-btn-resume"
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-sky-200 hover:text-white bg-[#06203d]/80 hover:bg-[#0a2e58] border border-sky-500/30 hover:border-sky-400 rounded-xl transition-all cursor-pointer min-h-[40px]"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.ctaResume}</span>
                </button>
              )}
            </div>

            {/* 
              TOP PREVIEW STRIP: SUBSTANTIALLY LARGER, PROMINENT VIDEO PREVIEW CARDS
              User Request: "শুরুতে যে আমার ভিডিওগুলো শো করে, এগুলোর সাইজটা আরেকটু বড় হলে মনে হয় ভালো হবে।"
              Upgraded layout: Generous cards with rich details, large center play glow, Reels-scroll trigger, and responsive layout.
            */}
            <div className="w-full pt-5 border-t border-sky-500/20">
              <div className="flex items-center justify-between mb-3.5">
                {/* Switcher: Featured Videos vs Graphic Works */}
                <div className="flex items-center gap-1.5 bg-[#031528] p-1 rounded-xl border border-sky-500/25">
                  <button
                    type="button"
                    onClick={() => setTopPreviewTab('video')}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      topPreviewTab === 'video'
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-md scale-100'
                        : 'text-navy-mist hover:text-white hover:bg-sky-500/10'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{t.topPreviewVideos} ({featuredVideos.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopPreviewTab('graphics')}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      topPreviewTab === 'graphics'
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md scale-100'
                        : 'text-navy-mist hover:text-white hover:bg-sky-500/10'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>{t.topPreviewGraphics} ({featuredGraphics.length})</span>
                  </button>
                </div>

                <a
                  href={topPreviewTab === 'video' ? '#slot-video' : '#slot-graphics'}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = topPreviewTab === 'video' ? 'slot-video' : 'slot-graphics';
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t.seeAll}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* View 1: Top Featured Video Reels (Enlarged, Cinematic Cards) */}
              {topPreviewTab === 'video' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 animate-in fade-in duration-200">
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
                      className="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-sky-500/35 hover:border-cyan-300 transition-all duration-300 bg-[#020b18] shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:-translate-y-1 cursor-pointer text-left focus:outline-none flex flex-col justify-end p-3.5"
                      title={`Play ${video.title}`}
                    >
                      <img
                        src={video.coverImage}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== window.location.origin + '/profile.png') {
                            target.src = '/profile.png';
                          }
                        }}
                      />
                      
                      {/* Deep multi-stop gradient for maximum contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020a16] via-[#020a16]/40 to-transparent" />
                      
                      {/* Top Branding Pill: Logo on LEFT, Name on SIDE */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
                        <img
                          src="/profile.png"
                          alt="Md Kawser Ahmad"
                          className="w-3.5 h-3.5 rounded-full object-cover"
                        />
                        <span className="text-[9px] font-bold text-white tracking-wide">
                          Kawser Theory
                        </span>
                      </div>

                      {/* Reels Mode Badge */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-[9px] font-semibold text-sky-300 backdrop-blur-sm">
                        <Smartphone className="w-2.5 h-2.5" />
                        <span>Reel</span>
                      </div>

                      {/* Prominent Glowing Play Button in Center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-950 flex items-center justify-center group-hover:scale-115 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                          <Play className="w-5 h-5 fill-slate-950 ml-0.5 text-slate-950" />
                        </div>
                      </div>

                      {/* Video Title & Reels Hint */}
                      <div className="relative z-10 pointer-events-none">
                        <p className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-md group-hover:text-cyan-200 transition-colors">
                          {video.title}
                        </p>
                        <p className="text-[10px] text-sky-300/90 font-medium flex items-center gap-1 mt-0.5">
                          <span>{t.reelsPlayHint}</span>
                          <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* View 2: Top Graphic Designs (Enlarged, Clear High-Res Cards) */}
              {topPreviewTab === 'graphics' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 animate-in fade-in duration-200">
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
                      className="group relative aspect-square rounded-2xl overflow-hidden border border-sky-500/30 hover:border-cyan-300 transition-all duration-300 bg-[#020b18] shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 cursor-pointer text-left focus:outline-none"
                      title={`${project.title}`}
                    >
                      <img
                        src={getOptimizedCover(project)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950/60">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                          <Eye className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>

                      <div className="absolute bottom-1.5 left-2 right-2 pointer-events-none">
                        <p className="text-[10px] font-bold text-white truncate drop-shadow">
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
