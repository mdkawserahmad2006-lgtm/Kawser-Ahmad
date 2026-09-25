import React from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { educationList } from '../data/defaultData';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="education"
      className="relative py-14 lg:py-20 bg-transparent border-t border-sky-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {educationList.map((item, idx) => (
            <div
              key={item.id}
              style={{ animationDelay: `${idx * 0.3}s` }}
              className="relative group overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#071f3a]/95 via-[#041528]/95 to-[#020b18] border border-sky-500/25 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] hover:border-cyan-300 hover:shadow-[0_14px_45px_rgba(56,189,248,0.35)] flex flex-col justify-between cursor-default animate-float-subtle"
            >
              {/* Glowing Laser Top Border on Hover / Touch */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff] z-20" />

              {/* Diagonal Laser Light Sweep across card */}
              <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] group-active:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-12 z-15" />

              {/* Ambient Radial Glow Orb inside Card */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-sky-500/10 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                      {item.type === 'certification' ? (
                        <Award className="w-5 h-5 text-cyan-300" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-cyan-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-sky-400 font-medium mt-0.5">{item.institution}</p>
                    </div>
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
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
