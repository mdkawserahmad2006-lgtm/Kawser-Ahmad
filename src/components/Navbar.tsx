import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Settings2, Send, FileText } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
  onOpenResume?: () => void;
  onSelectCategory?: (category: 'all' | 'graphics' | 'video' | 'meta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenCustomizer,
  onOpenResume,
  onSelectCategory
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030f22]/95 backdrop-blur-md border-b border-sky-500/20 py-3 shadow-lg shadow-[#020814]/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo in the corner: KAWSER THEORY */}
        <a
          id="brand-logo"
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none"
        >
          {/* Brand Profile Picture (Replacing KT monogram with user's official photo) */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-600 shadow-[0_0_18px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_26px_rgba(56,189,248,0.75)] group-hover:scale-105 transition-all duration-300 flex-shrink-0">
            <img
              src={profile.avatarUrl || '/profile.png'}
              alt={profile.name || 'Md Kawser Ahmad'}
              className="w-full h-full object-cover object-top rounded-[14px] bg-[#020b18]"
              loading="eager"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== window.location.origin + '/profile.png') {
                  target.src = '/profile.png';
                }
              }}
            />
            {/* Online Status Dot */}
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#031124]" title="Available for work" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Syne',sans-serif] text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-sky-300 transition-colors">
              {profile.logoText || 'KAWSER'}
            </span>
            <span className="text-[11px] font-bold tracking-[0.22em] text-sky-400 uppercase -mt-0.5">
              {profile.logoSubtext || 'THEORY'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-navy-mist hover:text-white hover:bg-[#072545] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 text-sm font-semibold text-sky-300 hover:text-white hover:bg-[#072545] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Resume / CV</span>
            </button>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Resume/CV Button */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-200 hover:text-white bg-[#06203d]/80 hover:bg-[#0a2e58] border border-sky-500/30 hover:border-sky-400 rounded-xl transition-all shadow-sm"
              title="View & Download Curriculum Vitae"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>View CV</span>
            </button>
          )}

          {/* Quick customizer button */}
          <button
            id="btn-open-customizer"
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-navy-mist hover:text-white bg-[#041930]/80 hover:bg-[#072648] border border-sky-500/20 hover:border-sky-400/40 rounded-xl transition-all shadow-sm group"
            title="Edit Profile, Photo & Portfolio Links"
          >
            <Settings2 className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
            <span>Settings</span>
          </button>

          {/* Hire Me / Contact Button */}
          <a
            id="btn-nav-contact"
            href="#contact"
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl btn-cyan-gradient transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="p-2 text-sky-300 bg-[#051c35] border border-sky-500/30 rounded-xl text-xs flex items-center gap-1"
              aria-label="View CV"
              title="View CV"
            >
              <FileText className="w-4 h-4" />
              <span className="text-[11px] font-bold">CV</span>
            </button>
          )}
          <button
            id="btn-mobile-customizer"
            onClick={onOpenCustomizer}
            className="p-2 text-sky-300 bg-[#051c35] border border-sky-500/30 rounded-xl text-xs"
            aria-label="Customize"
          >
            <Settings2 className="w-4 h-4 text-sky-400" />
          </button>
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white bg-[#051c35] border border-sky-500/30 rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="sm:hidden px-4 pt-3 pb-6 bg-[#031024]/98 border-b border-sky-500/30 backdrop-blur-xl mt-2 space-y-2 animate-in fade-in duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-sky-300 hover:bg-[#072545] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          {onOpenResume && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-sky-300 hover:text-white hover:bg-[#072545] rounded-lg transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Curriculum Vitae (CV)</span>
            </button>
          )}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-[#061e38] border border-sky-500/30 rounded-xl"
            >
              <Settings2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Edit Profile & Links</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-xl btn-cyan-gradient"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
