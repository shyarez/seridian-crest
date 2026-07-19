export interface IService {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  benefits?: string[];
  order?: number;
  isActive?: boolean;
}

export interface IContent {
  _id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutContent: string;
  aboutImageUrl?: string;
  mission: string;
  vision: string;
  ctaText: string;
  ctaBannerImageUrl?: string;
  phone: string;
  email: string;
  address: string;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'reviewed' | 'closed';
  submittedAt: string;
}

export interface SessionData {
  adminId: string;
  email: string;
  isLoggedIn: boolean;
}

export interface ActionResult<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
