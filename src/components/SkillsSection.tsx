import React from 'react';
import { Palette, Film, TrendingUp, Sparkles, PenTool, Globe, CheckCircle2, Cpu } from 'lucide-react';
import { skillCategories } from '../data/defaultData';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-14 lg:py-20 bg-transparent border-t border-sky-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hard Skills & Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Specialized Skills
          </h2>
          <p className="text-navy-mist text-xs sm:text-sm mt-1.5">
            Core creative software and marketing expertise verified through active client projects.
          </p>
        </div>

        {/* 6 Hard Skills Grid (Adobe Premiere Pro, After Effects, Photoshop, Illustrator, Meta, Digital) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillCategories.map((group) => {
            const isPremiere = group.id === 'premiere';
            const isAE = group.id === 'aftereffects';
            const isPS = group.id === 'photoshop';
            const isAI = group.id === 'illustrator';
            const isMeta = group.id === 'meta';

            return (
              <div
                key={group.id}
                className="navy-glass-card rounded-2xl p-5 border border-sky-500/20 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
                        isPremiere
                          ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                          : isAE
                          ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                          : isPS
                          ? 'bg-blue-500/15 border-blue-500/30 text-cyan-400'
                          : isAI
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          : isMeta
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                      }`}>
                        {isPremiere ? (
                          <Film className="w-4 h-4" />
                        ) : isAE ? (
                          <Sparkles className="w-4 h-4" />
                        ) : isPS ? (
                          <Palette className="w-4 h-4" />
                        ) : isAI ? (
                          <PenTool className="w-4 h-4" />
                        ) : isMeta ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {group.title}
                        </h3>
                        <span className="text-[10px] text-sky-300/80 font-medium">
                          {group.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Capabilities List (No Percentages, Exact Work Items) */}
                  <div className="space-y-2 mb-4 pt-1 border-t border-sky-500/10">
                    {group.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-[11px] leading-snug">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compact Tools Row */}
                {group.tools && group.tools.length > 0 && (
                  <div className="pt-2.5 border-t border-sky-500/15 flex flex-wrap gap-1">
                    {group.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#04192b] text-sky-300/90 border border-sky-500/20"
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
