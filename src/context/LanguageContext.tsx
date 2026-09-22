import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn' | 'ar';

export interface Translations {
  // Nav
  navHome: string;
  navPortfolio: string;
  navSkills: string;
  navEducation: string;
  navContact: string;
  navResume: string;
  navSettings: string;
  navHireMe: string;

  // Hero
  availableBadge: string;
  directChatBadge: string;
  helloIm: string;
  roleTitle: string;
  pillarVideoTitle: string;
  pillarVideoSub: string;
  pillarGraphicsTitle: string;
  pillarGraphicsSub: string;
  pillarMetaTitle: string;
  pillarMetaSub: string;
  statExperience: string;
  statExperienceValue: string;
  statProjects: string;
  statRoas: string;
  statSatisfaction: string;
  
  // CTAs (The 3 modern CTA buttons)
  ctaWatchPromo: string;
  ctaViewWorks: string;
  ctaWhatsApp: string;
  ctaResume: string;
  
  // Hero Video & Graphics Preview Strip
  topPreviewVideos: string;
  topPreviewGraphics: string;
  seeAll: string;
  reelsPlayHint: string;

  // Portfolio Showcase
  portfolioBadge: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  filterAll: string;
  filterVideos: string;
  filterGraphics: string;
  filterMeta: string;
  slotVideoTitle: string;
  slotVideoSub: string;
  slotGraphicsTitle: string;
  slotGraphicsSub: string;
  slotMetaTitle: string;
  slotMetaSub: string;
  openReelsHint: string;
  viewBehanceProject: string;
  portfolioWorks: string;
  featured: string;
  projects: string;
  linkWorks: string;

  // Skills
  skillsBadge: string;
  skillsTitle: string;
  skillsSubtitle: string;

  // Education
  educationBadge: string;
  educationTitle: string;
  educationSubtitle: string;

  // Contact
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  contactEmailLabel: string;
  contactEmailPlaceholder: string;
  contactServiceLabel: string;
  contactBudgetLabel: string;
  contactMessageLabel: string;
  contactMessagePlaceholder: string;
  contactSubmitBtn: string;
  contactWhatsAppDirectBtn: string;
  contactEmailCopyBtn: string;
  contactCopied: string;

  // Footer
  allRightsReserved: string;
  backToTop: string;

  // Reels Feed
  reelsCategoryAll: string;
  reelsCategoryVideos: string;
  reelsCategoryGraphics: string;
  reelsCategoryMeta: string;
  reelsLike: string;
  reelsChat: string;
  reelsLink: string;
  reelsShare: string;
  reelsSound: string;
  reelsMute: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    navHome: 'Home',
    navPortfolio: 'Portfolio',
    navSkills: 'Skills',
    navEducation: 'Education',
    navContact: 'Contact',
    navResume: 'Resume / CV',
    navSettings: 'Settings',
    navHireMe: 'Hire Me',

    availableBadge: 'Available for Hire',
    directChatBadge: 'Direct Chat',
    helloIm: "Hello, I'm",
    roleTitle: 'Video Editor • Graphic Designer • Meta Marketing Specialist',
    pillarVideoTitle: 'Video Editing',
    pillarVideoSub: 'Reels & Promos',
    pillarGraphicsTitle: 'Graphic Design',
    pillarGraphicsSub: 'Posts & Branding',
    pillarMetaTitle: 'Meta Marketing',
    pillarMetaSub: 'CAPI & ROAS',
    statExperience: 'Experience',
    statExperienceValue: '4 Months',
    statProjects: 'Projects',
    statRoas: 'ROAS',
    statSatisfaction: 'Satisfaction',

    ctaWatchPromo: 'Watch Promo Reel',
    ctaViewWorks: 'Explore All Works',
    ctaWhatsApp: 'Direct WhatsApp Chat',
    ctaResume: 'Curriculum Vitae',

    topPreviewVideos: 'Video Reels',
    topPreviewGraphics: 'Graphic Works',
    seeAll: 'See All',
    reelsPlayHint: 'Click to open in Reels view',

    portfolioBadge: 'Curated Showcase',
    portfolioTitle: 'Featured Creative Projects',
    portfolioSubtitle: 'Explore high-retention video reels, Behance artwork, and conversion-focused Meta campaigns.',
    filterAll: 'All Works',
    filterVideos: 'Video Reels',
    filterGraphics: 'Graphic Design',
    filterMeta: 'Meta Campaigns',
    slotVideoTitle: 'Video Editing & Motion',
    slotVideoSub: 'Promos, vertical commercial reels, and motion design.',
    slotGraphicsTitle: 'Graphic Design & Behance',
    slotGraphicsSub: 'Social media branding, thumbnails, and commercial creative assets.',
    slotMetaTitle: 'Meta Marketing & Ads',
    slotMetaSub: 'Full-funnel campaign architecture, CAPI tracking, and scaling.',
    openReelsHint: 'Tap to view in Reels scroll',
    viewBehanceProject: 'View on Behance',
    portfolioWorks: 'Portfolio Works',
    featured: 'Featured',
    projects: 'Projects',
    linkWorks: 'Link Works',

    skillsBadge: 'Hard Skills & Technical Capabilities',
    skillsTitle: 'Specialized Skills & Toolkit',
    skillsSubtitle: 'Core creative software and marketing expertise verified through active client projects.',

    educationBadge: 'Academic Background & Professional Training',
    educationTitle: 'Education & Certifications',
    educationSubtitle: 'Academic degrees and verified skill development certifications.',

    contactBadge: "Let's Collaborate",
    contactTitle: 'Get In Touch & Start Your Project',
    contactSubtitle: 'Have a video editing, design, or Meta marketing project in mind? Reach out via WhatsApp or submit your project details below.',
    contactNameLabel: 'Your Full Name',
    contactNamePlaceholder: 'e.g. John Anderson',
    contactEmailLabel: 'Email Address',
    contactEmailPlaceholder: 'john@example.com',
    contactServiceLabel: 'Selected Service',
    contactBudgetLabel: 'Estimated Budget',
    contactMessageLabel: 'Project Details & Goals',
    contactMessagePlaceholder: 'Tell me about your project scope, deadlines, and requirements...',
    contactSubmitBtn: 'Send Project Inquiry',
    contactWhatsAppDirectBtn: 'Start WhatsApp Chat Now',
    contactEmailCopyBtn: 'Copy Email',
    contactCopied: 'Copied!',

    allRightsReserved: 'All rights reserved.',
    backToTop: 'Back to top',

    reelsCategoryAll: 'All',
    reelsCategoryVideos: 'Reels',
    reelsCategoryGraphics: 'Graphics',
    reelsCategoryMeta: 'Meta',
    reelsLike: 'Like',
    reelsChat: 'Chat',
    reelsLink: 'Link',
    reelsShare: 'Share',
    reelsSound: 'Sound',
    reelsMute: 'Mute',
  },

  bn: {
    navHome: 'হোম',
    navPortfolio: 'পোর্টফোলিও',
    navSkills: 'স্কিলস',
    navEducation: 'শিক্ষা ও ট্রেনিং',
    navContact: 'যোগাযোগ',
    navResume: 'সিভি / জীবনবৃত্তান্ত',
    navSettings: 'সেটিংস',
    navHireMe: 'হায়ার করুন',

    availableBadge: 'কাজের জন্য সম্পূর্ণ প্রস্তুত',
    directChatBadge: 'সরাসরি চ্যাট',
    helloIm: 'হ্যালো, আমি',
    roleTitle: 'ভিডিও এডিটর • গ্রাফিক্স ডিজাইনার • মেটা মার্কেটিং স্পেশালিস্ট',
    pillarVideoTitle: 'ভিডিও এডিটিং',
    pillarVideoSub: 'রিলস ও কমার্শিয়াল প্রোমো',
    pillarGraphicsTitle: 'গ্রাফিক্স ডিজাইন',
    pillarGraphicsSub: 'সোশ্যাল পোস্ট ও ব্র্যান্ডিং',
    pillarMetaTitle: 'মেটা মার্কেটিং',
    pillarMetaSub: 'সিএপিআই ও আরওএএস বৃদ্ধি',
    statExperience: 'অভিজ্ঞতা',
    statExperienceValue: '৪ মাস',
    statProjects: 'প্রজেক্ট সম্পন্ন',
    statRoas: 'গড় আরওএএস',
    statSatisfaction: 'ক্লায়েন্ট সন্তুষ্টি',

    ctaWatchPromo: 'প্রোমো রিল দেখুন',
    ctaViewWorks: 'সব প্রজেক্ট এক্সপ্লোর করুন',
    ctaWhatsApp: 'সরাসরি হোয়াটসঅ্যাপ চ্যাট',
    ctaResume: 'জীবনবৃত্তান্ত (সিভি)',

    topPreviewVideos: 'ভিডিও রিলস',
    topPreviewGraphics: 'গ্রাফিক্স ডিজাইন',
    seeAll: 'সবগুলো দেখুন',
    reelsPlayHint: 'ক্লিক করে রিলস ফিডে দেখুন',

    portfolioBadge: 'নির্বাচিত পোর্টফোলিও',
    portfolioTitle: 'সেরা ক্রিয়েটিভ প্রজেক্টসমূহ',
    portfolioSubtitle: 'হাই-কনভার্সন ভিডিও রিলস, বেহ্যান্স অনুমোদিত গ্রাফিক্স ডিজাইন এবং উচ্চ-ফলাফলসম্পন্ন মেটা ক্যাম্পেইন।',
    filterAll: 'সব কাজ',
    filterVideos: 'ভিডিও রিলস',
    filterGraphics: 'গ্রাফিক্স ডিজাইন',
    filterMeta: 'মেটা ক্যাম্পেইন',
    slotVideoTitle: 'ভিডিও এডিটিং ও মোশন গ্রাফিক্স',
    slotVideoSub: 'প্রোমো, ভার্টিক্যাল রিলস ও ডায়নামিক মোশন ডিজাইন।',
    slotGraphicsTitle: 'গ্রাফিক্স ডিজাইন ও বেহ্যান্স আর্টওয়ার্ক',
    slotGraphicsSub: 'সোশ্যাল মিডিয়া ব্যানার, থাম্বনেইল ও ব্র্যান্ড অ্যাসেট।',
    slotMetaTitle: 'মেটা মার্কেটিং ও অ্যাডস ক্যাম্পেইন',
    slotMetaSub: 'সম্পূর্ণ ফানেল ক্যাম্পেইন আর্কিটেকচার ও স্কেলিং।',
    openReelsHint: 'রিলস স্ক্রলে দেখতে ট্যাপ করুন',
    viewBehanceProject: 'বেহ্যান্সে প্রজেক্ট দেখুন',
    portfolioWorks: 'পোর্টফোলিও কাজসমূহ',
    featured: 'নির্বাচিত',
    projects: 'প্রজেক্টসমূহ',
    linkWorks: 'কাজ যুক্ত করুন',

    skillsBadge: 'কারিগরি দক্ষতা ও সফটওয়্যার পারদর্শিতা',
    skillsTitle: 'বিশেষায়িত স্কিলস ও টুলকিট',
    skillsSubtitle: 'ক্লায়েন্ট প্রজেক্টে কার্যকরভাবে প্রমাণিত বিশ্বমানের সফটওয়্যার ও মার্কেটিং অভিজ্ঞতা।',

    educationBadge: 'একাডেমিক যোগ্যতা ও প্রফেশনাল ট্রেনিং',
    educationTitle: 'শিক্ষা ও সার্টিফিকেশন',
    educationSubtitle: 'প্রাতিষ্ঠানিক ডিগ্রি এবং আন্তর্জাতিক মানের স্কিল ডেভেলপমেন্ট সার্টিফিকেশন।',

    contactBadge: 'চলুন একসাথে কাজ শুরু করি',
    contactTitle: 'যোগাযোগ করুন ও আপনার প্রজেক্ট শুরু করুন',
    contactSubtitle: 'ভিডিও এডিটিং, গ্রাফিক্স ডিজাইন বা মেটা মার্কেটিংয়ের যেকোনো কাজের জন্য সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন বা নিচের ফর্মটি পূরণ করুন।',
    contactNameLabel: 'আপনার পূর্ণ নাম',
    contactNamePlaceholder: 'যেমন: মোঃ রাশেদুল ইসলাম',
    contactEmailLabel: 'ইমেইল অ্যাড্রেস',
    contactEmailPlaceholder: 'yourname@example.com',
    contactServiceLabel: 'কাঙ্ক্ষিত সেবা নির্বাচন করুন',
    contactBudgetLabel: 'আনুমানিক বাজেট',
    contactMessageLabel: 'প্রজেক্টের বিবরণ ও লক্ষ্য',
    contactMessagePlaceholder: 'আপনার প্রজেক্টের বিস্তার, ডেলিভারির সময় এবং প্রয়োজনীয়তা সম্পর্কে লিখুন...',
    contactSubmitBtn: 'প্রজেক্ট ইনকোয়ারি পাঠান',
    contactWhatsAppDirectBtn: 'হোয়াটসঅ্যাপে সরাসরি কথা বলুন',
    contactEmailCopyBtn: 'ইমেইল কপি করুন',
    contactCopied: 'কপি হয়েছে!',

    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
    backToTop: 'উপরে ফিরুন',

    reelsCategoryAll: 'সব',
    reelsCategoryVideos: 'রিলস',
    reelsCategoryGraphics: 'গ্রাফিক্স',
    reelsCategoryMeta: 'মেটা',
    reelsLike: 'লাইক',
    reelsChat: 'চ্যাট',
    reelsLink: 'লিংক',
    reelsShare: 'শেয়ার',
    reelsSound: 'শব্দ চালু',
    reelsMute: 'মিউট',
  },

  ar: {
    navHome: 'الرئيسية',
    navPortfolio: 'أعمالي',
    navSkills: 'المهارات',
    navEducation: 'التعليم والشهادات',
    navContact: 'اتصل بي',
    navResume: 'السيرة الذاتية',
    navSettings: 'الإعدادات',
    navHireMe: 'وظفني الآن',

    availableBadge: 'متاح للعمل على المشاريع',
    directChatBadge: 'محادثة مباشرة',
    helloIm: 'مرحباً، أنا',
    roleTitle: 'محرر فيديو • مصمم جرافيك • أخصائي إعلانات ميتا',
    pillarVideoTitle: 'تحرير الفيديو',
    pillarVideoSub: 'ريلز وإعلانات ترويجية',
    pillarGraphicsTitle: 'التصميم الجرافيكي',
    pillarGraphicsSub: 'منشورات وهوية بصرية',
    pillarMetaTitle: 'إعلانات ميتا',
    pillarMetaSub: 'زيادة العائد CAPI & ROAS',
    statExperience: 'سنوات خبرة',
    statExperienceValue: '٤ أشهر',
    statProjects: 'مشروع منجز',
    statRoas: 'متوسط ROAS',
    statSatisfaction: 'رضا العملاء',

    ctaWatchPromo: 'مشاهدة فيديو العرض',
    ctaViewWorks: 'تصفح جميع الأعمال',
    ctaWhatsApp: 'محادثة مباشرة عبر واتساب',
    ctaResume: 'السيرة الذاتية الكاملة',

    topPreviewVideos: 'فيديوهات الريلز',
    topPreviewGraphics: 'التصاميم الجرافيكية',
    seeAll: 'عرض الكل',
    reelsPlayHint: 'انقر للمشاهدة بنمط الريلز',

    portfolioBadge: 'معرض الأعمال المختار',
    portfolioTitle: 'أبرز المشاريع الإبداعية',
    portfolioSubtitle: 'استكشف فيديوهات ريلز تجذب الانتباه، تصاميم بيهانس احترافية، وحملات ميتا ذات عائد استثماري عالٍ.',
    filterAll: 'جميع الأعمال',
    filterVideos: 'فيديوهات الريلز',
    filterGraphics: 'التصميم الجرافيكي',
    filterMeta: 'حملات إعلانات ميتا',
    slotVideoTitle: 'تحرير الفيديو والموشن جرافيك',
    slotVideoSub: 'فيديوهات ترويجية، ريلز عمودية، وموشن ديزاين احترافي.',
    slotGraphicsTitle: 'التصميم الجرافيكي وأعمال بيهانس',
    slotGraphicsSub: 'منشورات سوشيال ميديا، صور مصغرة، وهويات بصرية كاملة.',
    slotMetaTitle: 'التسويق وإعلانات ميتا (فيسبوك وإنستغرام)',
    slotMetaSub: 'هندسة الحملات التسويقية، ربط CAPI، وتكبير المبيعات.',
    openReelsHint: 'انقر للتصفح بنمط الريلز',
    viewBehanceProject: 'مشاهدة المشروع على Behance',
    portfolioWorks: 'أعمال البورتفوليو',
    featured: 'المشاريع',
    projects: 'المميزة',
    linkWorks: 'إضافة عمل',

    skillsBadge: 'المهارات التقنية والبرمجية',
    skillsTitle: 'المهارات المتخصصة والأدوات',
    skillsSubtitle: 'خبرة عملية متقدمة في أقوى برامج التصميم وأدوات التسويق المطبقة في مشاريع العملاء.',

    educationBadge: 'المؤهلات الأكاديمية والتدريب الاحترافي',
    educationTitle: 'التعليم والشهادات المعتمدة',
    educationSubtitle: 'درجات أكاديمية وشهادات تطوير مهارات مهنية معتمدة دولياً.',

    contactBadge: 'لنبدأ التعاون معاً',
    contactTitle: 'تواصل معي وابدأ مشروعك الآن',
    contactSubtitle: 'هل لديك مشروع تحرير فيديو أو تصميم جرافيك أو حملة إعلانية على ميتا؟ تواصل مباشرة عبر واتساب أو أرسل تفاصيل طلبك أدناه.',
    contactNameLabel: 'الاسم الكامل',
    contactNamePlaceholder: 'مثال: أحمد محمد',
    contactEmailLabel: 'البريد الإلكتروني',
    contactEmailPlaceholder: 'ahmed@example.com',
    contactServiceLabel: 'الخدمة المطلوبة',
    contactBudgetLabel: 'الميزانية التقريبية',
    contactMessageLabel: 'تفاصيل المشروع وأهدافه',
    contactMessagePlaceholder: 'اكتب تفاصيل المشروع والموعد النهائي والمتطلبات...',
    contactSubmitBtn: 'إرسال تفاصيل المشروع',
    contactWhatsAppDirectBtn: 'محادثة فورية عبر واتساب',
    contactEmailCopyBtn: 'نسخ البريد الإلكتروني',
    contactCopied: 'تم النسخ بنجاح!',

    allRightsReserved: 'جميع الحقوق محفوظة.',
    backToTop: 'العودة للأعلى',

    reelsCategoryAll: 'الكل',
    reelsCategoryVideos: 'ريلز',
    reelsCategoryGraphics: 'جرافيك',
    reelsCategoryMeta: 'ميتا',
    reelsLike: 'إعجاب',
    reelsChat: 'محادثة',
    reelsLink: 'الرابط',
    reelsShare: 'مشاركة',
    reelsSound: 'تشغيل الصوت',
    reelsMute: 'كتم الصوت',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  isRtl: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kawser_portfolio_language') as Language;
    if (saved === 'en' || saved === 'bn' || saved === 'ar') {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kawser_portfolio_language', lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.en,
        isRtl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
