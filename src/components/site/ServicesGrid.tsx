import Link from 'next/link';
import { IService } from '@/types';
import ServiceCard from './ServiceCard';
import AnimatedSection from './AnimatedSection';

interface ServicesGridProps {
  services: IService[];
  teaser?: boolean; // true = show first 3 only, on homepage
}

export default function ServicesGrid({ services, teaser = false }: ServicesGridProps) {
  const displayed = teaser ? services.slice(0, 3) : services;

  return (
    <section className="section-padding bg-background" aria-label="Services">
      <div className="container-site">
        <AnimatedSection direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-4">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
              Comprehensive Export Solutions
            </h2>
            <p className="text-navy-600/70 text-base">
              From freight forwarding to port operations, we cover every stage of your global supply chain.
            </p>
          </div>
        </AnimatedSection>

        {displayed.length === 0 ? (
          <p className="text-center text-navy-600/50 py-16">Services coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((service, i) => (
              <AnimatedSection key={service._id} delay={i * 0.1} direction="up">
                <ServiceCard service={service} index={i} />
              </AnimatedSection>
            ))}
          </div>
        )}

        {teaser && services.length > 3 && (
          <AnimatedSection delay={0.4} direction="up" className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-navy-200 text-navy-800 text-sm font-medium hover:bg-navy-950 hover:text-white hover:border-navy-950 transition-all"
            >
              View All Services →
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
