import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { ImageModal } from './components/ImageModal';
import { MetaCaseStudyModal } from './components/MetaCaseStudyModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ResumeModal } from './components/ResumeModal';
import { WatermarkBackdrop } from './components/WatermarkBackdrop';
import { initialProfileData, defaultProjects } from './data/defaultData';
import { ProfileData, ProjectItem, ProjectCategory } from './types';

export default function App() {
  // Local persistence for profile & projects
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('creative_portfolio_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        let updated = false;

        // Ensure avatar points to permanent local /profile.png
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('unsplash') || parsed.avatarUrl.includes('postimg.cc')) {
          parsed.avatarUrl = '/profile.png';
          updated = true;
        }

        // Always restore the exact transparent background-removed watermark silhouette image
        const targetWatermark = 'https://i.postimg.cc/wMj3ZDyt/Chat-GPT-Image-Aug-3-2026-11-21-40-AM-removebg-preview.png';
        if (parsed.watermarkUrl !== targetWatermark) {
          parsed.watermarkUrl = targetWatermark;
          updated = true;
        }

        // Brand logo text KAWSER THEORY
        if (!parsed.logoText || parsed.logoText.includes('CREATIVE LAB') || parsed.logoSubtext?.includes('LAB')) {
          parsed.logoText = 'KAWSER';
          parsed.logoSubtext = 'THEORY';
          updated = true;
        }

        // Automatically upgrade if placeholder phone number
        if (!parsed.whatsappNumber || parsed.whatsappNumber.includes('1700000000')) {
          parsed.whatsappNumber = '+8801953941415';
          parsed.phone = '+880 1953-941415';
          if (parsed.socials) {
            parsed.socials.whatsapp = 'https://wa.me/8801953941415';
          }
          updated = true;
        }

        // Upgrade to Md Kawser Ahmad and English introductory text as requested
        if (parsed.name && (parsed.name.includes('কাওসার') || parsed.name === 'Kawser Ahmad')) {
          parsed.name = 'Md Kawser Ahmad';
          parsed.nameBn = 'Md Kawser Ahmad';
          parsed.roleTitle = 'Graphic Designer • Video Editor • Meta Marketing Specialist';
          parsed.roleTitleBn = 'Graphic Designer • Video Editor • Meta Marketing Specialist';
          parsed.bio = 'Helping modern brands scale with high-converting visual designs, cinematic retention-based video edits, and data-driven Meta ad campaigns that maximize ROAS.';
          parsed.bioBn = 'Helping modern brands scale with high-converting visual designs, cinematic retention-based video edits, and data-driven Meta ad campaigns that maximize ROAS.';
          updated = true;
        }

        if (updated) {
          localStorage.setItem('creative_portfolio_profile', JSON.stringify(parsed));
        }
        return parsed;
      }
      return initialProfileData;
    } catch {
      return initialProfileData;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('creative_portfolio_projects');
      if (saved) {
        const parsed: ProjectItem[] = JSON.parse(saved);
        // Ensure official Vimeo intro promo is present at position #1
        const hasPromo = parsed.some(p => p.id === 'vid-promo' || p.videoUrl?.includes('1226511604'));
        if (!hasPromo) {
          const promoItem = defaultProjects.find(p => p.id === 'vid-promo');
          if (promoItem) {
            const merged = [promoItem, ...parsed];
            localStorage.setItem('creative_portfolio_projects', JSON.stringify(merged));
            return merged;
          }
        }
        return parsed;
      }
      return defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  // Modal states
  const [activeVideoProject, setActiveVideoProject] = useState<ProjectItem | null>(null);
  const [activeImageProject, setActiveImageProject] = useState<ProjectItem | null>(null);
  const [activeMetaProject, setActiveMetaProject] = useState<ProjectItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const handleSaveProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('creative_portfolio_profile', JSON.stringify(newProfile));
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  };

  const handleSaveProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('creative_portfolio_projects', JSON.stringify(newProjects));
    } catch (err) {
      console.error('Failed to save projects', err);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all profile data and projects to defaults?')) {
      setProfile(initialProfileData);
      setProjects(defaultProjects);
      try {
        localStorage.removeItem('creative_portfolio_profile');
        localStorage.removeItem('creative_portfolio_projects');
      } catch (err) {
        console.error('Failed to reset', err);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020912] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 
        Scroll-Reactive Watermark Silhouette with Neon Glow Aura
        Expands smoothly as visitor scrolls down from top to bottom
      */}
      <WatermarkBackdrop watermarkUrl={profile.watermarkUrl} />

      {/* Fixed Navigation with Corner Logo */}
      <Navbar
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onPlayPromo={() => {
            const promoProject = projects.find(p => p.id === 'vid-promo' || p.videoUrl?.includes('1226511604')) || projects[0];
            setActiveVideoProject(promoProject);
          }}
        />

        {/* Portfolio Showcase Section: Carousel with playable videos, graphic lightbox, meta case studies */}
        <PortfolioShowcase
          projects={projects}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onPlayVideo={(p) => setActiveVideoProject(p)}
          onViewImage={(p) => setActiveImageProject(p)}
          onViewMetaCase={(p) => setActiveMetaProject(p)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Skills Section: Graphic Design, Video Editing, Meta Marketing */}
        <SkillsSection />

        {/* Education & Certifications Section */}
        <EducationSection />

        {/* Contact Section: WhatsApp chat, email, project inquiry form */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Mobile Floating Quick Action Pill */}
      <aside
        id="mobile-quick-actions"
        aria-label="Quick contact"
        className="fixed bottom-4 right-4 z-30 sm:hidden flex items-center gap-2 select-none"
      >
        <a
          id="btn-mobile-quick-whatsapp"
          href={`https://wa.me/${(profile.whatsappNumber || '8801953941415').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Md Kawser Ahmad, I visited your portfolio and would like to discuss a project with you.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-[0_4px_20px_rgba(16,185,129,0.55)] border border-emerald-300/40 active:scale-95 transition-transform"
          aria-label="Direct WhatsApp Chat"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>WhatsApp Chat</span>
        </a>
      </aside>

      {/* Interactive Modals */}
      <VideoModal
        project={activeVideoProject}
        onClose={() => setActiveVideoProject(null)}
      />

      <ImageModal
        project={activeImageProject}
        onClose={() => setActiveImageProject(null)}
      />

      <MetaCaseStudyModal
        project={activeMetaProject}
        onClose={() => setActiveMetaProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        onOpenCustomizer={() => {
          setIsResumeOpen(false);
          setIsCustomizerOpen(true);
        }}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
