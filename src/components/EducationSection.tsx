import React from 'react';
import { GraduationCap, Award, CheckCircle2, Calendar, BookOpen } from 'lucide-react';
import { educationList } from '../data/defaultData';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="relative py-20 lg:py-24 bg-transparent border-t border-sky-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072548] border border-sky-500/30 text-sky-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>Academic Background & Verified Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-navy-ice">Education & </span>
            <span className="text-gradient-cyan-teal">Certifications</span>
          </h2>
          <p className="text-navy-mist text-sm sm:text-base mt-2">
            Academic degree from Jamia Babus Salam (Dhaka Airport) and professional certifications in Meta Marketing, Graphic Design & Video Editing from As-Sunnah Skill Development Institute (2026).
          </p>
        </div>

        {/* Education Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((item) => (
            <div
              key={item.id}
              className="navy-glass-card rounded-2xl p-6 border border-sky-500/20 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0">
                      {item.type === 'certification' ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <BookOpen className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-ice leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-sky-400">{item.institution}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#041930] border border-sky-500/20 text-sky-300 whitespace-nowrap">
                    {item.year}
                  </span>
                </div>

                <p className="text-xs text-navy-mist leading-relaxed mb-4 pl-12">
                  {item.description}
                </p>
              </div>

              <div className="pl-12 pt-3 border-t border-[#092b50] flex items-center justify-between">
                <span className="text-[11px] text-sky-300/80">{item.badge}</span>
                {item.verified && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
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
