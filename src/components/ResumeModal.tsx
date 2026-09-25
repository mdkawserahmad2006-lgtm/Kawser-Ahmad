import React, { useState } from 'react';
import { FileText, Download, Printer, ExternalLink, X, Check, Award, Briefcase, GraduationCap, Sparkles, Mail, Phone, MapPin, Share2, Globe, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../types';
import { skillCategories, educationList } from '../data/defaultData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onOpenCustomizer: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenCustomizer
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.resumeUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="modal-resume-viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#031122] border border-cyan-500/40 shadow-2xl shadow-black/90 overflow-hidden flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#020b16] border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Curriculum Vitae (CV)</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Official CV
                </span>
              </h2>
              <p className="text-xs text-navy-mist">MD KAWSER AHMED • Video Editor, Graphic Designer & Meta Marketer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-cyan-gradient text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Attached PDF</span>
              </a>
            ) : (
              <button
                onClick={onOpenCustomizer}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#051c33] border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:border-cyan-400 transition-colors"
                title="Add your Google Drive or custom PDF link"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Attach External PDF Link</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="p-2 text-navy-mist hover:text-white bg-[#061e36] rounded-xl text-xs transition-colors"
              title="Print CV"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-[#061e36] rounded-xl transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="navy-glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-white shadow-xl">
            
            {/* CV Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-cyan-500/20 gap-4">
              <div>
                <span className="text-xs font-bold text-[#00e5ff] tracking-widest uppercase block mb-1">
                  Curriculum Vitae
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  MD KAWSER AHMED
                </h1>
                <p className="text-sm font-semibold text-cyan-300 mt-0.5">
                  Video Editor • Graphic Designer • Meta Marketer
                </p>

                {/* Career Objective */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#020e1c] border border-cyan-500/15 max-w-xl">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    Career Objective
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A creative and dedicated professional with a strong academic foundation, seeking an entry-level position in video editing, graphic design, and Meta marketing. Eager to leverage technical skills in visual content creation, digital branding, and social media campaigns to help organizations grow, while continuously learning and delivering impactful results in a dynamic work environment.
                  </p>
                </div>
              </div>

              {/* Contact Mini Block */}
              <div className="space-y-2 text-xs text-slate-300 bg-[#020b16]/80 p-4 rounded-xl border border-cyan-500/25 self-start md:self-auto min-w-[260px]">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Contact Information
                </span>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <a
                    href={`mailto:${profile.email || 'mdkawserahmad2006@gmail.com'}`}
                    className="truncate hover:text-cyan-300 hover:underline"
                  >
                    {profile.email || 'mdkawserahmad2006@gmail.com'}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>+8801953941415</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="text-[11px]">House-364, Satarkul Road, Uttar Badda, Dhaka-12</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <a
                    href="https://mdkawserahamad.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline truncate"
                  >
                    https://mdkawserahamad.vercel.app/
                  </a>
                </div>
              </div>
            </div>

            {/* HARD SKILLS (Specific, NO PERCENTAGES) */}
            <div className="py-6 border-b border-cyan-500/20">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#00e5ff] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Hard Skills & Technical Capabilities</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="p-3.5 rounded-xl bg-[#020e1c] border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        {cat.title}
                      </h4>
                      <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {cat.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {cat.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION & PROFESSIONAL TRAINING */}
            <div className="py-6 border-b border-cyan-500/20">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#00e5ff] mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Professional Training</span>
              </h3>

              <div className="space-y-3">
                {educationList.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl bg-[#020e1c] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{edu.title}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-xs text-cyan-400 mt-0.5">{edu.institution}</p>
                      {edu.description && (
                        <p className="text-[11px] text-navy-mist mt-1">{edu.description}</p>
                      )}
                      {edu.learnings && (
                        <div className="mt-2 space-y-1">
                          {edu.learnings.map((lrn, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                              <span>{lrn}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {edu.verified && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 self-start">
                        Verified
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-navy-mist gap-3">
              <div>
                <span>Location: <strong className="text-white">Dhaka, Bangladesh</strong></span>
                <span className="mx-2">•</span>
                <span>Work Availability: <strong className="text-emerald-400">Available for Hire (Full-Time & Contract)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-[#04192f] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Share CV Link'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info & Link Custom CV */}
        <div className="px-6 py-3.5 bg-[#020b16] border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-navy-mist">
            {profile.resumeUrl ? (
              <span>Attached Custom Link: <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">{profile.resumeUrl}</a></span>
            ) : (
              <span>You can attach a direct Google Drive PDF download link via the customize button.</span>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCustomizer}
              className="px-3 py-1.5 rounded-lg bg-[#051c33] border border-cyan-500/30 text-cyan-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Attach / Edit CV Link</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg btn-cyan-gradient text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
