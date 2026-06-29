import type { Metadata } from 'next';
import AnimatedSection from '@/components/site/AnimatedSection';
import { Target, Eye, Shield, Clock, Search, HeartHandshake, CheckCircle } from 'lucide-react';
import { getGlobalContent } from '@/lib/actions/content.actions';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Seridian Crest LLP — our mission, vision, and core values in maritime logistics.',
};

const CORE_VALUES = [
  { icon: Shield, title: 'Integrity', body: 'Uncompromising ethical standards in all our operations.' },
  { icon: Clock, title: 'Reliability', body: 'Dependable service you can count on, every time.' },
  { icon: Search, title: 'Transparency', body: 'Clear communication and full visibility into your supply chain.' },
  { icon: CheckCircle, title: 'Safety', body: 'Prioritizing the safety of cargo, personnel, and the environment.' },
  { icon: Target, title: 'Efficiency', body: 'Optimized processes to save time and reduce costs.' },
  { icon: HeartHandshake, title: 'Client Focus', body: 'Building lasting partnerships through dedicated support.' },
];

export default async function AboutPage() {
  const content = await getGlobalContent();

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center" aria-label="About hero">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container-site relative z-10 max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              About Seridian Crest
            </h1>
            <p className="text-white/80 text-xl font-medium">
              Simplifying global trade through dependable logistics coordination and operational excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white" aria-label="Company Overview">
        <div className="container-site max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-extrabold text-brand-primary mb-8">Company Overview</h2>
            <p className="text-brand-text-secondary text-lg leading-relaxed mb-12">
              {content.aboutContent}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-brand-bg" aria-label="Mission and vision">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0}>
              <div className="bg-white rounded-3xl p-10 h-full border border-brand-border shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-brand-alt-bg flex items-center justify-center mb-8">
                  <Target className="w-7 h-7 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-brand-primary mb-4">Our Mission</h2>
                <p className="text-brand-text-secondary text-lg leading-relaxed">
                  {content.mission}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-brand-primary rounded-3xl p-10 h-full shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Eye className="w-7 h-7 text-brand-highlight" />
                </div>
                <h2 className="text-2xl font-extrabold text-white mb-4">Our Vision</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {content.vision}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white" aria-label="Core values">
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">Our Core Values</h2>
              <p className="text-brand-text-secondary text-lg">The principles that guide every shipment we handle.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} direction="up">
                <div className="bg-brand-bg rounded-2xl p-8 border border-brand-border hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h3 className="font-bold text-brand-primary text-xl">{title}</h3>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">{body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-primary text-center" aria-label="Call to action">
        <div className="container-site max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-brand-highlight text-lg mb-10 font-medium">
              {content.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-brand-primary font-bold hover:bg-brand-bg transition-all shadow-xl hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
