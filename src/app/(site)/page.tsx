import type { Metadata } from 'next';
import { IService } from '@/types';
import HeroSection from '@/components/site/HeroSection';
import AnimatedSection from '@/components/site/AnimatedSection';
import Link from 'next/link';
import { ArrowRight, Globe, ShieldCheck, Clock, Users, Building, Package, CheckCircle2, Ship, Anchor } from 'lucide-react';
import { getGlobalContent } from '@/lib/data/content';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Seridian Crest LLP delivers dependable shipping, freight forwarding, customs clearance, and cargo management solutions.',
};

async function getServices(): Promise<IService[]> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  try {
    const res = await fetch(`${protocol}://${host}/api/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return [
      { _id: '1', title: 'Liner Agency & Husbandry', description: 'Full vessel representation, crew support, documentation coordination, and operational assistance for smooth port calls.', icon: 'Ship' },
      { _id: '2', title: 'Freight Forwarding & Cargo Management', description: 'Reliable transportation solutions across sea, air, and land with complete shipment coordination.', icon: 'Package' },
      { _id: '3', title: 'Project & Breakbulk Cargo', description: 'Specialized logistics planning for oversized, heavy-lift, and complex cargo operations.', icon: 'Anchor' },
      { _id: '4', title: 'Customs Clearance & Compliance', description: 'Accurate documentation and regulatory support for seamless import and export operations.', icon: 'ShieldCheck' }
    ];
  }
}

const TRUST_CARDS = [
  { icon: Globe, title: 'Global Network', body: 'Extensive connections across all major trade lanes.' },
  { icon: CheckCircle2, title: 'Operational Excellence', body: 'Precision in every shipment, every time.' },
  { icon: ShieldCheck, title: 'Regulatory Compliance', body: 'Strict adherence to international trade regulations.' },
  { icon: Users, title: 'Reliable Support', body: '24/7 dedicated support for our partners.' },
];

const WHY_CHOOSE_US = [
  { icon: Building, title: 'Industry Expertise' },
  { icon: Clock, title: 'Reliable Operations' },
  { icon: Globe, title: 'Global Reach' },
  { icon: Package, title: 'End-to-End Coordination' },
  { icon: ShieldCheck, title: 'Compliance Focused' },
  { icon: Users, title: 'Client-Centric Service' },
];

const INDUSTRIES = [
  { name: 'Import & Export', icon: Package },
  { name: 'Export Operations', icon: Anchor },
];

export default async function HomePage() {
  const [services, content] = await Promise.all([getServices(), getGlobalContent()]);

  return (
    <>
      <HeroSection title={content.heroTitle} subtitle={content.heroSubtitle} />

      {/* Trust Section */}
      <section className="section-padding bg-white relative -mt-16 z-20" aria-label="Trust section">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_CARDS.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} direction="up">
                <div className="bg-brand-bg rounded-2xl p-8 border border-brand-border hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-brand-primary text-lg mb-3">{title}</h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">{body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white" aria-label="About preview">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="rounded-3xl bg-brand-alt-bg p-8 md:p-12 border border-brand-border relative overflow-hidden h-[500px]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0E3A5B_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/20 blur-3xl rounded-full" />
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <Anchor className="w-20 h-20 text-brand-primary mb-8 opacity-20" />
                  <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-6">About Seridian Crest LLP</h2>
                  <p className="text-brand-text-secondary text-lg leading-relaxed mb-8">
                    {content.aboutContent}
                  </p>
                  <div>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-2">Our Mission</h3>
                  <p className="text-brand-primary text-xl font-medium leading-relaxed">
                    {content.mission}
                  </p>
                </div>
                <div className="w-full h-px bg-brand-border" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-2">Our Vision</h3>
                  <p className="text-brand-text-secondary text-lg leading-relaxed">
                    {content.vision}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-brand-bg" aria-label="Services overview">
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Services Overview
              </h2>
              <p className="text-brand-text-secondary text-lg">
                Comprehensive export services tailored for global trade.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(0, 4).map((service, i) => {
              // Map icons if needed, or use generic
              return (
                <AnimatedSection key={service._id} delay={i * 0.1} direction="up">
                  <div className="bg-white rounded-2xl p-8 border border-brand-border hover:shadow-xl hover:border-brand-accent/30 transition-all group h-full">
                    <div className="w-14 h-14 rounded-xl bg-brand-alt-bg flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                      <Ship className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-primary mb-4">{service.title}</h3>
                    <p className="text-brand-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center font-bold text-sm text-brand-accent hover:text-brand-primary transition-colors"
                    >
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Industries */}
      <section className="section-padding bg-white" aria-label="Why choose us">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Why Choose Us */}
            <div>
              <AnimatedSection direction="up">
                <h2 className="text-3xl font-extrabold text-brand-primary mb-10">Why Choose Us</h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_CHOOSE_US.map(({ icon: Icon, title }, i) => (
                  <AnimatedSection key={title} delay={i * 0.1} direction="up">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-accent/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <span className="font-bold text-brand-primary text-sm">{title}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Industries Served */}
            <div>
              <AnimatedSection direction="up" delay={0.2}>
                <h2 className="text-3xl font-extrabold text-brand-primary mb-10">Industries Served</h2>
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-6">
                {INDUSTRIES.map(({ name, icon: Icon }, i) => (
                  <AnimatedSection key={name} delay={0.2 + i * 0.1} direction="up">
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-brand-border bg-brand-bg text-center hover:bg-brand-primary hover:text-white group transition-colors">
                      <Icon className="w-8 h-8 text-brand-accent mb-4 group-hover:text-white transition-colors" />
                      <span className="font-bold text-sm text-brand-primary group-hover:text-white transition-colors">{name}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-brand-bg" aria-label="Our process">
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Our Process
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-border -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: '1', title: 'Consultation' },
                { step: '2', title: 'Planning' },
                { step: '3', title: 'Documentation & Compliance' },
                { step: '4', title: 'Transportation' },
                { step: '5', title: 'Delivery' },
              ].map(({ step, title }, i) => (
                <AnimatedSection key={step} delay={i * 0.15} direction="up" className="relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-brand-bg flex items-center justify-center shadow-lg shadow-brand-primary/5 mb-6 text-xl font-black text-brand-primary">
                      {step}
                    </div>
                    <h3 className="font-bold text-brand-primary text-base">{title}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-primary" aria-label="Call to action">
        <div className="container-site text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-brand-highlight text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
              {content.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-white text-brand-primary font-bold text-base hover:bg-brand-bg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Request a Quote
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
