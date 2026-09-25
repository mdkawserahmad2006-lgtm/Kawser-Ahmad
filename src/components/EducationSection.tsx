import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen, Book, Sparkles } from 'lucide-react';
import { educationList } from '../data/defaultData';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredEduId, setHoveredEduId] = useState<string | null>(null);

  return (
    <section
      id="education"
      className="relative py-14 lg:py-20 bg-transparent border-t border-sky-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#072548] border border-sky-500/30 text-sky-300 text-xs font-semibold mb-2.5">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.educationBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.educationTitle}
          </h2>
          <p className="text-navy-mist text-xs sm:text-sm mt-1.5">
            {t.educationSubtitle}
          </p>
        </div>

        {/* Education 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 pt-4">
          {educationList.map((item, idx) => {
            const isHovered = hoveredEduId === item.id;
            const isCertification = item.type === 'certification';

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredEduId(item.id)}
                onMouseLeave={() => setHoveredEduId(null)}
                onTouchStart={() => setHoveredEduId(item.id)}
                style={{ animationDelay: `${idx * 0.3}s` }}
                className="relative group rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#071f3a]/95 via-[#041528]/95 to-[#020b18] border border-sky-500/25 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] hover:border-cyan-300 hover:shadow-[0_16px_50px_rgba(56,189,248,0.4)] flex flex-col justify-between cursor-pointer animate-float-subtle"
              >
                {/* Diagonal Laser Light Sweep across card (clipped inside) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff] z-20" />
                  <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-12 z-15" />
                  <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-sky-500/10 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3.5">
                      
                      {/* 
                        USER REQUESTED: BOOK / CERTIFICATE LAUNCHER & OPENING ANIMATION
                        "আমার এডুকেশনের ওইখানে তুমি যে বুকগুলা দেখাইছো আইকন হিসেবে, এগুলাও সেম ওই অ্যাপগুলোর মতো এখানে আসবে। 
                        যখন কেউ এটাতে আসবে তখন সেটা উপরে গিয়ে খুলে যাবে। বুকটা এখান থেকে উপরে গিয়ে খুলে যাবে এবং কার্সার সরিয়ে নিলে আবার তার ঠিক জায়গায় চলে আসবে।"
                      */}
                      <div className="relative flex-shrink-0">
                        {/* Vertical Energy Laser Trail beneath floating book */}
                        <div
                          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-cyan-400/80 via-sky-300 to-transparent transition-all duration-500 ease-out z-25 ${
                            isHovered ? 'h-14 sm:h-16 opacity-100 -translate-y-8' : 'h-0 opacity-0'
                          }`}
                        />

                        {/* Floating Pill Banner when Book Opens Above Card */}
                        <div
                          className={`pointer-events-none absolute -top-20 sm:-top-22 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-400 ease-out z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/95 border border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.7)] text-[10px] font-extrabold text-white ${
                            isHovered
                              ? 'opacity-100 scale-100 -translate-y-1'
                              : 'opacity-0 scale-75 translate-y-3 pointer-events-none'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-cyan-300 animate-spin" />
                          <span>{isCertification ? 'Certification Unlocked' : 'Study Curriculum Opened'}</span>
                        </div>

                        {/* The Flying Book / Award Box that launches out and opens up */}
                        <div
                          className={`relative z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            isCertification
                              ? 'bg-[#181100] border-amber-400 text-amber-300'
                              : 'bg-[#001933] border-cyan-400 text-cyan-300'
                          } ${
                            isHovered
                              ? `-translate-y-12 sm:-translate-y-14 scale-125 sm:scale-130 shadow-[0_0_35px_rgba(56,189,248,0.85)] ring-2 ring-white/60`
                              : 'translate-y-0 scale-100 shadow-md'
                          }`}
                          title={item.title}
                        >
                          {/* Animated Open Book Transformation */}
                          {isHovered ? (
                            <div className="relative flex items-center justify-center animate-in zoom-in-75 duration-300">
                              {isCertification ? (
                                <Award className="w-6 h-6 text-amber-300 animate-pulse stroke-[2.5]" />
                              ) : (
                                <BookOpen className="w-6 h-6 text-cyan-200 stroke-[2.5] drop-shadow-[0_0_8px_#00e5ff]" />
                              )}
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center">
                              {isCertification ? (
                                <Award className="w-5 h-5 text-amber-400/90" />
                              ) : (
                                <Book className="w-5 h-5 text-cyan-400/90" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Base Holographic Landing Pad (waiting dock) */}
                        <div className="absolute inset-0 rounded-xl border border-sky-500/25 bg-[#020d1c]/80 pointer-events-none z-10 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-sky-500/40 uppercase">
                            {isCertification ? 'CERT' : 'EDU'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-sky-400 font-medium mt-0.5">{item.institution}</p>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#020d1c] border border-sky-500/30 shadow-sm flex-shrink-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-300">
                        {isHovered ? 'Opened' : 'Verified'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#041930] border border-sky-500/30 text-sky-300 shadow-sm">
                      {item.year}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-navy-mist leading-relaxed mb-3.5">
                      {item.description}
                    </p>
                  )}

                  {item.learnings && (
                    <div className="space-y-2 mb-4 pt-2.5 border-t border-sky-500/15">
                      {item.learnings.map((lrn, lrnIdx) => (
                        <div key={lrnIdx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-200 text-xs">{lrn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 pt-3 border-t border-sky-500/15 flex items-center justify-between">
                  <span className="text-[11px] text-sky-300/90 font-medium">{item.badge}</span>
                  {item.verified && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified Credential</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
