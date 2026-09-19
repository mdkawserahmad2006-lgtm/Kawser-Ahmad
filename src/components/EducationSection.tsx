import React from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { educationList } from '../data/defaultData';

export const EducationSection: React.FC = () => {
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
            <span>Academic Background & Professional Training</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Education & Training
          </h2>
          <p className="text-navy-mist text-xs sm:text-sm mt-1.5">
            Academic degrees and verified skill development certifications.
          </p>
        </div>

        {/* Education 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {educationList.map((item) => (
            <div
              key={item.id}
              className="navy-glass-card rounded-2xl p-5 border border-sky-500/20 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0">
                      {item.type === 'certification' ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-sky-400 mt-0.5">{item.institution}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#041930] border border-sky-500/20 text-sky-300">
                    {item.year}
                  </span>
                </div>

                {item.description && (
                  <p className="text-xs text-navy-mist leading-relaxed mb-3">
                    {item.description}
                  </p>
                )}

                {item.learnings && (
                  <div className="space-y-1.5 mb-3 pt-2 border-t border-sky-500/10">
                    {item.learnings.map((lrn, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{lrn}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-sky-500/15 flex items-center justify-between">
                <span className="text-[10px] text-sky-300/80 font-medium">{item.badge}</span>
                {item.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
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
