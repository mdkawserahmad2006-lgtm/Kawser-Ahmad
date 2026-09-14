import React from 'react';
import { Palette, Film, TrendingUp, ArrowRight, MessageCircle, Download, CheckCircle, Award, Sparkles, ExternalLink, FileText, Play } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
  onOpenResume?: () => void;
  onPlayPromo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCustomizer, onOpenResume, onPlayPromo }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Profile Card & Portrait with Fluid Floating & Glow Animation */}
          <div id="hero-left-profile" className="lg:col-span-5 flex justify-center lg:justify-start order-1">
            <div className="relative w-full max-w-[390px] animate-float-portrait">
              
              {/* Animated Outer Glow Halo Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/40 via-cyan-500/30 to-blue-600/40 rounded-3xl blur-xl opacity-80 animate-border-glow" />

              {/* Profile Card Container - deep studio navy tone */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#071f3a] via-[#041528] to-[#020d1c] border border-sky-500/35 p-4 sm:p-5 shadow-2xl shadow-black/90 overflow-hidden transition-all duration-300">
                
                {/* Image Container with Shimmer Light Sweep */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-sky-400/30 group bg-[#020b18]">
                  <img
                    id="profile-display-photo"
                    src={profile.avatarUrl || '/profile.png'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + '/profile.png') {
                        target.src = '/profile.png';
                      }
                    }}
                  />
                  
                  {/* Subtle Shimmer Sheen Passing Across the Photo */}
                  <div className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent shimmer-light-sweep" />

                  {/* Subtle Gradient Vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020e18] via-transparent to-transparent opacity-85" />

                  {/* Top Floating Badge: Specialist Status */}
                  <div className="absolute top-3 left-3 bg-[#031326]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/25 flex items-center gap-1.5 text-xs text-white shadow">
                    <Award className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold">3X Creative Specialist</span>
                  </div>

                  {/* Floating Action Pill: Direct Support */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#031326]/90 backdrop-blur-md rounded-xl p-2.5 border border-sky-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-semibold text-white">Direct Client Support</span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-300 bg-[#06203d] px-2.5 py-0.5 rounded-md border border-sky-500/40">
                      24/7 Available
                    </span>
                  </div>
                </div>

                {/* Interactive Promo Trigger on the Card */}
                {onPlayPromo && (
                  <button
                    onClick={onPlayPromo}
                    className="w-full mt-3 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500/20 via-blue-600/30 to-sky-500/20 hover:from-sky-500/35 hover:to-blue-600/40 border border-sky-400/40 hover:border-sky-300 text-sky-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
                    title="Watch Official Intro & Promo Reel"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                    <span>Watch Official Showroom Promo</span>
                  </button>
                )}

                {/* Profile Card Bottom Info */}
                <div className="mt-3 pt-3 border-t border-sky-950/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide">{profile.name}</h3>
                      <p className="text-xs text-sky-400 font-medium">{profile.roleTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span>📍 {profile.location}</span>
                    <button
                      onClick={onOpenCustomizer}
                      className="text-sky-400 hover:text-sky-300 font-medium underline text-[11px]"
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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
              {/* Watch Showroom Intro Promo Button */}
              {onPlayPromo && (
                <button
                  id="hero-btn-play-promo-action"
                  onClick={onPlayPromo}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-sky-950/80 group"
                  title="Play Showroom Intro Promo Reel"
                >
                  <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>Watch Intro Promo</span>
                </button>
              )}

              <a
                id="hero-btn-portfolio"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl btn-cyan-gradient transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-sky-950"
              >
                <span>View Featured Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* CV / Resume Button */}
              {onOpenResume && (
                <button
                  id="hero-btn-resume"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-sky-200 hover:text-white bg-[#06203d]/90 hover:bg-[#0a2e58] border border-sky-500/35 hover:border-sky-400 rounded-xl transition-all shadow-md group"
                  title="View & Download Curriculum Vitae"
                >
                  <FileText className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Curriculum Vitae (CV)</span>
                </button>
              )}

              <a
                id="hero-btn-whatsapp"
                href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-[#051930]/90 hover:bg-[#082444] border border-sky-500/25 hover:border-emerald-500/60 rounded-xl transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>

              <button
                id="hero-btn-customize"
                onClick={onOpenCustomizer}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-semibold text-sky-300/80 hover:text-white bg-[#04162a]/70 hover:bg-[#061e38] border border-sky-500/20 hover:border-sky-400/40 rounded-xl transition-all"
                title="Settings"
              >
                <span>Edit Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
