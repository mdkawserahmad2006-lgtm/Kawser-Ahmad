import React, { useState } from 'react';
import { FileText, Download, Printer, ExternalLink, X, Check, Award, Briefcase, GraduationCap, Sparkles, Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { ProfileData, EducationItem } from '../types';
import { educationList, skillCategories } from '../data/defaultData';

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
                <span>Curriculum Vitae (CV) & Resume</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  2026 Edition
                </span>
              </h2>
              <p className="text-xs text-navy-mist">Professional credentials, verified education & creative specializations</p>
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
                <span>Link Custom PDF</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cyan-500/20 gap-4">
              <div>
                <span className="text-xs font-bold text-[#00e5ff] tracking-widest uppercase block mb-1">
                  Professional Curriculum Vitae
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.name}
                </h1>
                <p className="text-sm font-semibold text-cyan-300 mt-1">
                  {profile.roleTitle}
                </p>
                <p className="text-xs text-navy-mist mt-2 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Contact Mini Block */}
              <div className="space-y-1.5 text-xs text-navy-mist bg-[#020b16]/70 p-4 rounded-xl border border-cyan-500/20 self-start md:self-auto min-w-[240px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Core Competencies Grid */}
            <div className="py-6 border-b border-cyan-500/20">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#00e5ff] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Core Competencies & Creative Pillars</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#020e1c] border border-cyan-500/20">
                  <h4 className="text-xs font-bold text-white">Video Editing & Motion</h4>
                  <p className="text-[11px] text-navy-mist mt-1">Commercial promos, reels, DaVinci Resolve color grading, sound design.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#020e1c] border border-cyan-500/20">
                  <h4 className="text-xs font-bold text-white">Graphic Design & Branding</h4>
                  <p className="text-[11px] text-navy-mist mt-1">Logos, visual brand identity, social ad creatives, vector layout.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#020e1c] border border-cyan-500/20">
                  <h4 className="text-xs font-bold text-white">Meta Marketing & Ads</h4>
                  <p className="text-[11px] text-navy-mist mt-1">High-ROAS campaigns, CAPI loss-less tracking, audience segmentation.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#020e1c] border border-cyan-500/20">
                  <h4 className="text-xs font-bold text-white">Public Speaking & Stage</h4>
                  <p className="text-[11px] text-navy-mist mt-1">Oratory presentation, persuasive storytelling, vocal moderation.</p>
                </div>
              </div>
            </div>

            {/* Academic & Specialized Education */}
            <div className="py-6 border-b border-cyan-500/20">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#00e5ff] mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education, Training & Certifications (2026)</span>
              </h3>

              <div className="space-y-3">
                {educationList.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl bg-[#020e1c] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{edu.title}</h4>
                      <p className="text-xs text-cyan-400">{edu.institution}</p>
                      <p className="text-[11px] text-navy-mist mt-0.5">{edu.description}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {edu.year}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Summary Footnote */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-navy-mist gap-3">
              <div>
                <span>Experience: <strong className="text-white">{profile.experienceYears}</strong></span>
                <span className="mx-2">•</span>
                <span>Projects Completed: <strong className="text-white">{profile.completedProjects}</strong></span>
                <span className="mx-2">•</span>
                <span>Average ROAS: <strong className="text-cyan-400">{profile.avgRoas}</strong></span>
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
              <span>Need to attach your official PDF? You can paste your Google Drive or Dropbox link anytime.</span>
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
