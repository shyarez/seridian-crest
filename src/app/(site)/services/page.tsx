import type { Metadata } from 'next';
import { IService } from '@/types';
import AnimatedSection from '@/components/site/AnimatedSection';
import { CheckCircle2, Ship } from 'lucide-react';
import Link from 'next/link';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Seridian Crest LLP\'s full range of maritime logistics services.',
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
      { _id: '1', title: 'Liner Agency & Husbandry', description: 'Full vessel representation, crew support, documentation coordination, and operational assistance for smooth port calls.', icon: 'Ship', features: ['Full vessel representation', 'Crew support', 'Documentation coordination'], benefits: ['Smooth port calls', 'Cost efficiency'] },
      { _id: '2', title: 'Freight Forwarding & Cargo Management', description: 'Reliable transportation solutions across sea, air, and land with complete shipment coordination.', icon: 'Package', features: ['Sea, air, and land transport', 'Shipment coordination'], benefits: ['Reliable delivery', 'Global coverage'] },
      { _id: '3', title: 'Project & Breakbulk Cargo', description: 'Specialized logistics planning for oversized, heavy-lift, and complex cargo operations.', icon: 'Anchor', features: ['Oversized cargo handling', 'Heavy-lift planning'], benefits: ['Safety compliance', 'Expert execution'] },
      { _id: '4', title: 'Customs Clearance & Compliance', description: 'Accurate documentation and regulatory support for seamless import and export operations.', icon: 'ShieldCheck', features: ['Accurate documentation', 'Regulatory support'], benefits: ['Seamless imports/exports', 'Avoid penalties'] }
    ];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center" aria-label="Services hero">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container-site relative z-10 max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Our Services
            </h1>
            <p className="text-white/80 text-xl font-medium">
              Comprehensive maritime logistics solutions engineered for reliability and efficiency.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-brand-bg" aria-label="Services list">
        <div className="container-site max-w-5xl mx-auto">
          {services.map((service, index) => (
            <AnimatedSection key={service._id} direction="up" delay={0.1}>
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-border shadow-sm mb-12 overflow-hidden relative group hover:shadow-xl transition-shadow">
                
                <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg">
                        <Ship className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-extrabold text-brand-primary">{service.title}</h2>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-3">Overview</h3>
                      <p className="text-brand-text-secondary text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {service.features && service.features.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">Key Features</h3>
                          <ul className="space-y-3">
                            {service.features.map(f => (
                              <li key={f} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                                <span className="text-brand-text-primary text-sm font-medium">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.benefits && service.benefits.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">Benefits</h3>
                          <ul className="space-y-3">
                            {service.benefits.map(b => (
                              <li key={b} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                                <span className="text-brand-text-secondary text-sm">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle background decoration */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-alt-bg rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              </div>
            </AnimatedSection>
          ))}

          {services.length === 0 && (
            <div className="text-center py-20 text-brand-text-secondary">
              Services are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center" aria-label="Call to action">
        <div className="container-site max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-8">
              Discuss Your Cargo Requirements
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-secondary transition-all shadow-xl hover:-translate-y-1"
            >
              Request a Quote
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
