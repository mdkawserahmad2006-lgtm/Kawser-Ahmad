import React from 'react';
import { Palette, Film, TrendingUp, Mic, Cpu } from 'lucide-react';
import { skillCategories } from '../data/defaultData';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-20 lg:py-28 bg-transparent border-t border-cyan-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Stack & Specialized Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-white">Core Skills & </span>
            <span className="text-[#00e5ff]">Creative Domains</span>
          </h2>
          <p className="text-navy-mist text-sm sm:text-base mt-3">
            Deep hands-on expertise across Video Editing, Graphic Design, Meta Marketing, and Public Speaking.
          </p>
        </div>

        {/* 4 Skill Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skillCategories.map((group) => {
            const isVideo = group.id === 'video';
            const isGraphics = group.id === 'graphics';
            const isMeta = group.id === 'meta';
            const isSpeaking = group.id === 'speaking';

            return (
              <div
                key={group.id}
                className="navy-glass-card rounded-2xl p-5 sm:p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg ${
                      isVideo
                        ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                        : isGraphics
                        ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                        : isMeta
                        ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                        : 'bg-indigo-500/15 border-indigo-500/30 text-cyan-300'
                    }`}>
                      {isVideo ? (
                        <Film className="w-5 h-5" />
                      ) : isGraphics ? (
                        <Palette className="w-5 h-5" />
                      ) : isMeta ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#031320] border border-cyan-500/20 text-cyan-300">
                      {group.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs text-navy-mist leading-relaxed mb-5 min-h-[48px]">
                    {group.description}
                  </p>

                  {/* Skills List with Progress Bars */}
                  <div className="space-y-3.5 mb-6">
                    {group.skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-white text-[11px] truncate mr-1">{skill.name}</span>
                          <span className="text-cyan-400 font-bold text-[11px]">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#031422] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              isVideo
                                ? 'bg-gradient-to-r from-sky-500 to-cyan-400'
                                : isGraphics
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                                : isMeta
                                ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                                : 'bg-gradient-to-r from-cyan-400 to-sky-300'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software / Tools Badges */}
                <div className="pt-4 border-t border-cyan-500/20">
                  <span className="text-[10px] font-bold text-navy-steel uppercase tracking-wider block mb-2">
                    Tools & Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {group.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[#04192b] text-navy-mist border border-cyan-500/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
