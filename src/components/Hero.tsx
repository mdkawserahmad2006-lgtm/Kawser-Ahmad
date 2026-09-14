import React from 'react';
import { Palette, Film, TrendingUp, ArrowRight, MessageCircle, Download, CheckCircle, Award, Sparkles, ExternalLink } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCustomizer }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#020a14] via-[#04192b] to-[#020b16]"
    >
      {/* 
        WATERMARK PROFILE IMAGE (Behind the hero backdrop)
      */}
      <div
        id="hero-watermark-backdrop"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative w-[480px] h-[580px] md:w-[680px] md:h-[780px] lg:w-[860px] lg:h-[940px] opacity-[0.14] select-none mix-blend-screen filter contrast-125">
          <img
            src={profile.watermarkUrl || profile.avatarUrl || '/profile.png'}
            alt="Profile Watermark Silhouette"
            className="w-full h-full object-contain object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/profile.png') {
                target.src = '/profile.png';
              }
            }}
          />
        </div>
        {/* Deep teal-cyan atmospheric glow overlays matching the picture's palette */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-sky-600/12 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020b16_85%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Profile Card & Portrait (এখন ডানে না রেখে বামে রাখা হয়েছে) */}
          <div id="hero-left-profile" className="lg:col-span-5 flex justify-center lg:justify-start order-1">
            <div className="relative w-full max-w-[390px]">
              
              {/* Outer Glow Halo Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 via-teal-600/20 to-sky-500/30 rounded-3xl blur-xl opacity-80 animate-pulse" />

              {/* Profile Card Container - deep teal-navy tone */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#061b2b] via-[#041522] to-[#020e18] border border-cyan-500/30 p-4 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden">
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-cyan-400/25 group bg-[#020b14]">
                  <img
                    id="profile-display-photo"
                    src={profile.avatarUrl || '/profile.png'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + '/profile.png') {
                        target.src = '/profile.png';
                      }
                    }}
                  />
                  
                  {/* Subtle Gradient Vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020e18] via-transparent to-transparent opacity-80" />

                  {/* Top Floating Badge: Specialist Status */}
                  <div className="absolute top-3 left-3 bg-[#020d18]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/20 flex items-center gap-1.5 text-xs text-white">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold">3X Multi-Specialist</span>
                  </div>

                  {/* Floating Action Pill: Video & Graphics */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#020f1c]/90 backdrop-blur-md rounded-xl p-2.5 border border-cyan-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-semibold text-white">Direct Client Support</span>
                    </div>
                    <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/90 px-2.5 py-0.5 rounded-md border border-cyan-500/40">
                      24/7 Available
                    </span>
                  </div>
                </div>

                {/* Profile Card Bottom Info */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide">{profile.name}</h3>
                      <p className="text-xs text-cyan-400 font-medium">{profile.roleTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span>📍 {profile.location}</span>
                    <button
                      onClick={onOpenCustomizer}
                      className="text-cyan-400 hover:text-cyan-300 font-medium underline text-[11px]"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Documents, info, specialties & bio (এগুলো এই পাশে/ডানে থাকবে) */}
          <div id="hero-right-documents" className="lg:col-span-7 flex flex-col items-start text-left order-2">
            
            {/* Availability status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Available for Freelance & Full-time Contracts</span>
            </div>

            {/* Main Greeting & Name matching Screenshot 3 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="block text-sky-400 text-lg sm:text-xl font-medium tracking-normal mb-1">
                Hello, I'm
              </span>
              <span className="text-gradient-hero-name block font-black">
                {profile.name}
              </span>
            </h1>

            {/* Specialties Headline matching Screenshot 3 */}
            <div className="text-base sm:text-lg md:text-xl font-semibold mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[#00d2ee]">Specialized in 3 Core Creative Domains:</span>
            </div>

            {/* Three Specialization Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
              {/* Pillar 1: Video Editing */}
              <div className="navy-glass-card rounded-2xl p-3.5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">Video Editing</h2>
                    <p className="text-[11px] text-navy-mist">Reels, Shorts & Promos</p>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Graphic Design */}
              <div className="navy-glass-card rounded-2xl p-3.5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Graphic Design</h2>
                    <p className="text-[11px] text-navy-mist">Logos, Branding & Ads</p>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Meta Marketing */}
              <div className="navy-glass-card rounded-2xl p-3.5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">Meta Marketing</h2>
                    <p className="text-[11px] text-navy-mist">Ad Scaling & High ROAS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Bio */}
            <p className="text-navy-mist text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              {profile.bio}
            </p>

            {/* Experience / Impact Stats Overview matching Screenshot 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full py-4 border-y border-cyan-500/20 mb-8">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#00e5ff]">{profile.experienceYears}</span>
                <span className="text-xs text-navy-steel">Experience</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white">{profile.completedProjects}</span>
                <span className="text-xs text-navy-steel">Projects Done</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-sky-400">{profile.avgRoas}</span>
                <span className="text-xs text-navy-steel">Average ROAS</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400">{profile.clientSatisfaction}</span>
                <span className="text-xs text-navy-steel">Client Rating</span>
              </div>
            </div>

            {/* Action Buttons matching Screenshot 2 button */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <a
                id="hero-btn-portfolio"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl btn-cyan-gradient transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>View Featured Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-btn-whatsapp"
                href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-[#061726]/90 hover:bg-[#092238] border border-cyan-500/30 hover:border-emerald-500/60 rounded-xl transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                id="hero-btn-customize"
                onClick={onOpenCustomizer}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-cyan-300/90 hover:text-cyan-200 bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/30 rounded-xl transition-all"
              >
                <span>Edit Profile & Links</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
