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
import { ReelsFeedModal } from './components/ReelsFeedModal';
import { InteractiveAmbientLighting } from './components/InteractiveAmbientLighting';
import { initialProfileData, defaultProjects } from './data/defaultData';
import { ProfileData, ProjectItem, ProjectCategory } from './types';
import { getOptimizedCover } from './utils/behanceCovers';
import { LanguageProvider } from './context/LanguageContext';

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

        // Update experience to 4 Months and projects to 100+
        if (parsed.experienceYears !== '4 Months' && (parsed.experienceYears?.includes('Month') || parsed.experienceYears === '4+' || !parsed.experienceYears || parsed.experienceYears === '2+' || parsed.experienceYears === '3 Months')) {
          parsed.experienceYears = '4 Months';
          updated = true;
        }
        if (parsed.completedProjects === '180+' || !parsed.completedProjects) {
          parsed.completedProjects = '100+';
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
        // Ensure official Vimeo intro promo and newly added YouTube/Behance projects are loaded
        const hasNewYt = parsed.some(p => p.id === 'vid-yt-1' || p.videoUrl?.includes('6ynNCYfss0U'));
        const hasBehance = parsed.some(p => p.id === 'gfx-behance-1' || p.liveUrl?.includes('255212215'));
        const hasUnsplash = parsed.some(p => p.coverImage?.includes('unsplash.com'));
        const hasBehanceInMeta = parsed.some(p => p.category === 'meta' && p.coverImage && p.coverImage.includes('behance.net'));

        if (!hasNewYt || !hasBehance || parsed.length < defaultProjects.length || hasUnsplash || hasBehanceInMeta) {
          localStorage.setItem('creative_portfolio_projects', JSON.stringify(defaultProjects));
          return defaultProjects;
        }

        // Fast optimization check for any lingering placeholder
        const optimized = parsed.map(p => ({
          ...p,
          coverImage: getOptimizedCover(p)
        }));
        return optimized;
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
  const [reelsProject, setReelsProject] = useState<ProjectItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const handleOpenProject = (project: ProjectItem) => {
    setReelsProject(project);
  };

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
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#020912] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* 
          Interactive Ambient Lighting:
          - Cursor spotlight with smooth trailing light ("আলো দৌড়াবে") behind cards
          - Touch ripple and click light bursts on phone & desktop ("সেখানে আলো জ্বলবে")
        */}
        <InteractiveAmbientLighting />

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
              handleOpenProject(promoProject);
            }}
            onPlayVideo={(p) => handleOpenProject(p)}
            projects={projects}
            onViewImage={(p) => handleOpenProject(p)}
          />

          {/* Portfolio Showcase Section: Carousel with playable videos, graphic lightbox, meta case studies */}
          <PortfolioShowcase
            projects={projects}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onPlayVideo={(p) => handleOpenProject(p)}
            onViewImage={(p) => handleOpenProject(p)}
            onViewMetaCase={(p) => handleOpenProject(p)}
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

        {/* Reels-Style Swipe and Scroll Viewer Modal (TikTok / Reels style on Mobile and PC) */}
        <ReelsFeedModal
          isOpen={Boolean(reelsProject)}
          onClose={() => setReelsProject(null)}
          initialProject={reelsProject}
          projects={projects}
          profile={profile}
        />

        {/* Standard Modals Fallback */}
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
    </LanguageProvider>
  );
}
