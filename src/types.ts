export type ProjectCategory = 'all' | 'graphics' | 'video' | 'meta';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'graphics' | 'video' | 'meta';
  categoryLabel: string;
  description: string;
  details?: string;
  coverImage: string;
  videoUrl?: string;
  embedType?: 'direct' | 'youtube' | 'vimeo';
  client?: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
  isVertical?: boolean;
  aspectRatio?: string;
  date?: string;
  metrics?: {
    roas?: string;
    impressions?: string;
    ctr?: string;
    spend?: string;
    results?: string;
  };
}

export interface SkillItem {
  name: string;
  level?: number; // optional, percentages deprecated
  experience?: string;
  tag?: string;
  capabilities?: string[];
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  titleBn?: string;
  icon: string;
  description?: string;
  badge: string;
  software?: string;
  capabilities: string[];
  skills?: SkillItem[];
  tools?: string[];
}

export interface EducationItem {
  id: string;
  title: string;
  titleBn?: string;
  institution: string;
  year: string;
  status?: string;
  type: 'certification' | 'degree' | 'course';
  description?: string;
  learnings?: string[];
  badge?: string;
  verified?: boolean;
}

export interface ProfileData {
  name: string;
  nameBn: string;
  roleTitle: string;
  roleTitleBn: string;
  bio: string;
  bioBn: string;
  avatarUrl: string;
  watermarkUrl: string;
  logoText: string;
  logoSubtext: string;
  resumeUrl?: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  location: string;
  availableForHire: boolean;
  experienceYears: string;
  completedProjects: string;
  avgRoas: string;
  clientSatisfaction: string;
  socials: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    behance?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}
