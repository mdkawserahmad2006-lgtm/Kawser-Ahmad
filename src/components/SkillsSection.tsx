import React, { useState } from 'react';
import { Palette, Film, TrendingUp, Sparkles, PenTool, Globe, CheckCircle2, Cpu } from 'lucide-react';
import { skillCategories } from '../data/defaultData';
import { useLanguage } from '../context/LanguageContext';

// Authentic Official Adobe and Meta app branding specifications
const appBrandConfig: Record<string, {
  shortName: string;
  fullName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  tag: string;
}> = {
  premiere: {
    shortName: 'Pr',
    fullName: 'Adobe Premiere Pro',
    badgeBg: 'bg-[#00005b]',
    badgeBorder: 'border-[#9999ff]',
    badgeText: 'text-[#9999ff]',
    glowColor: 'shadow-[0_0_30px_rgba(153,153,255,0.85)]',
    tag: 'Official Video Editing'
  },
  aftereffects: {
    shortName: 'Ae',
    fullName: 'Adobe After Effects',
    badgeBg: 'bg-[#00005b]',
    badgeBorder: 'border-[#9999ff]',
    badgeText: 'text-[#9999ff]',
    glowColor: 'shadow-[0_0_30px_rgba(153,153,255,0.85)]',
    tag: 'VFX & Motion Graphics'
  },
  photoshop: {
    shortName: 'Ps',
    fullName: 'Adobe Photoshop',
    badgeBg: 'bg-[#001e36]',
    badgeBorder: 'border-[#31a8ff]',
    badgeText: 'text-[#31a8ff]',
    glowColor: 'shadow-[0_0_30px_rgba(49,168,255,0.85)]',
    tag: 'Raster Creative Suite'
  },
  illustrator: {
    shortName: 'Ai',
    fullName: 'Adobe Illustrator',
    badgeBg: 'bg-[#330000]',
    badgeBorder: 'border-[#ff9a00]',
    badgeText: 'text-[#ff9a00]',
    glowColor: 'shadow-[0_0_30px_rgba(255,154,0,0.85)]',
    tag: 'Vector Engine & Logos'
  },
  meta: {
    shortName: 'Meta',
    fullName: 'Meta Ads Manager',
    badgeBg: 'bg-[#001428]',
    badgeBorder: 'border-[#0081fb]',
    badgeText: 'text-[#0081fb]',
    glowColor: 'shadow-[0_0_30px_rgba(0,129,251,0.85)]',
    tag: 'CAPI & Campaign Scale'
  },
  digital: {
    shortName: 'DG',
    fullName: 'Digital Growth Strategy',
    badgeBg: 'bg-[#002422]',
    badgeBorder: 'border-[#14b8a6]',
    badgeText: 'text-[#14b8a6]',
    glowColor: 'shadow-[0_0_30px_rgba(20,184,166,0.85)]',
    tag: 'Analytics & Funnels'
  }
};

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-14 lg:py-20 bg-transparent border-t border-sky-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.skillsBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.skillsTitle}
          </h2>
          <p className="text-navy-mist text-xs sm:text-sm mt-1.5">
            {t.skillsSubtitle}
          </p>
        </div>

        {/* 6 Hard Skills Grid (Adobe Premiere Pro, After Effects, Photoshop, Illustrator, Meta, Digital) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-4">
          {skillCategories.map((group, idx) => {
            const isHovered = hoveredSkillId === group.id;
            const app = appBrandConfig[group.id] || appBrandConfig.premiere;
            const isPremiere = group.id === 'premiere';
            const isAE = group.id === 'aftereffects';
            const isPS = group.id === 'photoshop';
            const isAI = group.id === 'illustrator';
            const isMeta = group.id === 'meta';

            // Distinct neon glow accents per skill discipline
            const glowShadowClass = isPremiere
              ? 'hover:shadow-[0_16px_50px_rgba(56,189,248,0.4)] hover:border-sky-300'
              : isAE
              ? 'hover:shadow-[0_16px_50px_rgba(129,140,248,0.4)] hover:border-indigo-300'
              : isPS
              ? 'hover:shadow-[0_16px_50px_rgba(6,182,212,0.4)] hover:border-cyan-300'
              : isAI
              ? 'hover:shadow-[0_16px_50px_rgba(245,158,11,0.4)] hover:border-amber-300'
              : isMeta
              ? 'hover:shadow-[0_16px_50px_rgba(16,185,129,0.4)] hover:border-emerald-300'
              : 'hover:shadow-[0_16px_50px_rgba(20,184,166,0.4)] hover:border-teal-300';

            const accentColor = isPremiere
              ? 'text-sky-400'
              : isAE
              ? 'text-indigo-400'
              : isPS
              ? 'text-cyan-400'
              : isAI
              ? 'text-amber-400'
              : isMeta
              ? 'text-emerald-400'
              : 'text-teal-400';

            const pulseDotColor = isPremiere
              ? 'bg-sky-400'
              : isAE
              ? 'bg-indigo-400'
              : isPS
              ? 'bg-cyan-400'
              : isAI
              ? 'bg-amber-400'
              : isMeta
              ? 'bg-emerald-400'
              : 'bg-teal-400';

            return (
              <div
                key={group.id}
                onMouseEnter={() => setHoveredSkillId(group.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                onTouchStart={() => setHoveredSkillId(group.id)}
                style={{ animationDelay: `${idx * 0.35}s` }}
                className={`relative group rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#071f3a]/95 via-[#041528]/95 to-[#020b18] border border-sky-500/25 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] ${glowShadowClass} flex flex-col justify-between cursor-pointer animate-float-subtle`}
              >
                {/* Diagonal Neon Laser Light Sweep on Hover / Phone Touch */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-12 z-20" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff] z-10" />
                  <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500" />
                </div>

                <div className="relative z-10">
                  {/* Top Header Row with Evolving Adobe App Launcher */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      
                      {/* 
                        USER REQUESTED ADOBE APP LAUNCHER:
                        "যেগুলো আমার অ্যাডোবির অ্যাপগুলো আছে, এগুলোতে যাতে কার্সার যখন কেউ শো করবে, তখন এটা যাতে এখানে একটা অ্যাডোবির অ্যাপ শো করে... 
                        যাতে করে অ্যাপগুলো যেটাতে কার্সার যাবে, সেটা থেকে অ্যাপটা বের হয়ে অন্য জায়গায় চলে যাবে এবং যখন কার্সার সরিয়ে নিবে, তখন আবার সেই জায়গায় অ্যাপটা আবার পুনরায় চলে আসবে।"
                      */}
                      <div className="relative flex-shrink-0">
                        {/* Vertical Energy Laser Trail beneath floating app */}
                        <div
                          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-cyan-400/80 via-sky-300 to-transparent transition-all duration-500 ease-out z-25 ${
                            isHovered ? 'h-14 sm:h-16 opacity-100 -translate-y-8' : 'h-0 opacity-0'
                          }`}
                        />

                        {/* Floating Pill Banner when App Soars Above Card */}
                        <div
                          className={`pointer-events-none absolute -top-20 sm:-top-22 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-400 ease-out z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/95 border border-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.7)] text-[10px] font-extrabold text-white ${
                            isHovered
                              ? 'opacity-100 scale-100 -translate-y-1'
                              : 'opacity-0 scale-75 translate-y-3 pointer-events-none'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>{app.fullName} Active</span>
                        </div>

                        {/* The Official Adobe App Box that launches out and flies above the card */}
                        <div
                          className={`relative z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center font-black transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${app.badgeBg} ${app.badgeBorder} ${app.badgeText} ${
                            isHovered
                              ? `-translate-y-12 sm:-translate-y-14 scale-125 sm:scale-130 ${app.glowColor} ring-2 ring-white/60`
                              : 'translate-y-0 scale-100 shadow-md'
                          }`}
                          title={app.fullName}
                        >
                          {/* Inner typography / emblem */}
                          <span className={`${app.shortName.length > 2 ? 'text-[11px] tracking-tight' : 'text-base sm:text-lg'} font-black drop-shadow-md select-none`}>
                            {app.shortName}
                          </span>
                        </div>

                        {/* Base Holographic Landing Pad (always visible so returning spot is clear) */}
                        <div className="absolute inset-0 rounded-xl border border-sky-500/25 bg-[#020d1c]/80 pointer-events-none z-10 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-sky-500/40 uppercase">{app.shortName}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-tight">
                          {group.title}
                        </h3>
                        <span className={`text-[11px] font-semibold ${accentColor}`}>
                          {group.badge}
                        </span>
                      </div>
                    </div>

                    {/* Live Activity Pulse Indicator */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#020d1c] border border-sky-500/30 shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseDotColor} opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseDotColor}`} />
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-300">
                        {isHovered ? 'Launched' : 'Ready'}
                      </span>
                    </div>
                  </div>

                  {/* Capabilities List (Animated & Interactive) */}
                  <div className="space-y-2 mb-4 pt-2.5 border-t border-sky-500/15">
                    {group.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-start gap-2.5 text-xs group/item">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accentColor} flex-shrink-0 mt-0.5 group-hover:scale-115 transition-transform duration-200`} />
                        <span className="text-slate-200 text-xs leading-snug group-hover:text-white transition-colors">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compact Tools Row with Interactive Pills */}
                {group.tools && group.tools.length > 0 && (
                  <div className="relative z-10 pt-3 border-t border-sky-500/15 flex flex-wrap gap-1.5">
                    {group.tools.map((tool, toolIdx) => (
                      <span
                        key={toolIdx}
                        className="px-2.5 py-0.5 text-[10px] font-medium rounded-md bg-[#031426] text-sky-300 border border-sky-500/25 hover:border-cyan-400 hover:text-white hover:scale-105 transition-all cursor-default shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
