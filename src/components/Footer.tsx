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
    <footer className="bg-transparent border-t border-cyan-500/15 py-12 text-navy-mist text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-sky-400 to-blue-600 flex-shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.35)]">
              <img
                src={profile.avatarUrl || '/profile.png'}
                alt={profile.name}
                className="w-full h-full object-cover object-top rounded-[9px]"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/profile.png') {
                    target.src = '/profile.png';
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm tracking-wider">KAWSER THEORY</span>
              <span className="text-[10px] text-sky-400 font-medium">(কাওসার থিওরি)</span>
            </div>
          </div>
          <span className="hidden sm:inline text-sky-900">•</span>
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
