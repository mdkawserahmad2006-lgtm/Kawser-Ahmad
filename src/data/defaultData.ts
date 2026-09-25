import { ProfileData, ProjectItem, SkillCategoryGroup, EducationItem } from '../types';

export const initialProfileData: ProfileData = {
  name: 'MD KAWSER AHMED',
  nameBn: 'মোঃ কাউসার আহমেদ',
  roleTitle: 'Video Editor • Graphic Designer • Meta Marketing Specialist',
  roleTitleBn: 'ভিডিও এডিটর • গ্রাফিক্স ডিজাইনার • মেটা মার্কেটিং স্পেশালিস্ট',
  bio: 'A creative and dedicated professional seeking an entry-level position in video editing, graphic design, and Meta marketing. Eager to leverage technical skills in visual content creation, digital branding, and social media campaigns to deliver impactful results.',
  bioBn: 'ভিডিও এডিটিং, গ্রাফিক্স ডিজাইন এবং মেটা মার্কেটিংয়ে দক্ষ ক্রিয়েটিভ প্রফেশনাল। ব্র্যান্ড গ্রোথ ও হাই-কনভার্টিং ভিজ্যুয়াল তৈরিতে পারদর্শী।',
  // Real photo stored locally in public folder + fallback
  avatarUrl: '/profile.png',
  watermarkUrl: 'https://i.postimg.cc/wMj3ZDyt/Chat-GPT-Image-Aug-3-2026-11-21-40-AM-removebg-preview.png',
  logoText: 'KAWSER',
  logoSubtext: 'AHMED',
  resumeUrl: '',
  whatsappNumber: '+8801953941415',
  email: 'mdkawserahmad2006@gmail.com',
  phone: '+8801953941415',
  location: 'House-364, Satarkul Road, Uttar Badda, Dhaka-12',
  availableForHire: true,
  experienceYears: '1 Year',
  completedProjects: '100+',
  avgRoas: '4.6X',
  clientSatisfaction: '100%',
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
  // Video Editing Projects - Slot 1: User's Premier Featured Promo Video (Position #1)
  {
    id: 'vid-yt-lead-short',
    title: 'Featured Promo Video Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Cinematic promotional reel with kinetic typography, high-impact sound design, and dynamic transitions.',
    details: 'Crafted as an official premier promo video featuring kinetic typography, custom sound design, beat synchronization, and commercial-grade visual hooks.',
    coverImage: 'https://img.youtube.com/vi/MZv-zuYyojk/hqdefault.jpg',
    videoUrl: 'https://youtu.be/MZv-zuYyojk',
    embedType: 'youtube',
    client: 'Official Promo Feature',
    tags: ['Promo Video', 'Kinetic Typography', 'Sound Design', 'Premiere Pro'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Official Promo',
      impressions: '1080p Full HD'
    }
  },
  // Official Vimeo Promo (Slot 2)
  {
    id: 'vid-promo',
    title: 'Showroom Intro Promo Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'High-retention showroom promo with kinetic typography and dynamic sound.',
    details: 'Crafted as an official intro reel with kinetic typography, sound mastering, and high-energy pacing.',
    coverImage: '/profile.png',
    videoUrl: 'https://player.vimeo.com/video/1226511604?badge=0&autopause=0&player_id=0&app_id=58479',
    embedType: 'vimeo',
    client: 'Official Promo',
    tags: ['Vimeo Showreel', 'Motion Design', 'Premiere Pro'],
    featured: true,
    isVertical: true,
    aspectRatio: '9:16',
    date: '2026',
    metrics: {
      results: 'Showroom Reel',
      impressions: '1080p HD'
    }
  },
  {
    id: 'vid-yt-1',
    title: 'Commercial Brand Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Dynamic commercial promo with rhythmic motion and cinematic transitions.',
    details: 'Crafted in Premiere Pro and After Effects with custom sound design.',
    coverImage: 'https://img.youtube.com/vi/6ynNCYfss0U/hqdefault.jpg',
    videoUrl: 'https://youtu.be/6ynNCYfss0U?si=sCjv5Nke-KMjwMzG',
    embedType: 'youtube',
    client: 'Commercial Promo',
    tags: ['Premiere Pro', 'Commercial', 'Motion'],
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
    title: 'High-Retention Shorts Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Fast-paced vertical reel with kinetic typography and viral pacing.',
    details: 'Optimized for mobile platforms with fast hook delivery.',
    coverImage: 'https://img.youtube.com/vi/vR-9a3RC2JY/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/vR-9a3RC2JY?si=QUGRB3f6Q_1dc9_P',
    embedType: 'youtube',
    client: 'Viral Short Reel',
    tags: ['Shorts', 'Kinetic Captions', 'Reels'],
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
    title: 'Cinematic Storytelling Cut',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Narrative edit with atmospheric soundscapes and cinematic pacing.',
    details: 'Carefully paced narrative edit with color grading.',
    coverImage: 'https://img.youtube.com/vi/Oo_msLAt2AY/hqdefault.jpg',
    videoUrl: 'https://youtu.be/Oo_msLAt2AY?si=6HIjg7YcQwybKd56',
    embedType: 'youtube',
    client: 'Visual Story',
    tags: ['Cinematic', 'Color Grade', 'Narrative'],
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
    title: 'Audio Sync & Motion Rhythm',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Beat-synced video montage with visual rhythm cuts and bass drops.',
    details: 'Layered sound design synchronized to visual pacing.',
    coverImage: 'https://img.youtube.com/vi/As4tGPuyDrg/hqdefault.jpg',
    videoUrl: 'https://youtu.be/As4tGPuyDrg?si=JcEbR9cuyfFVovhP',
    embedType: 'youtube',
    client: 'Audio Sync',
    tags: ['Beat Sync', 'Sound Design', 'Rhythm'],
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
    title: 'Creative Transition Flow',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Seamless match-cut transitions and visual effects compositing.',
    details: 'Custom speed ramping and motion graphics.',
    coverImage: 'https://img.youtube.com/vi/LXRLVec6SCM/hqdefault.jpg',
    videoUrl: 'https://youtu.be/LXRLVec6SCM?si=A20R5AR5wzTjVT0C',
    embedType: 'youtube',
    client: 'Creative Visual',
    tags: ['Transitions', 'VFX', 'Speed Ramp'],
    featured: true,
    isVertical: false,
    aspectRatio: '16:9',
    date: '2026',
    metrics: {
      results: 'Seamless Flow',
      impressions: 'High Polish'
    }
  },
  {
    id: 'vid-yt-6',
    title: 'Brand Promo Production',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Corporate promo with b-roll overlays and graphic lower-thirds.',
    details: 'Clean corporate presentation with balanced audio mastering.',
    coverImage: 'https://img.youtube.com/vi/w04gIFO7i-0/hqdefault.jpg',
    videoUrl: 'https://youtu.be/w04gIFO7i-0?si=nwp8Tj6lES7Hf1PX',
    embedType: 'youtube',
    client: 'Promo Production',
    tags: ['Brand Promo', 'Lower Thirds', 'Corporate'],
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
    title: 'Visual FX & Motion Art',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Dynamic typography and creative motion graphics composition.',
    details: 'Custom visual styling and motion elements.',
    coverImage: 'https://img.youtube.com/vi/GEFYBoN5e7s/hqdefault.jpg',
    videoUrl: 'https://youtu.be/GEFYBoN5e7s?si=F6-UeyGA0RKA8K1j',
    embedType: 'youtube',
    client: 'Motion Art',
    tags: ['Visual FX', 'After Effects', 'Creative'],
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
    title: 'Vertical Hook Short',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Snappy vertical short with animated text and punchy zooms.',
    details: 'Fast hook delivery for social platforms.',
    coverImage: 'https://img.youtube.com/vi/Zx4j86u2vt8/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/Zx4j86u2vt8?si=D2qFX-Jn3OUIj-fE',
    embedType: 'youtube',
    client: 'Shorts Reel',
    tags: ['Shorts', 'Hooks', 'Jump Cuts'],
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
    title: 'Social B-Roll Reel',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Creative b-roll storytelling with modern mobile color grade.',
    details: 'Crisp visuals and synced audio rhythm.',
    coverImage: 'https://img.youtube.com/vi/HZIFbiK7t70/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/HZIFbiK7t70?si=6mnBZyHpmdo3L2Eh',
    embedType: 'youtube',
    client: 'Social Reels',
    tags: ['Reels', 'B-Roll', 'Mobile'],
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
    title: 'Facebook Post Creative',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'High-CTR social media ad creative with bold typography.',
    details: 'Photoshop ad design for feed engagement.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/39f532255212215.Y3JvcCw4MDAwLDYyNTgsMCwxMDEw.jpg',
    liveUrl: 'https://www.behance.net/gallery/255212215/Facebook-Post-Project',
    client: 'Social Media',
    tags: ['Behance', 'Social Ad', 'Photoshop'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Behance',
      impressions: 'High CTR'
    }
  },
  {
    id: 'gfx-behance-2',
    title: 'Dr. Service Medical Media Post',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Professional healthcare visual post built for client trust.',
    details: 'Clean medical design and clear information hierarchy.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/395a07255236881.Y3JvcCw5MjAwLDcxOTYsMCw0MzI.jpg',
    liveUrl: 'https://www.behance.net/gallery/255236881/Dr-Service-Project-Media-Post',
    client: 'Healthcare',
    tags: ['Behance', 'Medical', 'Illustrator'],
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
    description: 'Eco-friendly product visuals focusing on organic lifestyle aesthetics.',
    details: 'Fresh product packaging highlights and natural tones.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2b03a6255250677.Y3JvcCw5MjAwLDcxOTYsMCwxMDAx.jpg',
    liveUrl: 'https://www.behance.net/gallery/255250677/Naturo-Media-Post-Project',
    client: 'Organic Brand',
    tags: ['Behance', 'Organic', 'E-Commerce'],
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
    description: 'Structured editorial layout with crisp typography and vector artwork.',
    details: 'Print and digital layout built with Adobe Illustrator.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a62667255644821.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
    liveUrl: 'https://www.behance.net/gallery/255644821/Brochure-post-design',
    client: 'Corporate',
    tags: ['Behance', 'Brochure', 'Print Layout'],
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
    description: 'High-converting feed ad creative engineered to maximize click-throughs.',
    details: 'Visual hierarchy and bold headings for digital marketing funnels.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2e330e254863705.Y3JvcCwxMDI0LDgwMCwwLDE3.jpg',
    liveUrl: 'https://www.behance.net/gallery/254863705/FB-Post-Project',
    client: 'Digital Agency',
    tags: ['Behance', 'FB Creative', 'Photoshop'],
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
    description: 'Consumer grocery promotional post with discount callouts and badges.',
    details: 'Engineered for e-commerce sales and local delivery highlights.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/28e94d254863423.Y3JvcCw5MjIsNzIxLDAsODQ.jpg',
    liveUrl: 'https://www.behance.net/gallery/254863423/ghorer-bazar-FB-Post-Project',
    client: 'E-Commerce',
    tags: ['Behance', 'Grocery', 'Banner Art'],
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
    description: 'Bespoke custom typography compositions and modern letterforms.',
    details: 'Handcrafted type styling refined into clean vector paths.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6c7459254818611.Y3JvcCwxMTIyLDg3NywwLDI2MQ.png',
    liveUrl: 'https://www.behance.net/gallery/254818611/Typography-Design',
    client: 'Visual Identity',
    tags: ['Behance', 'Typography', 'Vector Art'],
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
    description: 'Engaging branded social asset created for targeted digital campaigns.',
    details: 'Product mockups, clean gradients, and discount badges.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/be325a254884983.Y3JvcCwxMjU0LDk4MCwwLDEzNg.jpg',
    liveUrl: 'https://www.behance.net/gallery/254884983/FB-Post-Project',
    client: 'Retail Brands',
    tags: ['Behance', 'Brand Promo', 'Social Ads'],
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
    description: 'Commercial visual design package for digital stores and product launches.',
    details: 'Mobile-first design with high-visibility call-to-actions.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/00f502254840487.Y3JvcCwxMDI0LDgwMCwwLDExMQ.jpg',
    liveUrl: 'https://www.behance.net/gallery/254840487/E-commerce-Social-Media-Visual-Design',
    client: 'E-Commerce Store',
    tags: ['Behance', 'E-Commerce', 'Catalog'],
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
    description: 'Official corporate employee ID badges and lanyard design.',
    details: 'Clean portrait framing, employee typography, and QR code placement.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a86b83253635481.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
    liveUrl: 'https://www.behance.net/gallery/253635481/ID-Card-Design',
    client: 'Corporate Agency',
    tags: ['Behance', 'ID Card', 'Print Ready'],
    featured: true,
    date: '2026',
    metrics: {
      results: 'Brand Standards',
      impressions: 'Security Badge'
    }
  },
  {
    id: 'gfx-behance-11',
    title: 'Iftar Mahfil Community Event Poster',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Festive community event banner and poster artwork with traditional motifs.',
    details: 'Islamic motifs and elegant calligraphy accents.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/81f92e254107271.Y3JvcCwxMDg2LDg0OSwwLDI5OA.png',
    liveUrl: 'https://www.behance.net/gallery/254107271/ifter-mahfil',
    client: 'Event Media',
    tags: ['Behance', 'Event Poster', 'Cultural'],
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
    description: 'Stylized handmade lettering compositions for apparel and modern branding.',
    details: 'Organic brush strokes and clean vector bezier adjustments.',
    coverImage: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6195cd254866321.Y3JvcCwxMjU0LDk4MCwwLDEzNg.png',
    liveUrl: 'https://www.behance.net/gallery/254866321/English-lettering',
    client: 'Art Direction',
    tags: ['Behance', 'Lettering', 'Type Art'],
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
    title: 'E-commerce Scaling: 4.85X ROAS Meta Ads',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'Full-funnel Meta Ads strategy with Advantage+ Shopping and Lookalikes.',
    details: 'Meta Conversions API (CAPI) setup and retargeting architecture.',
    coverImage: '',
    client: 'E-Commerce Brand',
    tags: ['Meta Ads', 'Advantage+', 'CAPI Tracking'],
    featured: true,
    date: '2026',
    metrics: {
      roas: '4.85X ROAS',
      spend: '$18,500',
      impressions: '2.4M Reach',
      results: '$89,725 Revenue'
    }
  },
  {
    id: 'meta-2',
    title: 'B2B Lead Gen & Instant WhatsApp Funnel',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'High-intent lead generation on Facebook & Instagram for services.',
    details: 'Instant Meta lead forms synchronized directly to WhatsApp/CRM.',
    coverImage: '',
    client: 'B2B Services',
    tags: ['Lead Gen', 'WhatsApp Funnel', 'Meta Forms'],
    featured: true,
    date: '2025',
    metrics: {
      roas: '3.2X Return',
      results: '840 Qualified Leads',
      ctr: '$14.20 / Lead'
    }
  },
  {
    id: 'meta-3',
    title: 'Local Retail & Store Footfall Growth Ads',
    category: 'meta',
    categoryLabel: 'Meta Marketing',
    description: 'Geo-targeted localized awareness driving physical store visits.',
    details: 'Radius exclusions and promotional discount triggers.',
    coverImage: '',
    client: 'Retail Store',
    tags: ['Local Ads', 'Radius Target', 'Store Visits'],
    featured: false,
    date: '2025',
    metrics: {
      results: '+64% Visits',
      spend: '$3,200'
    }
  }
];

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: 'premiere',
    title: 'Adobe Premiere Pro',
    titleBn: 'অ্যাডোবি প্রিমিয়ার প্রো',
    software: 'Adobe Premiere Pro',
    icon: 'Film',
    badge: 'Video Editing',
    description: 'Professional video editing, cinematic pacing, color grading, and dynamic audio mastering.',
    capabilities: [
      'Rough cut & narrative video editing',
      'Color grading & look balancing',
      'Audio mixing & clean dialogue syncing',
      'Multi-camera syncing & switching',
      'Transitions & basic motion graphics',
      'Reframing & clean text/title integrations'
    ],
    tools: ['Premiere Pro', 'Audio Essential', 'Lumetri Color', 'Multi-Cam']
  },
  {
    id: 'aftereffects',
    title: 'Adobe After Effects',
    titleBn: 'অ্যাডোবি আফটার ইফেক্টস',
    software: 'Adobe After Effects',
    icon: 'Sparkles',
    badge: 'Motion & VFX',
    description: 'Kinetic motion graphics, visual effects compositing, and dynamic animations.',
    capabilities: [
      'Motion graphics & kinetic animations',
      'Compositing & visual effects (VFX)',
      '3D layer movement & camera space',
      'Chroma keying (green screen removal)',
      'Tracking, masking & rotoscoping',
      'Logo animations & title sequences'
    ],
    tools: ['After Effects', 'Rotobrush', 'Mocha Tracking', 'Keylight']
  },
  {
    id: 'photoshop',
    title: 'Adobe Photoshop',
    titleBn: 'অ্যাডোবি ফটোশপ',
    software: 'Adobe Photoshop',
    icon: 'Palette',
    badge: 'Photo & Ad Design',
    description: 'High-converting ad designs, commercial retouching, and creative image manipulation.',
    capabilities: [
      'Advanced photo retouching & cleanup',
      'Background removal & clean isolation',
      'Color correction & image compositing',
      'High-converting product editing',
      'Creative ad design & social media posts',
      'Professional mockups & presentations'
    ],
    tools: ['Photoshop', 'Camera Raw', 'Smart Objects', 'Mockups']
  },
  {
    id: 'illustrator',
    title: 'Adobe Illustrator',
    titleBn: 'অ্যাডোবি ইলাস্ট্রেটর',
    software: 'Adobe Illustrator',
    icon: 'PenTool',
    badge: 'Vector & Branding',
    description: 'Vector graphics, brand identity logos, print packaging, and typography compositions.',
    capabilities: [
      'Vector design & clean geometry',
      'Custom logo & brand identity creation',
      'Typography & custom lettering layout',
      'Illustrations & visual compositions',
      'Print-ready packaging design',
      'Social media vector ads & assets'
    ],
    tools: ['Illustrator', 'Pen Tool', 'Vector Assets', 'Typography']
  },
  {
    id: 'meta',
    title: 'Meta Marketing',
    titleBn: 'মেটা মার্কেটিং',
    software: 'Meta Ads Manager',
    icon: 'TrendingUp',
    badge: 'Paid Ads & ROAS',
    description: 'High-ROAS Facebook & Instagram ad campaigns, pixel tracking, and media buying.',
    capabilities: [
      'Meta ads campaign management (CBO/ABO)',
      'Precise audience targeting & custom lookalikes',
      'Retargeting & warm lead funnels',
      'Pixel tracking & Conversions API (CAPI)',
      'A/B creative testing & hook optimization',
      'Budget scaling & performance analytics'
    ],
    tools: ['Ads Manager', 'Meta Pixel', 'CAPI', 'Events Manager']
  },
  {
    id: 'digital',
    title: 'Digital Marketing & Web',
    titleBn: 'ডিজিটাল মার্কেটিং ও ওয়েব',
    software: 'Web & Growth',
    icon: 'Globe',
    badge: 'Search & Web Growth',
    description: 'Landing page design, search engine optimization, keyword research, and content management.',
    capabilities: [
      'High-converting landing page design',
      'Search Engine Optimization (SEO)',
      'Keyword research & competitor analysis',
      'Product listing & catalog management',
      'Blog & digital content management',
      'Basic computing (MS Word, Excel, PowerPoint)'
    ],
    tools: ['Landing Pages', 'SEO', 'Keyword Research', 'MS Office']
  }
];

export const educationList: EducationItem[] = [
  {
    id: 'edu-1',
    title: 'Dawra-e Hadis (Masters)',
    titleBn: 'দাওরায়ে হাদিস (মাস্টার্স)',
    institution: 'Jamia Babus Salam, Dhaka Airport',
    year: 'Passing Year: 2026',
    status: 'Passing Year: 2026',
    type: 'degree',
    description: 'Masters academic qualification with deep focus on Islamic classical texts and ethics.',
    badge: 'Masters Degree',
    verified: true
  },
  {
    id: 'edu-2',
    title: 'Dakhil',
    titleBn: 'দাখিল',
    institution: 'Bagan Islamiya Dakhil Madrasa, Trishal, Mymensingh',
    year: 'Status: Ongoing',
    status: 'Ongoing',
    type: 'course',
    description: 'Academic foundation in secondary education, languages, and general disciplines.',
    badge: 'Secondary Academic',
    verified: true
  },
  {
    id: 'edu-3',
    title: 'Small Business Management Course',
    titleBn: 'স্মল বিজনেস ম্যানেজমেন্ট কোর্স',
    institution: 'As-Sunnah Skill Development Institute',
    year: 'Duration: 3 Months',
    status: '3 Months Training',
    type: 'certification',
    description: 'Intensive professional training in Adobe Creative Suite, Meta Marketing, and business computing.',
    learnings: [
      'Adobe Photoshop, Premiere Pro, After Effects, Illustrator',
      'Meta Marketing & Paid Ad Strategy',
      'Basic Computing: MS Word, MS Excel, PowerPoint'
    ],
    badge: 'Professional Training',
    verified: true
  }
];
