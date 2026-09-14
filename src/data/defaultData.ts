import { ProfileData, ProjectItem, SkillCategoryGroup, EducationItem } from '../types';

export const initialProfileData: ProfileData = {
  name: 'Md Kawser Ahmad',
  nameBn: 'মোঃ কাউসার আহমেদ',
  roleTitle: 'Graphic Designer • Video Editor • Meta Marketing Specialist',
  roleTitleBn: 'Graphic Designer • Video Editor • Meta Marketing Specialist',
  bio: 'Helping modern brands scale with high-converting visual designs, cinematic retention-based video edits, and data-driven Meta ad campaigns that maximize ROAS.',
  bioBn: 'Helping modern brands scale with high-converting visual designs, cinematic retention-based video edits, and data-driven Meta ad campaigns that maximize ROAS.',
  // Real photo stored locally in public folder + fallback
  avatarUrl: '/profile.png',
  watermarkUrl: 'https://i.postimg.cc/wMj3ZDyt/Chat-GPT-Image-Aug-3-2026-11-21-40-AM-removebg-preview.png',
  logoText: 'KAWSER',
  logoSubtext: 'THEORY',
  resumeUrl: '',
  whatsappNumber: '+8801953941415',
  email: 'mdkawserahmad2006@gmail.com',
  phone: '+880 1953-941415',
  location: 'Dhaka, Bangladesh (Available Worldwide)',
  availableForHire: true,
  experienceYears: '4+',
  completedProjects: '180+',
  avgRoas: '4.6X',
  clientSatisfaction: '99%',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    behance: 'https://behance.net',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/8801953941415'
  }
};

export const defaultProjects: ProjectItem[] = [
  // Video Editing Projects - Slot 1 (Official Vimeo Promo featured at position #1)
  {
    id: 'vid-promo',
    title: 'Md Kawser Ahmad — Official Showroom & Intro Promo Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Official showroom & creative intro promo reel featuring high-retention motion design, commercial video editing, and dynamic sound design.',
    details: 'Crafted as an official intro and showroom reel with kinetic typography, sound mastering, seamless transitions, and high-energy pacing designed to capture instant client attention.',
    coverImage: '/profile.png',
    videoUrl: 'https://player.vimeo.com/video/1226511604?badge=0&autopause=0&player_id=0&app_id=58479',
    embedType: 'vimeo',
    client: 'Kawser Theory (Official Promo)',
    tags: ['Vimeo Showreel', 'Official Promo', 'Motion Design', 'Premiere Pro'],
    featured: true,
    isVertical: true,
    aspectRatio: '9:16',
    date: '2026',
    metrics: {
      results: 'Showroom Reel',
      impressions: '1080p Full HD'
    }
  },
  {
    id: 'vid-1',
    title: 'Cinematic Commercial Reel & Motion Promo',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Dynamic brand commercial featuring rhythmic sound design, kinetic typography, and seamless match-cut transitions.',
    details: 'Crafted using Adobe Premiere Pro and After Effects with custom sound design, cinematic color grading in DaVinci Resolve, and engaging pacing that increased viewer watch time by 45%.',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    embedType: 'direct',
    client: 'Apex Lifestyle & Apparel',
    tags: ['Premiere Pro', 'After Effects', 'Sound Design', 'Color Grading'],
    featured: true,
    date: '2026',
    metrics: {
      results: '92% Retention Rate',
      impressions: '1.2M+ Views'
    }
  },
  {
    id: 'vid-2',
    title: 'Viral Social Media Reels & Shorts Package',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'High-energy 9:16 short-form video package with bold animated subtitles, b-roll overlays, and hooks designed for viral reach.',
    details: 'Designed specifically for TikTok, Instagram Reels, and YouTube Shorts. Optimized audio mastering, zoom punch-ins, and animated motion graphics for maximum viewer hook retention.',
    coverImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    embedType: 'direct',
    client: 'FinTech Growth Agency',
    tags: ['Shorts / Reels', 'Viral Hooks', 'Motion Graphics', 'CapCut Pro'],
    featured: true,
    date: '2026',
    metrics: {
      results: '3.4M Organic Views',
      ctr: '14.8% Engagement'
    }
  },
  {
    id: 'vid-3',
    title: 'Tech Product Launch & 3D Feature Showcase',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Sleek product reveal trailer focusing on hardware precision, clean lighting highlights, and UI screen simulations.',
    details: 'Combined 3D element compositing in After Effects with bass-boosted sound design and 4K ultra-sharp renders.',
    coverImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    embedType: 'direct',
    client: 'Nova Audio Labs',
    tags: ['3D Compositing', 'After Effects', 'Product Trailer', 'Sound FX'],
    featured: false,
    date: '2025',
    metrics: {
      results: 'Product Sold Out in 48h'
    }
  },

  // Graphic Design Projects
  {
    id: 'gfx-1',
    title: 'Aura Luxury Brand Identity & Packaging Suite',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Complete visual identity system, minimalist logo guidelines, typography scale, and premium bottle packaging graphics.',
    details: 'Created full vector identity in Adobe Illustrator, photorealistic mockups in Photoshop, and printed foil stamping prepress assets.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    client: 'Aura Skincare Paris',
    tags: ['Photoshop', 'Illustrator', 'Packaging', 'Brand Identity'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Global Brand Launch',
      impressions: 'Featured on Behance'
    }
  },
  {
    id: 'gfx-2',
    title: 'High-Converting E-commerce Ad Creatives Set',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Psychology-backed social media ad creatives and promotional banners engineered for high click-through rates (CTR).',
    details: 'Constructed with visual hierarchy, urgency triggers, clear price anchoring, and mobile-first thumb-stopping contrast.',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
    client: 'UrbanStride Footwear',
    tags: ['Ad Creatives', 'CTR Design', 'E-commerce Banners', 'Photoshop'],
    featured: true,
    date: '2026',
    metrics: {
      ctr: '4.85% CTR Average',
      results: '25+ Variations Tested'
    }
  },
  {
    id: 'gfx-3',
    title: 'YouTube Thumbnails & Channel Branding Architecture',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Click-generating 4K thumbnails designed with face cutout illumination, high-contrast typography, and color grading.',
    details: 'Boosted average channel click-through rate from 3.8% to 9.2% across 40+ published video thumbnails.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    client: 'TechPulse Media (450K Subs)',
    tags: ['Thumbnails', 'Key Visuals', 'Graphic Arts', 'Figma'],
    featured: false,
    date: '2025',
    metrics: {
      ctr: '+142% Click Rate',
      results: '5M+ Impressions'
    }
  },

  // Meta Marketing Projects
  {
    id: 'meta-1',
    title: 'E-commerce Scaling: 4.85X ROAS Meta Ads Campaign',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'Full-funnel Meta Ads strategy utilizing Advantage+ Shopping, Lookalike audiences, and high-retention video creatives.',
    details: 'Configured Meta Conversions API (CAPI) for lossless iOS 14+ tracking, established an aggressive retargeting architecture, and tested 18 creative angles.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    client: 'Luxe Wardrobe Co.',
    tags: ['Meta Ads Manager', 'Advantage+', 'CAPI Tracking', 'ROAS Scaling'],
    featured: true,
    date: '2026',
    metrics: {
      roas: '4.85X ROAS',
      spend: '$18,500 Budget',
      impressions: '2.4M Reach',
      results: '$89,725 Revenue'
    }
  },
  {
    id: 'meta-2',
    title: 'B2B SaaS Lead Generation & Pixel CAPI Funnel',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'High-intent lead generation campaign on Facebook & Instagram targeting founders, agency heads, and enterprise buyers.',
    details: 'Implemented custom instantaneous Meta lead forms synchronized via webhooks directly to CRM, paired with instant SMS follow-up triggers.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    client: 'CloudScale ERP',
    tags: ['Lead Generation', 'Custom Audiences', 'Funnel Optimization'],
    featured: true,
    date: '2025',
    metrics: {
      roas: '3.2X Pipeline Value',
      results: '840 Qualified Leads',
      ctr: '$14.20 Cost Per Lead'
    }
  },
  {
    id: 'meta-3',
    title: 'Local Retail & Franchise Footfall Growth Campaign',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'Geo-targeted localized awareness and store visit promotions with radius exclusions and weekend promotional offers.',
    details: 'Generated continuous localized customer traffic for 6 franchise branches utilizing WhatsApp Click-to-Message and Messenger direct booking bots.',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
    client: 'Bella Cucina Dining',
    tags: ['Local Ads', 'Click-to-WhatsApp', 'Store Visits'],
    featured: false,
    date: '2025',
    metrics: {
      results: '+64% Dine-in Traffic',
      spend: '$3,200 Spent'
    }
  }
];

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: 'video',
    title: 'Video Editing',
    titleBn: 'ভিডিও এডিটিং',
    icon: 'Film',
    badge: 'Cinematic & Retention',
    description: 'Transforming raw footage into high-retention stories, viral social clips, and commercial masterpieces with precision sound design.',
    skills: [
      { name: 'Adobe Premiere Pro (Cuts & Narrative Flow)', level: 96, experience: '4+ Years', tag: 'Industry Standard' },
      { name: 'After Effects (Motion Graphics & VFX)', level: 90, experience: '3+ Years', tag: 'Visual Magic' },
      { name: 'DaVinci Resolve (Color Grading & Balancing)', level: 88, experience: '2+ Years', tag: 'Cinematic' },
      { name: 'High-Retention Shorts / Reels / TikTok Edits', level: 98, experience: '3+ Years', tag: 'Viral Pacing' },
      { name: 'Sound Design, Mixing & Foley Audio', level: 92, experience: '4 Years', tag: 'Atmospheric' },
      { name: 'Kinetic Subtitles & Animated Typography', level: 95, experience: '3 Years', tag: 'Eye-Catching' }
    ],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition', 'CapCut Pro']
  },
  {
    id: 'graphics',
    title: 'Graphic Design',
    titleBn: 'গ্রাফিক্স ডিজাইন',
    icon: 'Palette',
    badge: 'Creative & Visual Art',
    description: 'Crafting brand identities, sales-optimized social creatives, and packaging that establish immediate credibility and drive action.',
    skills: [
      { name: 'Adobe Photoshop (Manipulation & Retouching)', level: 95, experience: '4+ Years', tag: 'Expert' },
      { name: 'Adobe Illustrator (Vector Branding & Logos)', level: 92, experience: '4+ Years', tag: 'Master' },
      { name: 'High-CTR Ad Creatives & Social Banners', level: 96, experience: '3+ Years', tag: 'High-Converting' },
      { name: 'Packaging & Print Pre-press Design', level: 88, experience: '3 Years', tag: 'Print Ready' },
      { name: 'Figma UI/UX & Web Banners', level: 85, experience: '2+ Years', tag: 'Modern' },
      { name: 'Typography & Color Theory Hierarchy', level: 94, experience: '4 Years', tag: 'Fundamental' }
    ],
    tools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Lightroom']
  },
  {
    id: 'meta',
    title: 'Meta Marketing',
    titleBn: 'মেটা মার্কেটিং',
    icon: 'TrendingUp',
    badge: 'Data & High ROAS',
    description: 'Designing, launching, and scaling profitable Facebook & Instagram ad campaigns with advanced pixel tracking and creative testing.',
    skills: [
      { name: 'Meta Ads Manager (Campaign Architecture)', level: 95, experience: '3+ Years', tag: 'Profit Driven' },
      { name: 'Meta Pixel & Conversions API (CAPI Tracking)', level: 92, experience: '3 Years', tag: 'iOS 14+ Ready' },
      { name: 'Audience Research & Lookalike Retargeting', level: 94, experience: '3+ Years', tag: 'High-Intent' },
      { name: 'Creative Testing & A/B Split Optimization', level: 96, experience: '3 Years', tag: 'Scientific' },
      { name: 'Budget Scaling & ROAS Maximization', level: 93, experience: '3+ Years', tag: 'Scalable' },
      { name: 'Click-to-WhatsApp & Messenger Funnels', level: 90, experience: '2+ Years', tag: 'Direct Sales' }
    ],
    tools: ['Ads Manager', 'Events Manager', 'Meta Pixel', 'CAPI', 'Google Analytics 4', 'Canva Pro']
  },
  {
    id: 'speaking',
    title: 'Public Speaking & Presentation',
    titleBn: 'পাবলিক স্পিকিং ও উপস্থাপনা',
    icon: 'Mic',
    badge: 'Oratory & Communication',
    description: 'Confident stage delivery, persuasive communication, on-camera presentation, vocal modulation, and audience connection.',
    skills: [
      { name: 'Public Speaking & Stage Delivery', level: 95, experience: 'Proficient', tag: 'Confidence' },
      { name: 'On-Camera Presentation & Video Hosting', level: 92, experience: 'Proficient', tag: 'Engaging' },
      { name: 'Scriptwriting & Narrative Storytelling', level: 90, experience: 'Skilled', tag: 'Impactful' },
      { name: 'Audience Engagement & Vocal Modulation', level: 94, experience: 'Mastery', tag: 'Clear & Articulate' }
    ],
    tools: ['Stage Mic', 'Keynote Presentation', 'Studio Podcast', 'Vocal Articulation', 'Live Streaming']
  }
];

export const educationList: EducationItem[] = [
  {
    id: 'edu-1',
    title: 'Masters in Arabic (এম.এ - এরাবিক)',
    titleBn: 'মাস্টার্স ইন এরাবিক (দাওরায়ে হাদিস)',
    institution: 'Jamia Babus Salam, Dhaka Airport (জামিয়া বাবুস সালাম, ঢাকা এয়ারপোর্ট)',
    year: '2026',
    type: 'degree',
    description: 'Higher academic mastery in Arabic literature, classical linguistics, textual hermeneutics, and contextual communication.',
    badge: 'Masters Degree',
    verified: true
  },
  {
    id: 'edu-2',
    title: 'Meta Marketing & ROAS Scaling Specialization (মেটা মার্কেটিং)',
    titleBn: 'মেটা মার্কেটিং ও অ্যাডভার্টাইজিং স্পেশালাইজেশন',
    institution: 'As-Sunnah Skill Development Institute (আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট)',
    year: '2026',
    type: 'certification',
    description: 'Data-driven Meta ad campaign architectures, Conversions API (CAPI), audience targeting, media buying, and profitable budget scaling.',
    badge: 'Certified Professional',
    verified: true
  },
  {
    id: 'edu-3',
    title: 'Professional Graphic Design & Brand Identity (গ্রাফিক্স ডিজাইন)',
    titleBn: 'প্রফেশনাল গ্রাফিক্স ডিজাইন ও ব্র্যান্ড আইডেন্টিটি',
    institution: 'As-Sunnah Skill Development Institute (আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট)',
    year: '2026',
    type: 'course',
    description: 'Commercial branding, vector illustration, high-converting social media creatives, visual composition, and Adobe Suite workflows.',
    badge: 'Professional Training',
    verified: true
  },
  {
    id: 'edu-4',
    title: 'Cinematic Video Editing & Motion Production (ভিডিও এডিটিং)',
    titleBn: 'সিনেমাটিক ভিডিও এডিটিং ও মোশন প্রোডাকশন',
    institution: 'As-Sunnah Skill Development Institute (আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট)',
    year: '2026',
    type: 'course',
    description: 'Commercial promo editing, viral short-form retention pacing, kinetic subtitles, color grading in DaVinci Resolve, and sound design in Premiere Pro.',
    badge: 'Professional Training',
    verified: true
  }
];
