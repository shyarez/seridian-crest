import { z } from 'zod';

export const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const ServiceSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().min(10).max(1000),
  icon: z.string().min(1),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const ContentSchema = z.object({
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  aboutContent: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  ctaText: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type ServiceInput = z.infer<typeof ServiceSchema>;
export type ContentInput = z.infer<typeof ContentSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
