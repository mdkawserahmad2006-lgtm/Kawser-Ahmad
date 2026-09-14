import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Settings2, Send, Palette, Film, TrendingUp } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
  onSelectCategory?: (category: 'all' | 'graphics' | 'video' | 'meta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenCustomizer,
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
          ? 'bg-[#030d17]/90 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo in the corner as requested */}
        <a
          id="brand-logo"
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none"
        >
          {/* Logo Box exactly as in Screenshot 1 */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-[#062038] to-[#020e1c] border-2 border-cyan-400/90 shadow-[0_0_20px_rgba(0,229,255,0.45)] flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] group-hover:border-cyan-300 transition-all duration-300">
            <span className="font-['Syne',sans-serif] font-black text-2xl tracking-tighter flex items-center select-none">
              <span className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">K</span>
              <span className="bg-gradient-to-r from-cyan-300 to-teal-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,229,255,0.6)]">A</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Syne',sans-serif] text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              {profile.logoText || 'KAWSER'}
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#00e5ff] uppercase -mt-0.5">
              {profile.logoSubtext || 'CREATIVE LAB'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-navy-mist hover:text-navy-ice hover:bg-[#061e30] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick link & customizer button */}
          <button
            id="btn-open-customizer"
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-navy-mist hover:text-navy-ice bg-[#041727]/90 hover:bg-[#08243c] border border-cyan-500/25 hover:border-cyan-400/50 rounded-xl transition-all shadow-sm group"
            title="Edit Profile, Photo & Portfolio Links"
          >
            <Settings2 className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
            <span>Edit Profile</span>
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
          <button
            id="btn-mobile-customizer"
            onClick={onOpenCustomizer}
            className="p-2 text-cyan-300 bg-[#041727] border border-cyan-500/30 rounded-xl text-xs"
            aria-label="Customize"
          >
            <Settings2 className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white bg-[#041727] border border-cyan-500/30 rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="sm:hidden px-4 pt-3 pb-6 bg-[#020b16]/98 border-b border-cyan-500/30 backdrop-blur-xl mt-2 space-y-2 animate-in fade-in duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-[#062038] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-[#061c2e] border border-cyan-500/30 rounded-xl"
            >
              <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
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
