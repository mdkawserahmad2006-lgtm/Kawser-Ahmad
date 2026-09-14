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
          parsed.watermarkUrl = '/profile.png';
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
        // Upgrade introductory text to English as requested
        if (parsed.name && parsed.name.includes('কাওসার আহমেদ')) {
          parsed.name = 'Kawser Ahmad';
          parsed.nameBn = 'Kawser Ahmad';
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
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  // Modal states
  const [activeVideoProject, setActiveVideoProject] = useState<ProjectItem | null>(null);
  const [activeImageProject, setActiveImageProject] = useState<ProjectItem | null>(null);
  const [activeMetaProject, setActiveMetaProject] = useState<ProjectItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
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
    <div className="min-h-screen bg-[#020912] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Fixed Navigation with Corner Logo */}
      <Navbar
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section: Watermark backdrop, Left documents/intro, Right profile card */}
        <Hero
          profile={profile}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
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
