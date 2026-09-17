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
  experienceYears: '3 Months',
  completedProjects: '100+',
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
    id: 'vid-yt-1',
    title: 'Commercial Brand Reel & Dynamic Motion Edit',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Dynamic commercial promo featuring rhythmic motion design, precision sound sync, and seamless cinematic transitions.',
    details: 'Crafted using Adobe Premiere Pro and After Effects with custom sound design, cinematic color grading, and engaging pacing that maximizes viewer watch time.',
    coverImage: 'https://img.youtube.com/vi/6ynNCYfss0U/hqdefault.jpg',
    videoUrl: 'https://youtu.be/6ynNCYfss0U?si=sCjv5Nke-KMjwMzG',
    embedType: 'youtube',
    client: 'Commercial Brand Promo',
    tags: ['Premiere Pro', 'Commercial Edit', 'Motion Graphics', 'Sound Design'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Commercial Edit',
      impressions: '4K Ultra HD'
    }
  },
  {
    id: 'vid-yt-2',
    title: 'High-Retention Short Form Reel & Viral Cut',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Fast-paced vertical reel engineered with kinetic typography, punchy zooms, and high viewer retention algorithms.',
    details: 'Designed specifically for TikTok, Instagram Reels, and YouTube Shorts. Optimized audio mastering, zoom punch-ins, and animated motion graphics for maximum hook retention.',
    coverImage: 'https://img.youtube.com/vi/vR-9a3RC2JY/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/vR-9a3RC2JY?si=QUGRB3f6Q_1dc9_P',
    embedType: 'youtube',
    client: 'Viral Short Form Reel',
    tags: ['YouTube Shorts', 'Kinetic Captions', 'Viral Hooks', 'Reels Edit'],
    featured: true,
    isVertical: true,
    aspectRatio: '9:16',
    date: '2026',
    metrics: {
      results: 'Viral Reel',
      impressions: 'High Retention'
    }
  },
  {
    id: 'vid-yt-3',
    title: 'Cinematic Storytelling & Precision Cut Edit',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Engaging narrative video edit featuring atmospheric soundscapes, smooth pacing, and visual storytelling.',
    details: 'Carefully paced narrative edit focusing on emotional arc, seamless scene progression, and polished DaVinci Resolve color balancing.',
    coverImage: 'https://img.youtube.com/vi/Oo_msLAt2AY/hqdefault.jpg',
    videoUrl: 'https://youtu.be/Oo_msLAt2AY?si=6HIjg7YcQwybKd56',
    embedType: 'youtube',
    client: 'Cinematic Visual Story',
    tags: ['Cinematic Edit', 'Narrative', 'Color Grade', 'DaVinci Resolve'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Cinematic Story',
      impressions: '1080p HD'
    }
  },
  {
    id: 'vid-yt-4',
    title: 'Dynamic Audio Sync & Motion Rhythm Edit',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Beat-synced video montage with visual rhythm cuts, bass drops, and clean motion transitions.',
    details: 'Crafted using beat markers and sound layering for a seamless rhythmic viewing experience that keeps viewers engaged throughout.',
    coverImage: 'https://img.youtube.com/vi/As4tGPuyDrg/hqdefault.jpg',
    videoUrl: 'https://youtu.be/As4tGPuyDrg?si=JcEbR9cuyfFVovhP',
    embedType: 'youtube',
    client: 'Motion Audio Sync',
    tags: ['Beat Sync', 'Sound Design', 'After Effects', 'Rhythm Cut'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Beat Synced',
      impressions: 'Engaging Flow'
    }
  },
  {
    id: 'vid-yt-5',
    title: 'Creative Transition Flow & Visual Polish',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Seamless match-cut transitions and visual effects compositing tailored for high-end digital presentation.',
    details: 'Includes custom seamless whip pans, mask transitions, speed ramping, and motion graphics for a modern fluid aesthetic.',
    coverImage: 'https://img.youtube.com/vi/LXRLVec6SCM/hqdefault.jpg',
    videoUrl: 'https://youtu.be/LXRLVec6SCM?si=A20R5AR5wzTjVT0C',
    embedType: 'youtube',
    client: 'Creative Visual Edit',
    tags: ['Transitions', 'Visual Effects', 'Speed Ramping', 'Motion Graphics'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Seamless Flow',
      impressions: 'High Production'
    }
  },
  {
    id: 'vid-yt-6',
    title: 'Professional Promo & Visual Brand Showcase',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Corporate and promotional video production combining talking heads, b-roll overlays, and graphic lower-thirds.',
    details: 'Structured to highlight key product or service values with professional sound mastering and crystal-clear presentation.',
    coverImage: 'https://img.youtube.com/vi/w04gIFO7i-0/hqdefault.jpg',
    videoUrl: 'https://youtu.be/w04gIFO7i-0?si=nwp8Tj6lES7Hf1PX',
    embedType: 'youtube',
    client: 'Corporate & Promo Production',
    tags: ['Brand Promo', 'Lower Thirds', 'Corporate Edit', 'Audio Mastering'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Brand Identity',
      impressions: 'Professional'
    }
  },
  {
    id: 'vid-yt-7',
    title: 'Visual FX & High-Impact Creative Showcase',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Vibrant creative composition featuring custom motion assets, dynamic typography, and visual enhancements.',
    details: 'Created in Adobe Premiere Pro & After Effects with custom glow effects, visual styling, and attention-grabbing aesthetics.',
    coverImage: 'https://img.youtube.com/vi/GEFYBoN5e7s/hqdefault.jpg',
    videoUrl: 'https://youtu.be/GEFYBoN5e7s?si=F6-UeyGA0RKA8K1j',
    embedType: 'youtube',
    client: 'Creative Visual FX',
    tags: ['Visual FX', 'After Effects', 'Creative Edit', 'Premiere Pro'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Visual FX',
      impressions: 'Dynamic Cut'
    }
  },
  {
    id: 'vid-yt-8',
    title: 'Fast-Paced Vertical Hook & Micro-Content Edit',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'High-energy vertical short crafted with snappy jump cuts, animated captions, and micro-content retention formulas.',
    details: 'Engineered for viral discovery across social platforms with sub-second hook delivery and continuous visual movement.',
    coverImage: 'https://img.youtube.com/vi/Zx4j86u2vt8/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/Zx4j86u2vt8?si=D2qFX-Jn3OUIj-fE',
    embedType: 'youtube',
    client: 'Shorts & Reels Production',
    tags: ['Shorts', 'Micro Content', 'Jump Cuts', 'Viral Reach'],
    featured: true,
    isVertical: true,
    aspectRatio: '9:16',
    date: '2026',
    metrics: {
      results: 'Viral Hook',
      impressions: 'Short-Form'
    }
  },
  {
    id: 'vid-yt-9',
    title: 'Thumb-Stopping Social Hook & B-Roll Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Engaging vertical reel highlighting creative b-roll storytelling, vibrant color grading, and modern social format.',
    details: 'Designed for mobile devices with high clarity, quick cuts, and engaging audio track synchronization.',
    coverImage: 'https://img.youtube.com/vi/HZIFbiK7t70/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/HZIFbiK7t70?si=6mnBZyHpmdo3L2Eh',
    embedType: 'youtube',
    client: 'B-Roll & Social Reels',
    tags: ['Reels', 'B-Roll Cut', 'Mobile Format', 'Sound Design'],
    featured: true,
    isVertical: true,
    aspectRatio: '9:16',
    date: '2026',
    metrics: {
      results: 'Thumb-Stopper',
      impressions: 'Mobile First'
    }
  },

  // Graphic Design Projects (Official Behance Portfolio Gallery in Exact Order)
  {
    id: 'gfx-behance-1',
    title: 'Facebook Post Creative Project',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Modern social media promotional post designed with strong typography hierarchy, eye-catching color contrast, and converted branding aesthetics.',
    details: 'Created with Photoshop for high feed-engagement, clear value proposition, and thumb-stopping visual balance.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/39f532255212215.Y3JvcCw4MDAwLDYyNTgsMCwxMDEw.jpg',
    liveUrl: 'https://www.behance.net/gallery/255212215/Facebook-Post-Project',
    client: 'Social Media Campaign',
    tags: ['Behance Portfolio', 'Facebook Post', 'Photoshop', 'Social Ads'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Behance Portfolio',
      impressions: 'Feed Optimized'
    }
  },
  {
    id: 'gfx-behance-2',
    title: 'Dr. Service Medical & Healthcare Media Post',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Professional medical healthcare visual campaign crafted to build trust, highlight key healthcare services, and drive patient consultations.',
    details: 'Designed with clean medical blue tones, friendly doctor iconography, and patient-first contact information hierarchy.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/395a07255236881.Y3JvcCw5MjAwLDcxOTYsMCw0MzI.jpg',
    liveUrl: 'https://www.behance.net/gallery/255236881/Dr-Service-Project-Media-Post',
    client: 'Dr. Service Healthcare',
    tags: ['Behance Portfolio', 'Medical Branding', 'Healthcare Media', 'Illustrator'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Healthcare Trust',
      impressions: 'High Retention'
    }
  },
  {
    id: 'gfx-behance-3',
    title: 'Naturo Organic Media Post Campaign',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Fresh, eco-friendly product advertisement visuals focusing on natural ingredients, organic lifestyle aesthetics, and premium presentation.',
    details: 'Constructed with warm earthy tones, leaf accents, and fresh product packaging highlights.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2b03a6255250677.Y3JvcCw5MjAwLDcxOTYsMCwxMDAx.jpg',
    liveUrl: 'https://www.behance.net/gallery/255250677/Naturo-Media-Post-Project',
    client: 'Naturo Organic Foods',
    tags: ['Behance Portfolio', 'Naturo Foods', 'Organic Design', 'E-Commerce'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Organic Brand',
      impressions: 'Eco Aesthetics'
    }
  },
  {
    id: 'gfx-behance-4',
    title: 'Brochure Post Design & Corporate Editorial',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Multi-fold brochure and editorial promotional layout featuring structured content grids, crisp typography, and print-ready vector artwork.',
    details: 'Full vector print and digital editorial composition built with Adobe Illustrator and InDesign layout best practices.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a62667255644821.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
    liveUrl: 'https://www.behance.net/gallery/255644821/Brochure-post-design',
    client: 'Corporate Editorial Publishing',
    tags: ['Behance Portfolio', 'Brochure Design', 'Print Layout', 'Editorial'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Print Ready',
      impressions: 'Grid Layout'
    }
  },
  {
    id: 'gfx-behance-5',
    title: 'FB High-Engagement Post Project',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'High-converting Facebook feed ad creative engineered to maximize thumb-stopping power, brand recall, and click-through rates.',
    details: 'Focuses on visual hierarchy, bold headings, and clear call-to-action buttons for digital marketing funnels.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2e330e254863705.Y3JvcCwxMDI0LDgwMCwwLDE3.jpg',
    liveUrl: 'https://www.behance.net/gallery/254863705/FB-Post-Project',
    client: 'Digital Commerce Agency',
    tags: ['Behance Portfolio', 'FB Creative', 'High CTR', 'Photoshop'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'High Engagement',
      impressions: 'Feed Optimized'
    }
  },
  {
    id: 'gfx-behance-6',
    title: 'Ghorer Bazar Social Media Post Project',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Authentic consumer grocery promotional designs with culturally resonant visuals, appetizing product imagery, and sales discount callouts.',
    details: 'Engineered for consumer e-commerce sales, highlighting discounts, local delivery badges, and trusted quality guarantees.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/28e94d254863423.Y3JvcCw5MjIsNzIxLDAsODQ.jpg',
    liveUrl: 'https://www.behance.net/gallery/254863423/ghorer-bazar-FB-Post-Project',
    client: 'Ghorer Bazar E-Commerce',
    tags: ['Behance Portfolio', 'Ghorer Bazar', 'Grocery Ads', 'Banner Art'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Local E-Commerce',
      impressions: 'Sales Driven'
    }
  },
  {
    id: 'gfx-behance-7',
    title: 'Creative Typography & Lettering Art',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Bespoke custom typography compositions exploring dynamic weight balance, aesthetic ligature curves, and modern expressive letterforms.',
    details: 'Handcrafted type styling refined into clean vector paths for merchandise, posters, and distinctive brand identities.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6c7459254818611.Y3JvcCwxMTIyLDg3NywwLDI2MQ.png',
    liveUrl: 'https://www.behance.net/gallery/254818611/Typography-Design',
    client: 'Typography & Visual Identity',
    tags: ['Behance Portfolio', 'Typography', 'Custom Lettering', 'Vector Art'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Custom Type',
      impressions: 'Art Direction'
    }
  },
  {
    id: 'gfx-behance-8',
    title: 'FB Brand Promotional Creative Project',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Engaging branded social asset created for targeted digital campaigns, seasonal discounts, and brand awareness across platforms.',
    details: 'Combines product mockups, vibrant gradients, and compelling discount badges to drive online purchases.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/be325a254884983.Y3JvcCwxMjU0LDk4MCwwLDEzNg.jpg',
    liveUrl: 'https://www.behance.net/gallery/254884983/FB-Post-Project',
    client: 'Retail & Consumer Brands',
    tags: ['Behance Portfolio', 'Brand Promo', 'Visual Identity', 'Social Ads'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Brand Recall',
      impressions: 'Visual Polish'
    }
  },
  {
    id: 'gfx-behance-9',
    title: 'E-commerce Social Media Visual Design',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Full-funnel commercial visual design package for digital stores, product launches, flash sales, and story ads.',
    details: 'Constructed with mobile-first dimensions, product cutout drop shadows, and high-visibility price tags.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/00f502254840487.Y3JvcCwxMDI0LDgwMCwwLDExMQ.jpg',
    liveUrl: 'https://www.behance.net/gallery/254840487/E-commerce-Social-Media-Visual-Design',
    client: 'Global E-Commerce Store',
    tags: ['Behance Portfolio', 'E-Commerce Visual', 'Product Banner', 'Catalog Design'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Conversion Visual',
      impressions: 'Multi-Asset'
    }
  },
  {
    id: 'gfx-behance-10',
    title: 'Corporate ID Card Design & Stationery',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Official corporate employee identification badges and lanyard card design with security elements, barcodes, and brand consistency.',
    details: 'Includes clean portrait framing, employee metadata typography, corporate logos, and QR/barcode placement.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a86b83253635481.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
    liveUrl: 'https://www.behance.net/gallery/253635481/ID-Card-Design',
    client: 'Enterprise & Institution',
    tags: ['Behance Portfolio', 'ID Card Design', 'Corporate Stationery', 'Print Ready'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Brand Standards',
      impressions: 'Security Badge'
    }
  },
  {
    id: 'gfx-behance-11',
    title: 'Iftar Mahfil Community Event Poster & Media',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Festive and spiritually evocative event banner and poster artwork celebrating Ramadan and community Iftar gatherings with traditional motifs.',
    details: 'Adorned with Islamic lantern motifs, crescent moon silhouettes, and elegant Arabic-Bengali calligraphy accents.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/81f92e254107271.Y3JvcCwxMDg2LDg0OSwwLDI5OA.png',
    liveUrl: 'https://www.behance.net/gallery/254107271/ifter-mahfil',
    client: 'Community & Event Media',
    tags: ['Behance Portfolio', 'Event Poster', 'Iftar Mahfil', 'Islamic Art'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Event Media',
      impressions: 'Cultural Design'
    }
  },
  {
    id: 'gfx-behance-12',
    title: 'English Lettering & Bespoke Typography',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Stylized handmade and vector-refined English lettering compositions suitable for apparel graphics, album covers, and modern branding.',
    details: 'Showcases organic brush strokes, precision vector bezier curve adjustments, and distinctive aesthetic letterforms.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6195cd254866321.Y3JvcCwxMjU0LDk4MCwwLDEzNg.png',
    liveUrl: 'https://www.behance.net/gallery/254866321/English-lettering',
    client: 'Art Direction & Lettering',
    tags: ['Behance Portfolio', 'English Lettering', 'Calligraphy', 'Type Art'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Art Direction',
      impressions: 'Expressive Type'
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
    coverImage: '',
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
    coverImage: '',
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
    coverImage: '',
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
