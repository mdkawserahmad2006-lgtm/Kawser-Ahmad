import React from 'react';
import { ArrowUp, Heart, Sparkles, Send } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#010810] border-t border-cyan-500/15 py-12 text-navy-mist text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs font-['Syne',sans-serif]">
              {profile.logoText.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-bold text-navy-ice text-sm tracking-wider">{profile.logoText}</span>
          </div>
          <span className="hidden sm:inline text-cyan-900">•</span>
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>

        {/* Center Specialties */}
        <div className="flex items-center gap-3 text-[11px] text-cyan-400/90 font-medium">
          <span>Graphic Design</span>
          <span>•</span>
          <span>Video Editing</span>
          <span>•</span>
          <span>Meta Marketing</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-[#031320] hover:bg-[#072136] border border-cyan-500/20 hover:border-cyan-400/50 text-navy-mist hover:text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-[11px] font-medium">Back to top</span>
        </button>

      </div>
    </footer>
  );
};
